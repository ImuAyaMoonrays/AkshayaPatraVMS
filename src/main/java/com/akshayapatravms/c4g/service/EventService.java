package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.*;
import com.akshayapatravms.c4g.repository.CauseRepository;
import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.repository.ProfileRepository;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.security.SecurityUtils;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import com.akshayapatravms.c4g.service.dto.ProfileEventDTO;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EventService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final EventRepository eventRepository;

    private final CauseRepository causeRepository;

    private final ProfileRepository profileRepository;

    private final CorporateSubgroupRepository corporateSubgroupRepository;

    private final UserService userService;

    private final CacheManager cacheManager;

    public EventService(
        EventRepository eventRepository,
        CacheManager cacheManager,
        UserService userService,
        CauseRepository causeRepository,
        CorporateSubgroupRepository corporateSubgroupRepository,
        ProfileRepository profileRepository
    ) {
        this.eventRepository = eventRepository;
        this.cacheManager = cacheManager;
        this.userService = userService;
        this.causeRepository = causeRepository;
        this.corporateSubgroupRepository = corporateSubgroupRepository;
        this.profileRepository = profileRepository;
    }

    //saves new causes to db
    private Set<Cause> existingAndNewCauses(EventDTO eventDTO) throws RuntimeException {
        return eventDTO
            .getCauses()
            .stream()
            .map(causeDTO -> {
                if (causeDTO.getId() != null) {
                    return causeRepository
                        .findOneById(causeDTO.getId())
                        .orElseThrow(() -> new RuntimeException("inexistant " + "cause by id"));
                } else {
                    //doesnt have an ID but has a name that matches an existing. Should the behavior be to use the cause with the matching name?
                    if (causeRepository.findOneByCauseName(causeDTO.getName().toUpperCase()).isPresent()) {
                        throw new RuntimeException(
                            "One of the cause names you requested already exists. Please send its ID or choose a " + "new cause name"
                        );
                    } else {
                        Cause cause = new Cause();
                        cause.setCauseName(causeDTO.getName().toUpperCase());
                        return causeRepository.save(cause);
                    }
                }
            })
            .collect(Collectors.toSet());
    }

    private Set<CorporateSubgroup> getCorpSubGroupsFromEvent(EventDTO eventDTO) {
        return eventDTO
            .getCorporateSubgroupIds()
            .stream()
            .map(corporateSubgroupId -> {
                return corporateSubgroupRepository
                    .findOneById(corporateSubgroupId)
                    .orElseThrow(() -> new RuntimeException("inexistant subgroup by id"));
            })
            .collect(Collectors.toSet());
    }

    public Event createEvent(EventDTO eventDTO) {
        Event event = new Event();

        Set<Cause> causes = existingAndNewCauses(eventDTO);
        event.setCauses(causes);

        Set<CorporateSubgroup> corporateSubgroups = getCorpSubGroupsFromEvent(eventDTO);
        event.setCorporateSubgroups(corporateSubgroups);

        event.setEventName(eventDTO.getEventName());

        if (eventDTO.getPhysicalLocation() != null) {
            event.setLocation(new PhysicalLocation(eventDTO.getPhysicalLocation()));
        } else if (eventDTO.getVirtualLocation() != null) {
            event.setVirtualLocation(new VirtualLocation(eventDTO.getVirtualLocation()));
        }

        event.setDescription(eventDTO.getDescription());
        event.setVolunteersNeededAmount(eventDTO.getVolunteersNeededAmount());
        event.setStartDate(eventDTO.getStartDate());
        event.setEndDate(eventDTO.getEndDate());
        event.setStartTime(new Time(eventDTO.getStartTime()));
        event.setEndTime(new Time(eventDTO.getEndTime()));
        event.setContactName(eventDTO.getContactName());
        event.setContactPhoneNumber(eventDTO.getContactPhoneNumber());
        event.setContactEmail(eventDTO.getContactEmail());
        event.setEmailBody(eventDTO.getEmailBody());

        User user = userService.getUserWithAuthorities().orElseThrow(() -> new RuntimeException("couldn't find currently logged in user"));
        event.setEventCreator(user);

        return eventRepository.save(event);
    }

    //todo: add validation that the user can be added to event (e.g. corp subgroup check, enough volunteers,
    // haven't signed up already).
    //todo: add error handling
    public void volunteerForEvent(Long eventID) {
        //update so there's validation that the user signing up is same as user.

        final Optional<User> isUser = userService.getUserWithAuthorities();
        if(!isUser.isPresent()) {
            log.error("User is not logged in");
            //throw exception
            return;
        }
        final User user = isUser.get();
        log.info("user is " + user.toString());

        Optional<Event>  event = eventRepository.findOneById(eventID);

        if (event.isPresent()){
            log.info("event" +  event.get());
            log.info("volunteer count before " + event.get().getVolunteers().size());
            event.get().getVolunteers().add(isUser.get());
            log.info("volunteer count after " + event.get().getVolunteers().size());
            log.info("user id " + user.getId() + " event id " + event.get().getId());
            eventRepository.save(event.get());

            log.info("num of volunteers " + event.get().getVolunteers().size());
            log.info("num of events vol for " + user.getEvents().size());
            log.info("volunteers for event " + event.get().getVolunteers());
            log.info("events volunteering for " + user.getEvents());

        } else{
            //throw exception
            log.error("event not found");
        }

    }

    public void unRegisterForEvent (Long eventID) {

        final Optional<User> isUser = userService.getUserWithAuthorities();
        if(!isUser.isPresent()) {
            log.error("User is not logged in");
            //throw exception
            return;
        }
        final User user = isUser.get();

        Optional<Event>  event = eventRepository.findOneById(eventID);

        if (event.isPresent()){
            log.info("event" +  event.get());
            log.info("volunteer count before " + event.get().getVolunteers().size());
            event.get().getVolunteers().remove(isUser.get());
            log.info("volunteer count after " + event.get().getVolunteers().size());
            log.info("user id " + user.getId() + " event id " + event.get().getId());
            eventRepository.save(event.get());

            log.info("num of volunteers " + event.get().getVolunteers().size());
            log.info("num of events vol for " + user.getEvents().size());
            log.info("volunteers for event " + event.get().getVolunteers());
            log.info("events volunteering for " + user.getEvents());
            //join table is emptied, but user is still showing events.
        } else{
            //throw exception
            log.error("event not found");
        }
    }

    public List<Event> getAll(){
        final Optional<User> isUser = userService.getUserWithAuthorities();
        if(!isUser.isPresent()) {
            log.error("User is not logged in");
            //throw exception
            return Collections.emptyList();
        }
        if (SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)){
            return eventRepository.findAllEventsAndVolunteers();
        } else {
            return eventRepository.findAll();
        }
    }
}

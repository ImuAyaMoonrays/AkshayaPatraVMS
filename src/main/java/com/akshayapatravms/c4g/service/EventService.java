package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.*;
import com.akshayapatravms.c4g.repository.CauseRepository;
import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.repository.ProfileRepository;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import com.akshayapatravms.c4g.service.dto.ProfileEventDTO;

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

        }

        User user = userService.getUserWithAuthorities().orElseThrow(() -> new RuntimeException("couldn't find currently logged in user"));
        event.setEventCreator(user);


        event.setDescription(eventDTO.getDescription());
        event.setVolunteersNeededAmount(eventDTO.getVolunteersNeededAmount());
        event.setStartDateAndTime(eventDTO.getStartDate());
        event.setEndDateAndTime(eventDTO.getEndDate());
        event.setContactName(eventDTO.getContactName());
        event.setContactPhoneNumber(eventDTO.getContactPhoneNumber());
        event.setContactEmail(eventDTO.getContactEmail());
        event.setEmailBody(eventDTO.getEmailBody());

        return eventRepository.save(event);
    }

    public void signUpForEvent(ProfileEventDTO profileEventDTO) {
        //update so there's validation that the user signing up is same as user.

        Optional<Profile> profile = profileRepository.getProfileById(profileEventDTO.getUserID());
        Optional<Event>  event = eventRepository.getEventById(profileEventDTO.getEventID());
        if (profile.isPresent() & event.isPresent()){
            profile.get().getEvents().add(event.get());
            profileRepository.save(profile.get());
        } else{
            //error!
        }
    }
}

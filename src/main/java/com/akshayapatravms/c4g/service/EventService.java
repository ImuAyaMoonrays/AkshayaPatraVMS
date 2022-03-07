package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.*;
import com.akshayapatravms.c4g.enums.PresenceModality;
import com.akshayapatravms.c4g.repository.CauseRepository;
import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import com.akshayapatravms.c4g.service.dto.LocationDTO;
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

    private final CorporateSubgroupRepository corporateSubgroupRepository;

    private final UserService userService;

    private final CacheManager cacheManager;

    public EventService(
        EventRepository eventRepository,
        CacheManager cacheManager,
        UserService userService,
        CauseRepository causeRepository,
        CorporateSubgroupRepository corporateSubgroupRepository
    ) {
        this.eventRepository = eventRepository;
        this.cacheManager = cacheManager;
        this.userService = userService;
        this.causeRepository = causeRepository;
        this.corporateSubgroupRepository = corporateSubgroupRepository;
    }

    private Set<Cause> getCausesFromEvent(EventDTO eventDTO) throws RuntimeException {
        return eventDTO
            .getCauses()
            .stream()
            .map(causeDTO -> {
                if (causeDTO.getId() != null) {
                    return causeRepository
                        .findOneById(causeDTO.getId())
                        .orElseThrow(() -> new RuntimeException("inexistant " + "cause by id"));
                } else {
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

        Set<Cause> causes = getCausesFromEvent(eventDTO);
        event.setCauses(causes);

        Set<CorporateSubgroup> corporateSubgroups = getCorpSubGroupsFromEvent(eventDTO);
        event.setCorporateSubgroups(corporateSubgroups);

        PresenceModality presenceModality = eventDTO.getLocation().getPresenceModality();
        Location location = new Location();

        LocationDTO locationDTO = eventDTO.getLocation();
        location.setAddress(locationDTO.getAddress());
        location.setState(locationDTO.getState());
        location.setCity(locationDTO.getCity());
        location.setLocality(locationDTO.getLocality());

        event.setLocation(location);

        event.setEventName(eventDTO.getEventName());
        event.setDescription(eventDTO.getDescription());
        event.setVolunteersNeededAmount(eventDTO.getVolunteersNeededAmount());

        User user = userService.getUserWithAuthorities().orElseThrow(() -> new RuntimeException("couldn't find currently logged in user"));
        event.setEventCreator(user);

        event.setStartDateAndTime(eventDTO.getStartDateAndTime());
        event.setEndDateAndTime(eventDTO.getEndDateAndTime());
        event.setContactName(eventDTO.getContactName());
        event.setContactPhoneNumber(eventDTO.getContactPhoneNumber());
        event.setContactEmail(eventDTO.getContactEmail());
        event.setEmailBody(eventDTO.getEmailBody());

        event.setIsVirtual(eventDTO.getVirtual());
        log.info("virtual is" + eventDTO.getVirtual());

        return eventRepository.save(event);
    }
}

package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.Cause;
import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.domain.Location;
import com.akshayapatravms.c4g.domain.User;
import com.akshayapatravms.c4g.enums.PresenceModality;
import com.akshayapatravms.c4g.repository.CauseRepository;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import com.akshayapatravms.c4g.service.dto.LocationDTO;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class EventService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final EventRepository eventRepository;

    private final CauseRepository causeRepository;

    private final UserService userService;

    private final CacheManager cacheManager;

    public EventService(
        EventRepository eventRepository,
        CacheManager cacheManager,
        UserService userService,
        CauseRepository causeRepository
    ) {
        this.eventRepository = eventRepository;
        this.cacheManager = cacheManager;
        this.userService = userService;
        this.causeRepository = causeRepository;
    }

    public Event createEvent(EventDTO eventDTO) {
        Event event = new Event();

        Set<Cause> causes = eventDTO
            .getCauseNames()
            .stream()
            .map(String::toUpperCase)
            .map(causeName -> {
                Optional<Cause> existingCause = causeRepository.findOneByCauseName(causeName);
                if (existingCause.isPresent()) {
                    return existingCause.get();
                } else {
                    Cause causeForPersistence = new Cause();
                    causeForPersistence.setCauseName(causeName);
                    return causeRepository.save(causeForPersistence);
                }
            })
            .collect(Collectors.toSet());
        event.setCauses(causes);

        PresenceModality presenceModality = eventDTO.getLocation().getPresenceModality();
        Location location = new Location();
        location.setPresenceModality(presenceModality);
        if (presenceModality == PresenceModality.VIRTUAL) {
            location.setVirtualMeetingAddress(eventDTO.getLocation().getVirtualMeetingAddress());
        } else if (presenceModality == PresenceModality.IN_PERSON) {
            LocationDTO locationDTO = eventDTO.getLocation();
            location.setAddress(locationDTO.getAddress());
            location.setState(locationDTO.getState());
            location.setCity(locationDTO.getCity());
            location.setLocality(locationDTO.getLocality());
            location.setPincode(locationDTO.getPincode());
        } else {
            throw new RuntimeException();
        }
        event.setLocation(location);

        event.setDescription(eventDTO.getDescription());
        event.setVolunteersNeededAmount(eventDTO.getVolunteersNeededAmount());

        User user = userService.getUserWithAuthorities().orElseThrow(() -> new RuntimeException("couldn't find currently logged in user"));
        event.setEventCreator(user);

        event.setStartDateAndTime(eventDTO.getStartDateAndTime());
        event.setEndDateAndTime(eventDTO.getEndDateAndTime());

        event.setContactName(eventDTO.getContactName());
        event.setContactPhoneNumber(eventDTO.getContactPhoneNumber());
        event.setContactEmail(eventDTO.getContactEmail());

        return eventRepository.save(event);
    }
    //    @Transactional(readOnly = true)
    //    public Page<AdminUserDTO> getAllManagedUsers(Pageable pageable) {
    //        return userRepository.findAll(pageable).map(AdminUserDTO::new);
    //    }

    //    private void clearUserCaches(User user) {
    //        Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE)).evict(user.getLogin());
    //        if (user.getEmail() != null) {
    //            Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE)).evict(user.getEmail());
    //        }
    //    }
}

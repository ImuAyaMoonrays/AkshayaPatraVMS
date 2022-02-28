package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.config.Constants;
import com.akshayapatravms.c4g.domain.*;
import com.akshayapatravms.c4g.enums.PresenceModality;
import com.akshayapatravms.c4g.repository.AuthorityRepository;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.repository.UserRepository;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.security.SecurityUtils;
import com.akshayapatravms.c4g.service.dto.AdminUserDTO;
import com.akshayapatravms.c4g.service.dto.UserDTO;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.security.RandomUtil;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class EventService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final EventRepository eventRepository;

    private final UserService userService;

    private final CacheManager cacheManager;

    public EventService(EventRepository eventRepository, CacheManager cacheManager, UserService userService) {
        this.eventRepository = eventRepository;
        this.cacheManager = cacheManager;
        this.userService = userService;
    }

    public Event createEvent() {
        Event event = new Event();

        Location location = new Location();
        location.setPresenceModality(PresenceModality.VIRTUAL);
        location.setVirtualMeetingAddress("www.googlemeet.com");
        event.setLocation(location);

        event.setDescription("Test desc");
        event.setVolunteersNeededAmount(75);

        User user = userService.getUserWithAuthorities().orElse(null);
        event.setEventCreator(user);

        event.setStartDateAndTime(Instant.now());
        event.setEndDateAndTime(Instant.now());

        Cause cause = new Cause();
        cause.setCauseName("hunger");
        event.setCauses(Collections.singleton(cause));

        event.setContactName("Dylan");
        event.setContactPhoneNumber("123123123");
        event.setContactEmail("d@gmail.com");

        eventRepository.save(event);
        return event;
        //        User user = new User();
        //        user.setLogin(userDTO.getLogin().toLowerCase());
        //        user.setFirstName(userDTO.getFirstName());
        //        user.setLastName(userDTO.getLastName());
        //        if (userDTO.getEmail() != null) {
        //            user.setEmail(userDTO.getEmail().toLowerCase());
        //        }
        //        user.setImageUrl(userDTO.getImageUrl());
        //        if (userDTO.getLangKey() == null) {
        //            user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
        //        } else {
        //            user.setLangKey(userDTO.getLangKey());
        //        }
        //        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        //        user.setPassword(encryptedPassword);
        //        user.setResetKey(RandomUtil.generateResetKey());
        //        user.setResetDate(Instant.now());
        //        user.setActivated(true);
        //        if (userDTO.getAuthorities() != null) {
        //            Set<Authority> authorities = userDTO
        //                .getAuthorities()
        //                .stream()
        //                .map(authorityRepository::findById)
        //                .filter(Optional::isPresent)
        //                .map(Optional::get)
        //                .collect(Collectors.toSet());
        //            user.setAuthorities(authorities);
        //        }
        //        userRepository.save(user);
        //        this.clearUserCaches(user);
        //        log.debug("Created Information for User: {}", user);
        //        return user;
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

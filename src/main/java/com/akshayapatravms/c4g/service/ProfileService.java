package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.*;
import com.akshayapatravms.c4g.repository.CauseRepository;
import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.repository.ProfileRepository;
import com.akshayapatravms.c4g.service.dto.ProfileDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProfileService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final EventRepository eventRepository;

    private final CauseRepository causeRepository;

    private final ProfileRepository profileRepository;

    private final CorporateSubgroupRepository corporateSubgroupRepository;

    private final UserService userService;

    private final CacheManager cacheManager;

    public ProfileService(
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

    public Profile createProfile(ProfileDTO profileDTO) {
        log.info("creating profile...");
        Profile p = new Profile();
        p.setAge(profileDTO.getAge());
        p.setName(profileDTO.getName());
        p.setLocation(new PhysicalLocation(profileDTO.getLocationDTO()));


        //Profile profile = new Profile(profileDTO);
        log.info("profile created");
        return profileRepository.save(p);
    }

}

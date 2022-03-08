package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.domain.Profile;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.service.EventService;
import com.akshayapatravms.c4g.service.ProfileService;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import com.akshayapatravms.c4g.service.dto.ProfileDTO;
import com.akshayapatravms.c4g.service.dto.ProfileEventDTO;

import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final ProfileService profileService;

    public ProfileResource(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/create")
    public Profile createProfile(@RequestBody ProfileDTO profileDTO) throws URISyntaxException {
        return profileService.createProfile(profileDTO);
    }

}

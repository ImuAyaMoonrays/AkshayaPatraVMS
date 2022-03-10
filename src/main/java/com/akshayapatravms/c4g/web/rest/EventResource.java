package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.service.EventService;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import com.akshayapatravms.c4g.service.dto.ProfileEventDTO;

import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
public class EventResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final EventService eventService;

    public EventResource(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/createEvent")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Event createEvent(@RequestBody EventDTO eventDTO) throws URISyntaxException {
        return eventService.createEvent(eventDTO);
    }

    @PostMapping("/volunteerForEvent")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public void createEvent(@RequestBody ProfileEventDTO profileEventDTO) throws URISyntaxException {
    }


}

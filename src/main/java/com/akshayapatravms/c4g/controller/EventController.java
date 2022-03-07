package com.akshayapatravms.c4g.controller;

import com.akshayapatravms.c4g.service.EventService;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//use event resource instead?

@RestController
@RequestMapping("/api/event")
public class EventController {

    private final Logger log = LoggerFactory.getLogger(FooResource.class);

    /**
     * GET testAction
     */
    @GetMapping("/test-action")
    public String testAction() {
        return "testAction";
    }

    @PostMapping("/create")
    public String createEvent(EventDTO event) {
        log.info("running create event");
        return "ok";
    }
}

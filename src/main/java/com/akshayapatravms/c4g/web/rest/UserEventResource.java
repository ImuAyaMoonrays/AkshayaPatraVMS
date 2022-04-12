package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.service.EventService;
import com.akshayapatravms.c4g.service.dto.event.UserEventResponseDTO;
import com.akshayapatravms.c4g.service.mapper.EventMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

//todo: have controllers return response entities
@RestController
@RequestMapping("/api/user/events")
public class UserEventResource {

    private final Logger log = LoggerFactory.getLogger(UserEventResource.class);

    private final EventService eventService;

    private final EventRepository eventRepository;

    private final EventMapper eventMapper;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public UserEventResource(EventService eventService,
                             EventRepository eventRepository,
                             EventMapper eventMapper) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    @GetMapping("/{id}")
    public UserEventResponseDTO eventById(@PathVariable Long id) throws URISyntaxException {
        Optional<Event> event = eventRepository.findOneById(id);
        if (event.isPresent()) {
            return eventMapper.eventToUserEventResponseDTO(event.get());
        } else  {
            throw new RuntimeException("could not find an event by this id");
        }
    }

    @GetMapping("/completed")
    public List<UserEventResponseDTO> completedEvents() {
        return eventMapper.eventsToUserEventResponseDTOS(eventService.getAllCompletedEventsForUser());
    }

    @GetMapping("/registered")
    public List<UserEventResponseDTO> registeredEvents() {
        return eventMapper.eventsToUserEventResponseDTOS(eventService.allRegisteredEventsForLoggedInUser());
    }

    @GetMapping("/registerable")
    public List<UserEventResponseDTO> registerableEvents() {
        return eventMapper.eventsToUserEventResponseDTOS(eventService.allRegisterableEventsForLoggedInUser());
    }

    @PostMapping("/volunteer")
    public ResponseEntity volunteerForEvent(@RequestBody Long eventID) throws URISyntaxException {
        try{
            eventService.volunteerForEvent(eventID);
            return ResponseEntity.ok().build();
        } catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

    }

    //should this be a delete? and change @pathVariable to RequestParam?
    @GetMapping("/unregister/{id}")
    public ResponseEntity unregisterForEvent(@PathVariable Long id) {
        try{
            eventService.unRegisterForEvent(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}

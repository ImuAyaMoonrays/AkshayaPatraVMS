package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.service.EventService;
import com.akshayapatravms.c4g.service.dto.CsvDTO;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;

//todo: have controllers return response entities
@RestController
@RequestMapping("/api/events")
public class EventResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final EventService eventService;

    private final EventRepository eventRepository;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public EventResource(EventService eventService,
                         EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    @PostMapping(value = "/createEvent", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE})
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Event createEvent(
        @RequestPart("eventWithoutImage") @Valid CreateEventDTO createEventDTO,
        @RequestPart("file") @Valid MultipartFile image) throws URISyntaxException {
        return eventService.createEvent(createEventDTO, image);
    }

    //todo: remove /event in pahth
    @GetMapping("/event/{id}")
    public EventResponseDTO eventById(@PathVariable Long id) throws URISyntaxException {
        Optional<Event> event = eventRepository.findAllEventInfoForEvent(id);
        if (event.isPresent()) {
            return new EventResponseDTO(event.get());
        } else  {
            throw new RuntimeException("could not find an event by this id");
        }
    }

    //    need one for admins which contains all registered users and one for normal user which doesn't
    @GetMapping("/all")
    public List<Event> allEvents() throws URISyntaxException {
        return this.eventRepository.findAllEventInfo();
    }

    //eventually might want to change this to register to match unregister. my bad for having them separate names at the start.
    //update request body to be a request parameter?
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

    @GetMapping("/pastEvents")
    public ResponseEntity getAllPastEvents() {
        try{
            return ResponseEntity.ok().body(eventService.getAllPast());
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/futureEvents")
    public ResponseEntity getAllFutureEvents() {
        try{
            return ResponseEntity.ok().body(eventService.getAllFuture());
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/completed")
    public ResponseEntity getCompletedEvents() {
        try{
            return ResponseEntity.ok().body(eventService.getAllCompletedEventsForUser());
        } catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/registered")
    public ResponseEntity getRegisteredEvents() {
        try{
            return ResponseEntity.ok().body(eventService.getAllFutureEventsForUser());
        } catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping()
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity deleteEvent(@RequestParam Long id) {
        try{
            log.debug("REST request to delete Event: {}", id);
            eventService.deleteEvent(id);
            return ResponseEntity.ok().build();
        } catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

//    @PatchMapping("/updateEvent")
//    public ResponseEntity<EventDTO> updateEvent(@Valid @RequestBody EventDTO eventDTO) {
//        log.debug("REST request to update Event : {}", eventDTO);
//        Optional<Event> existingEvent = eventRepository.findOneById(eventDTO.getId());
//        Optional<EventDTO> updatedEvent = eventService.updateEvent(eventDTO);
//
//        return ResponseUtil.wrapOrNotFound(
//            updatedEvent,
//            HeaderUtil.createAlert(applicationName, "eventManagement.updated", eventDTO.getId().toString())
//        );
//    }

//    //get future events (date in future + should filter out events that contain a corporate subgroup but that the logged in user doesn't fit)
//    @GetMapping("/getFutureEvents")
//    public ResponseEntity getFutureEvents() {
//        try{
//            return ResponseEntity.ok().body(eventService.getAll());
//        } catch (Exception e){
//            return ResponseEntity.internalServerError().body(e.getMessage());
//        }
//    }

    @GetMapping("/getAll")
    public ResponseEntity getAllEvents() {
        try{
            return ResponseEntity.ok().body(eventService.getAll());
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PatchMapping("/updateEvent")
    public ResponseEntity<EventDTO> updateEvent(@Valid @RequestBody EventDTO eventDTO) {
        log.debug("REST request to update Event : {}", eventDTO);
        Optional<Event> existingEvent = eventRepository.findOneById(eventDTO.getId());
        Optional<EventDTO> updatedEvent = eventService.updateEvent(eventDTO);

        return tech.jhipster.web.util.ResponseUtil.wrapOrNotFound(
            updatedEvent,
            HeaderUtil.createAlert(applicationName, "eventManagement.updated", eventDTO.getId().toString())
        );
    }

    @GetMapping(value = "/exportCSV", produces = "text/csv")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity getEventVolunteersCSV(@RequestParam Long eventID) {
        try{
            CsvDTO csvDTO = eventService.createCSVFileOfEventVolunteers(eventID);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + csvDTO.getFileName());
            headers.set(HttpHeaders.CONTENT_TYPE, "text/csv");
            return  ResponseEntity
                .ok()
                .headers(headers)
                .body(csvDTO.getDataStream());
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping(value = "/exportAll", produces = "text/csv")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity getAllEventInfoEventVolunteersCSV() {
        try{
            CsvDTO csvDTO = eventService.createCSVFileOfAllEventDescription();
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + csvDTO.getFileName());
            headers.set(HttpHeaders.CONTENT_TYPE, "text/csv");
            return  ResponseEntity
                .ok()
                .headers(headers)
                .body(csvDTO.getDataStream());

        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping(value = "/exportAllVolunteers", produces = "text/csv")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity getAllEventVolunteersCSV() {
        try{
            CsvDTO csvDTO = eventService.createCSVFileOfAllEventVolunteers();
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + csvDTO.getFileName());
            headers.set(HttpHeaders.CONTENT_TYPE, "text/csv");
            return  ResponseEntity
                .ok()
                .headers(headers)
                .body(csvDTO.getDataStream());

        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }


}

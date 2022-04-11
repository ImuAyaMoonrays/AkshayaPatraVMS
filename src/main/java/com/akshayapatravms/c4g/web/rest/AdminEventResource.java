package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.service.EventService;
import com.akshayapatravms.c4g.service.dto.CsvDTO;
import com.akshayapatravms.c4g.service.dto.event.AdminCreateOrUpdateEventDTO;
import com.akshayapatravms.c4g.service.dto.event.AdminEventResponseDTO;
import com.akshayapatravms.c4g.service.mapper.EventMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/events")
@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
public class AdminEventResource {

    private final Logger log = LoggerFactory.getLogger(AdminEventResource.class);

    private final EventService eventService;

    private final EventRepository eventRepository;

    private final EventMapper eventMapper;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public AdminEventResource(EventService eventService, EventRepository eventRepository, EventMapper eventMapper) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    @PostMapping(value = "/createEvent", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public AdminEventResponseDTO createEvent(
        @RequestPart("eventWithoutImage") @Valid AdminCreateOrUpdateEventDTO createEventDTO,
        @RequestPart("file") @Valid MultipartFile image) throws URISyntaxException {
        return new AdminEventResponseDTO(eventService.createEvent(createEventDTO, image));
    }

    @GetMapping("/{id}")
    public AdminEventResponseDTO eventById(@PathVariable Long id) throws URISyntaxException {
        Optional<Event> event = eventRepository.findAllEventInfoForEvent(id);
        if (event.isPresent()) {
            return new AdminEventResponseDTO(event.get());
        } else {
            throw new RuntimeException("could not find an event by this id");
        }
    }

    @DeleteMapping()
    public ResponseEntity deleteEvent(@RequestParam Long id) {
        try {
            log.debug("REST request to delete Event: {}", id);
            eventService.deleteEvent(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<AdminEventResponseDTO> allEvents() {
        return this.eventMapper.eventsToAdminEventResponseDTOS(this.eventRepository.findAllEventInfo());
    }

    @GetMapping("/allPast")
    public List<AdminEventResponseDTO> getAllPastEvents() {
        return eventMapper.eventsToAdminEventResponseDTOS(eventService.allPastEvents());
    }

    @GetMapping("/allFuture")
    public List<AdminEventResponseDTO> getAllFutureEvents() {
        return eventMapper.eventsToAdminEventResponseDTOS(eventService.allFutureEvents());
    }

    @PatchMapping(value = "/updateEvent", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public AdminEventResponseDTO updateEvent(
        @RequestPart("eventWithoutImage") @Valid AdminCreateOrUpdateEventDTO adminUpdateDTO,
        @RequestPart("file") @Valid MultipartFile image) {
        return new AdminEventResponseDTO(eventService.updatedEvent(adminUpdateDTO, image));
    }

    @GetMapping(value = "/exportCSV", produces = "text/csv")
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

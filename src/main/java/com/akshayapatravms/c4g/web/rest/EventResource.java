package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.service.EventService;
import com.akshayapatravms.c4g.service.dto.CsvDTO;
import com.akshayapatravms.c4g.service.dto.event.CreateEventDTO;
import com.akshayapatravms.c4g.service.dto.event.EventResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

//todo: have controllers return response entities
@RestController
@RequestMapping("/api/events")
public class EventResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final EventService eventService;

    private final EventRepository eventRepository;

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
        try {
            eventService.volunteerForEvent(eventID);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

    }

    //should this be a delete? and change @pathVariable to RequestParam?
    @GetMapping("/unregister/{id}")
    public ResponseEntity unregisterForEvent(@PathVariable Long id) {
        try {
            eventService.unRegisterForEvent(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity getAllEvents() {
        try {
            return ResponseEntity.ok().body(eventService.getAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping(value = "/exportCSV", produces = "text/csv")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity getEventVolunteersCSV(@RequestParam Long eventID) {
        try {
            CsvDTO csvDTO = eventService.createCSVFileOfEventVolunteers(eventID);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + csvDTO.getFileName());
            headers.set(HttpHeaders.CONTENT_TYPE, "text/csv");
            return ResponseEntity
                .ok()
                .headers(headers)
                .body(csvDTO.getDataStream());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }


    //input date is YYYY-MM-DD. leading zeros must be included
    @GetMapping(value = "/exportAll", produces = "text/csv")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity getAllEventInfoEventVolunteersCSV(
        @RequestParam(value = "startDate",
            required = false,
            defaultValue ="#{T(java.time.LocalDate).now().minusYears(1)}"
        ) LocalDate startDate,
        @RequestParam(value = "endDate",
            required = false,
            defaultValue = "#{T(java.time.LocalDate).now()}"
        ) LocalDate endDate
    ) {
        try{
            CsvDTO csvDTO = eventService.createCSVFileOfAllEventDescription(startDate,endDate);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + csvDTO.getFileName());
            headers.set(HttpHeaders.CONTENT_TYPE, "text/csv");
            return ResponseEntity
                .ok()
                .headers(headers)
                .body(csvDTO.getDataStream());
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping(value = "/exportAllVolunteers", produces = "text/csv")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity getAllEventVolunteersCSV(
        @RequestParam(value = "startDate",
            required = false,
            defaultValue ="#{T(java.time.LocalDate).now()}"
        ) LocalDate startDate,
        @RequestParam(value = "endDate",
            required = false,
            defaultValue = "#{T(java.time.LocalDate).now().plusYears(1000)}"
        ) LocalDate endDate
    ) {
        try{
            CsvDTO csvDTO = eventService.createCSVFileOfAllEventVolunteers(startDate,endDate);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + csvDTO.getFileName());
            headers.set(HttpHeaders.CONTENT_TYPE, "text/csv");
            return ResponseEntity
                .ok()
                .headers(headers)
                .body(csvDTO.getDataStream());

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }


}

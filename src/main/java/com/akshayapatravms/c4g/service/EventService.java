package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.*;
import com.akshayapatravms.c4g.repository.CauseRepository;
import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.security.SecurityUtils;
import com.akshayapatravms.c4g.service.dto.CsvDTO;
import com.akshayapatravms.c4g.service.dto.event.AbstractEventDTO;
import com.akshayapatravms.c4g.service.dto.event.CreateEventDTO;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class EventService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final EventRepository eventRepository;

    private final CauseRepository causeRepository;

    private final CorporateSubgroupRepository corporateSubgroupRepository;

    private final UserService userService;

    private final ImageService imageService;

    private final CacheManager cacheManager;

    public EventService(
        EventRepository eventRepository,
        CacheManager cacheManager,
        UserService userService,
        ImageService imageService,
        CauseRepository causeRepository,
        CorporateSubgroupRepository corporateSubgroupRepository
    ) {
        this.eventRepository = eventRepository;
        this.cacheManager = cacheManager;
        this.userService = userService;
        this.imageService = imageService;
        this.causeRepository = causeRepository;
        this.corporateSubgroupRepository = corporateSubgroupRepository;
    }

    public Event createEvent(CreateEventDTO createEventDTO, MultipartFile image) {
        Event event = new Event();

        if (image != null) {
            Image persistedImage = this.persistedImage(image);
            event.setImage(persistedImage);
        }


        if (createEventDTO.getCauses() != null && createEventDTO.getCauses().size() > 0) {
            Set<Cause> causes = existingAndNewCauses(createEventDTO);
            event.setCauses(causes);
        }


        if (createEventDTO.getEmailFilters() != null && createEventDTO.getEmailFilters().size() > 0) {
            CorporateSubgroup corporateSubgroup = newCorporateSubgroup(createEventDTO.getEmailFilters());
            event.setCorporateSubgroups(Collections.singleton(corporateSubgroup));
        }


        event.setEventName(createEventDTO.getEventName());

        if (createEventDTO.getPhysicalLocation() != null) {
            event.setLocation(new PhysicalLocation(createEventDTO.getPhysicalLocation()));
        } else if (createEventDTO.getVirtualLocation() != null) {
            event.setVirtualLocation(new VirtualLocation(createEventDTO.getVirtualLocation()));
        }

        event.setDescription(createEventDTO.getDescription());
        event.setVolunteersNeededAmount(createEventDTO.getVolunteersNeededAmount());
        event.setStartDate(createEventDTO.getStartDate());
        event.setEndDate(createEventDTO.getEndDate());
        event.setStartTime(new Time(createEventDTO.getStartTime()));
        event.setEndTime(new Time(createEventDTO.getEndTime()));
        event.setContactName(createEventDTO.getContactName());
        event.setContactPhoneNumber(createEventDTO.getContactPhoneNumber());
        event.setContactEmail(createEventDTO.getContactEmail());
        event.setEmailBody(createEventDTO.getEmailBody());

        User user = userService.getUserWithAuthorities().orElseThrow(() -> new RuntimeException("couldn't find currently logged in user"));
        event.setEventCreator(user);

        return eventRepository.save(event);
    }

    //saves new causes to db
    private Set<Cause> existingAndNewCauses(AbstractEventDTO abstractEventDTO) throws RuntimeException {
        return abstractEventDTO
            .getCauses()
            .stream()
            .map(causeDTO -> {
                if (causeDTO.getId() != null) {
                    return causeRepository
                        .findOneById(causeDTO.getId())
                        .orElseThrow(() -> new RuntimeException("inexistant " + "cause by id"));
                } else {
                    //doesnt have an ID but has a name that matches an existing. Should the behavior be to use the cause with the matching name?
                    if (causeRepository.findOneByCauseName(causeDTO.getCauseName().toUpperCase()).isPresent()) {
                        log.error("cause + " + causeDTO.getCauseName() + " already exists");
                        throw new RuntimeException(
                            "One of the cause names you requested already exists. Please send its ID or choose a " + "new cause name"
                        );
                    } else {
                        Cause cause = new Cause();
                        cause.setCauseName(causeDTO.getCauseName().toUpperCase());
                        return causeRepository.save(cause);
                    }
                }
            })
            .collect(Collectors.toSet());
    }

    //    temporarily only sending events with a list of email filters, ie @google.com, @apple.com
    private CorporateSubgroup newCorporateSubgroup(Set<String> emailFilters) {
        CorporateSubgroup corporateSubgroup = new CorporateSubgroup();
        corporateSubgroup.setSubgroupEmailPatterns(emailFilters);
        return corporateSubgroupRepository.save(corporateSubgroup);
    }

    private Image persistedImage(MultipartFile image) throws RuntimeException {
        try {
            return imageService.saveImage(image);
        } catch (IOException ioException) {
            throw new RuntimeException("Cannot accept this filetype");
        }
    }

    private HashSet<String> getEmailPatternsForEvent(Event event) {
        HashSet<String> emailPatterns = new HashSet<>();
        for (CorporateSubgroup corp : event.getCorporateSubgroups()) {
            emailPatterns.addAll(corp.getSubgroupEmailPatterns());
        }

        return emailPatterns;
    }

    private Boolean isEmailMatch(Set<String> emailPatterns, String email) {
        for (String emailPattern : emailPatterns) {
            if (email.endsWith(emailPattern)) {
                return true;
            }
        }
        return false;
    }

    public void checkEligibility(User user, Event event) throws RuntimeException {
//          Turned off until we have TOS set up
//        if (user.getAcceptedTOS() != true){
//            throw new RuntimeException("User has not accepted TOS");
//        }

        //have volunteers spots left
        if (event.getVolunteers().size() >= event.getVolunteersNeededAmount()) {
            throw new RuntimeException("volunteering event is full");
        }

        //does user have an email that is eligible for event
        if (event.getCorporateSubgroups().size() > 0) {
            HashSet<String> emailPatterns = getEmailPatternsForEvent(event);
            if (!isEmailMatch(emailPatterns, user.getEmail())) {
                throw new RuntimeException("user does not have an allowed corporate email");
            }
        }

        log.info("user is eligible for event");
    }


    public void volunteerForEvent(Long eventID) throws RuntimeException {
        final Optional<User> isUser = userService.getUserWithAuthorities();
        if (!isUser.isPresent()) {
            throw new RuntimeException("unable to find user");
        }

        final User user = isUser.get();

        Optional<Event> event = eventRepository.findOneById(eventID);

        if (event.isPresent()) {
            try {
                checkEligibility(user, event.get());
                event.get().getVolunteers().add(user);
                eventRepository.save(event.get());
            } catch (Exception e) {
                throw e;
            }

        } else {
            throw new RuntimeException("unable to find event");
        }

    }

    public void unRegisterForEvent(Long eventID) throws RuntimeException {

        final Optional<User> isUser = userService.getUserWithAuthorities();
        if (!isUser.isPresent()) {
            throw new RuntimeException("unable to find user");
        }
        final User user = isUser.get();

        Optional<Event> event = eventRepository.findOneById(eventID);

        if (event.isPresent()) {
            try {
//                log.info("event" + event.get());
//                log.info("volunteer count before " + event.get().getVolunteers().size());
                event.get().getVolunteers().remove(isUser.get());
//                log.info("volunteer count after " + event.get().getVolunteers().size());
//                log.info("user id " + user.getId() + " event id " + event.get().getId());
                eventRepository.save(event.get());

//                log.info("num of volunteers " + event.get().getVolunteers().size());
//                log.info("num of events vol for " + user.getEvents().size());
//                log.info("volunteers for event " + event.get().getVolunteers());
//                log.info("events volunteering for " + user.getEvents());
                //join table is emptied, but user is still showing events.
            } catch (Exception e) {
                throw new RuntimeException("unable to save event");
            }
        } else {
            throw new RuntimeException("unable to find event");
        }
    }

    public List<Event> getAll() throws RuntimeException {
        final Optional<User> isUser = userService.getUserWithAuthorities();
        if (!isUser.isPresent()) {
            throw new RuntimeException("unable to find user");
        }
        if (SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)) {
            return eventRepository.findAllEventInfo();
        } else {
            return eventRepository.findAll();
        }
    }


    //code from https://codeburst.io/returning-csv-content-from-an-api-in-spring-boot-63ea82bbcf0f
    public CsvDTO createCSVFileOfEventVolunteers(Long eventID) throws RuntimeException {
        String[] csvHeader = {
            "name", "email"
        };

        Event event = eventRepository.getById(eventID);
        Set<User> volunteers = event.getVolunteers();
        List<List<String>> csvBody = new ArrayList<>(volunteers.size());
        for (User volunteer : volunteers) {
            csvBody.add(Arrays.asList(volunteer.getFullName(), volunteer.getEmail()));
        }

        ByteArrayInputStream byteArrayOutputStream = createCSVStream(csvHeader, csvBody);
        CsvDTO csvDTO = new CsvDTO();
        //add date as well to name?
        //may need to validate event name in case there's some character in the name that doesn't play well with filenames
        csvDTO.setFileName(event.getEventName() + "_volunteers.csv");
        csvDTO.setDataStream(new InputStreamResource(byteArrayOutputStream));
        return csvDTO;
    }

    public CsvDTO createCSVFileOfAllEventDescription(LocalDate startDate, LocalDate endDate) throws RuntimeException {
        String[] csvHeader = {
            "id",
            "eventName",
            "eventDescription",
            "volunteersNeeded",
            "volunteersSignedUpCount",
            "startDate",
            "endDate",
            "contactName",
            "contactPhoneNumber",
            "contactEmail",
            "emailBody",
            "causeList",
            "corpSubGroupList",
            "address",
            "state",
            "city",
            "locality",
            "region",
            "country",
            "url",
            "passcode"
        };

        ZoneId zone = ZoneId.of("Asia/Kolkata");
        Instant startDateInstant = startDate.atStartOfDay().atZone(zone).toInstant();
        Instant endDateInstant = endDate.atStartOfDay().atZone(zone).toInstant();

        List<Event> events = eventRepository.findAllEventInfoWithDateFilter(startDateInstant,endDateInstant);
        List<List<String>> csvBody = new ArrayList<>(events.size());

        for (Event event : events) {
            String address = null;
            String state = null;
            String city = null;
            String locality = null;
            String region = null;
            String country = null;
            String passcode = null;
            String url = null;
            if (event.getPhysicalLocation() != null) {
                address = event.getPhysicalLocation().getAddress();
                state = event.getPhysicalLocation().getState();
                city = event.getPhysicalLocation().getCity();
                locality = event.getPhysicalLocation().getLocality();
                region = event.getPhysicalLocation().getRegion();
                country = event.getPhysicalLocation().getCountry();
            }
            if (event.getVirtualLocation() != null) {
                passcode = event.getVirtualLocation().getPasscode();
                url = event.getVirtualLocation().getUrl();
            }

            csvBody.add(Arrays.asList(
                String.valueOf(event.getId()),
                event.getEventName(),
                event.getDescription(),
                String.valueOf(event.getVolunteersNeededAmount()),
                String.valueOf(event.getVolunteers().size()),
                event.getStartDate().toString(),
                event.getEndDate().toString(),
                event.getContactName(),
                event.getContactEmail(),
                event.getContactPhoneNumber(),
                event.getEmailBody(),
                event.getCauseList(),
                event.getCorpGroupList(),
                address,
                state,
                city,
                locality,
                region,
                country,
                url,
                passcode
            ));
        }

        ByteArrayInputStream byteArrayOutputStream = createCSVStream(csvHeader, csvBody);
        CsvDTO csvDTO = new CsvDTO();
        csvDTO.setFileName("all_event_info.csv");
        csvDTO.setDataStream(new InputStreamResource(byteArrayOutputStream));
        return csvDTO;
    }

    public CsvDTO createCSVFileOfAllEventVolunteers(LocalDate startDate, LocalDate endDate) throws RuntimeException {
        String[] csvHeader = {
            "eventID",
            "eventName",
            "volunteerName",
            "volunteerEmail"
        };


        ZoneId zone = ZoneId.of("Asia/Kolkata");
        Instant startDateInstant = startDate.atStartOfDay().atZone(zone).toInstant();
        Instant endDateInstant = endDate.atStartOfDay().atZone(zone).toInstant();

        List<Event> events = eventRepository.findAllEventsAndVolunteers(startDateInstant,endDateInstant);
        List<List<String>> csvBody = new ArrayList<>(events.size());

        for (Event event : events) {
            String eventID = String.valueOf(event.getId());
            String eventName = String.valueOf(event.getEventName());
            for (User user : event.getVolunteers()) {
                csvBody.add(Arrays.asList(
                    eventID,
                    eventName,
                    user.getFullName(),
                    user.getEmail()
                ));
            }
        }


        ByteArrayInputStream byteArrayOutputStream = createCSVStream(csvHeader, csvBody);
        CsvDTO csvDTO = new CsvDTO();
        csvDTO.setFileName("all_event_volunteers.csv");
        csvDTO.setDataStream(new InputStreamResource(byteArrayOutputStream));
        return csvDTO;
    }

    private ByteArrayInputStream createCSVStream(String[] csvHeader, List<List<String>> csvBody) throws RuntimeException {
        ByteArrayInputStream byteArrayOutputStream;

        try (
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            CSVPrinter csvPrinter = new CSVPrinter(
                new PrintWriter(out),
                CSVFormat.DEFAULT.withHeader(csvHeader)
            );
        ) {
            for (List<String> record : csvBody) {
                csvPrinter.printRecord(record);
            }
            csvPrinter.flush();
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}

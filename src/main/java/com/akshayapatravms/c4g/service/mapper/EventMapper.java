package com.akshayapatravms.c4g.service.mapper;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.domain.User;
import com.akshayapatravms.c4g.service.UserService;
import com.akshayapatravms.c4g.service.dto.event.AdminEventResponseDTO;
import com.akshayapatravms.c4g.service.dto.event.UserEventResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventMapper {

    private final UserService userService;

    public EventMapper(UserService userService) {
        this.userService = userService;
    }

    public List<AdminEventResponseDTO> eventsToAdminEventResponseDTOS(List<Event> events) {
        return events.stream().map(AdminEventResponseDTO::new).collect(Collectors.toList());
    }

    public List<UserEventResponseDTO> eventsToUserEventResponseDTOS(List<Event> events) {
        return events.stream().map(this::eventToUserEventResponseDTO).collect(Collectors.toList());
    }

    public UserEventResponseDTO eventToUserEventResponseDTO(Event event) {
        final Optional<User> loggedInUserOptional = userService.getUserWithAuthorities();
        if (loggedInUserOptional.isPresent()) {
            final boolean isRegistered = event.getVolunteers().stream()
                .anyMatch(volunteer -> volunteer.getId().equals(loggedInUserOptional.get().getId()));
            return new UserEventResponseDTO(event, isRegistered);
        } else {
            throw new RuntimeException("Could not find logged in user");
        }
    }

}

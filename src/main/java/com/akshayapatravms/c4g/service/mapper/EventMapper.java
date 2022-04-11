package com.akshayapatravms.c4g.service.mapper;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.service.dto.event.AdminEventResponseDTO;
import com.akshayapatravms.c4g.service.dto.event.UserEventResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventMapper {

    public List<AdminEventResponseDTO> eventsToAdminEventResponseDTOS(List<Event> events) {
        return events.stream().map(AdminEventResponseDTO::new).collect(Collectors.toList());
    }
    public List<UserEventResponseDTO> eventsToUserEventResponseDTOS(List<Event> events) {
        return events.stream().map(UserEventResponseDTO::new).collect(Collectors.toList());
    }

}

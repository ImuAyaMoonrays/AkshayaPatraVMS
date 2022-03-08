package com.akshayapatravms.c4g.service.dto;

import java.util.Set;

public class ProfileDTO {
    private Boolean acceptedTOS;
    private  Integer age;
    private String name;
    private String phoneNumber;
    private LocationDTO locationDTO;
    private Set<EventDTO> eventDTOs;

    public ProfileDTO(){

    }

    public Boolean getAcceptedTOS() {
        return acceptedTOS;
    }

    public void setAcceptedTOS(Boolean acceptedTOS) {
        this.acceptedTOS = acceptedTOS;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocationDTO getLocationDTO() {
        return locationDTO;
    }

    public void setLocationDTO(LocationDTO locationDTO) {
        this.locationDTO = locationDTO;
    }

    public Set<EventDTO> getEventDTOs() {
        return eventDTOs;
    }

    public void setEventDTOs(Set<EventDTO> eventDTOs) {
        this.eventDTOs = eventDTOs;
    }


}

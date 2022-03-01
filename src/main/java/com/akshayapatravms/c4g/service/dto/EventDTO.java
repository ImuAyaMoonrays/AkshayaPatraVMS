package com.akshayapatravms.c4g.service.dto;

import java.time.Instant;
import java.util.Set;

public class EventDTO {

    private Long id;

    private Set<String> causeNames;

    private LocationDTO location;

    private String description;

    private Integer volunteersNeededAmount;

    private Instant startDateAndTime;

    private Instant endDateAndTime;

    private String contactName;

    private String contactPhoneNumber;

    private String contactEmail;

    private String emailBody;

    public EventDTO() {}

    public Set<String> getCauseNames() {
        return causeNames;
    }

    public void setCauseNames(Set<String> causeNames) {
        this.causeNames = causeNames;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getVolunteersNeededAmount() {
        return volunteersNeededAmount;
    }

    public void setVolunteersNeededAmount(Integer volunteersNeededAmount) {
        this.volunteersNeededAmount = volunteersNeededAmount;
    }

    public String getEmailBody() {
        return emailBody;
    }

    public void setEmailBody(String emailBody) {
        this.emailBody = emailBody;
    }

    public Instant getStartDateAndTime() {
        return startDateAndTime;
    }

    public void setStartDateAndTime(Instant startDateAndTime) {
        this.startDateAndTime = startDateAndTime;
    }

    public Instant getEndDateAndTime() {
        return endDateAndTime;
    }

    public void setEndDateAndTime(Instant endDateAndTime) {
        this.endDateAndTime = endDateAndTime;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactPhoneNumber() {
        return contactPhoneNumber;
    }

    public void setContactPhoneNumber(String contactPhoneNumber) {
        this.contactPhoneNumber = contactPhoneNumber;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }
}

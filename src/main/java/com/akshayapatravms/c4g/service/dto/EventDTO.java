package com.akshayapatravms.c4g.service.dto;

import com.akshayapatravms.c4g.domain.*;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class EventDTO {

    private Long id;

    private Set<Cause> causes;

    private Set<Long> corporateSubgroupIds;

    private String eventName;

    private PhysicalLocationDTO physicalLocation;

    private VirtualLocationDTO virtualLocation;

    private String description;

    private Integer volunteersNeededAmount;

    private Instant startDate;

    private Instant endDate;

    private TimeDTO startTime;

    private TimeDTO endTime;

    private String contactName;

    private String contactPhoneNumber;

    private String contactEmail;

    private String emailBody;

    public EventDTO() {}

    public EventDTO(Event event) {
        this.id = event.getId();
        this.eventName = event.getEventName();
        this.description = event.getDescription();
        this.volunteersNeededAmount = event.getVolunteersNeededAmount();
        this.startDate = event.getStartDate();
        this.endDate = event.getEndDate();
        this.contactName = event.getContactName();
        this.contactPhoneNumber = event.getContactPhoneNumber();
        this.contactEmail = event.getContactEmail();
        this.emailBody = event.getEmailBody();

        // Need to find out why are these DTO's?
        //this.physicalLocation = new PhysicalLocationDTO(event.getPhysicalLocation());
        //this.startTime = new TimeDTO(event.getStartTime());
        //this.endTime = new TimeDTO(event.getEndTime());

        // Event has Set<Cause>, EventDTO is expecting Set<CauseDTO>
        this.causes = event.getCauses();
        this.corporateSubgroupIds = event.getCorporateSubgroups().stream().map(CorporateSubgroup::getId).collect(Collectors.toSet());

    }

    public VirtualLocationDTO getVirtualLocation() {
        return virtualLocation;
    }

    public void setVirtualLocation(VirtualLocationDTO virtualLocation) {
        this.virtualLocation = virtualLocation;
    }

    public TimeDTO getStartTime() {
        return startTime;
    }

    public void setStartTime(TimeDTO startTime) {
        this.startTime = startTime;
    }

    public TimeDTO getEndTime() {
        return endTime;
    }

    public void setEndTime(TimeDTO endTime) {
        this.endTime = endTime;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Set<Long> getCorporateSubgroupIds() {
        return corporateSubgroupIds;
    }

    public void setCorporateSubgroupIds(Set<Long> corporateSubgroupIds) {
        this.corporateSubgroupIds = corporateSubgroupIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Cause> getCauses() {
        return causes;
    }

    public void setCauses(Set<Cause> causes) {
        this.causes = causes;
    }

    public PhysicalLocationDTO getPhysicalLocation() {
        return physicalLocation;
    }

    public void setPhysicalLocation(PhysicalLocationDTO physicalLocation) {
        this.physicalLocation = physicalLocation;
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

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
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

package com.akshayapatravms.c4g.service.dto.event;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.domain.PhysicalLocation;
import com.akshayapatravms.c4g.domain.VirtualLocation;
import com.akshayapatravms.c4g.service.dto.PhysicalLocationDTO;
import com.akshayapatravms.c4g.service.dto.TimeDTO;
import com.akshayapatravms.c4g.service.dto.VirtualLocationDTO;

import javax.validation.constraints.Email;
import java.time.Instant;

public abstract class AbstractEventDTO {

    private Long id;

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

    @Email
    private String contactEmail;


    public AbstractEventDTO() {
    }

    public AbstractEventDTO(Event event) {
        this.id = event.getId();


        this.eventName = event.getEventName();

        final PhysicalLocation physicalLocation = event.getPhysicalLocation();
        if (physicalLocation != null) {
            this.physicalLocation = new PhysicalLocationDTO(physicalLocation);
        }

        final VirtualLocation virtualLocation = event.getVirtualLocation();
        if (virtualLocation != null) {
            this.virtualLocation = new VirtualLocationDTO(virtualLocation);
        }

        this.description = event.getDescription();
        this.volunteersNeededAmount = event.getVolunteersNeededAmount();
        this.startDate = event.getStartDate();
        this.endDate = event.getEndDate();
        this.startTime = new TimeDTO(event.getStartTime());
        this.endTime = new TimeDTO(event.getEndTime());
        this.contactName = event.getContactName();
        this.contactPhoneNumber = event.getContactPhoneNumber();
        this.contactEmail = event.getContactEmail();
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

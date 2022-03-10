package com.akshayapatravms.c4g.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.Nullable;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "event")
public class Event extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    // double check CascadeType persist
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "event_cause", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "cause_id"))
    private Set<Cause> causes = new HashSet<>();

    // double check CascadeType persist
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
        name = "event_corporate_subgroup",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "corporate_subgroup_id")
    )
    private Set<CorporateSubgroup> corporateSubgroups = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
        name = "profile_event",
        joinColumns = @JoinColumn(name = "profile_id"),
        inverseJoinColumns = @JoinColumn(name = "evemt_id"))
    private Set<Profile> volunteers = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "event_creator_id", referencedColumnName = "id", nullable = false)
    @Nullable
    private User eventCreator;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "physical_location_id", referencedColumnName = "id")
    private PhysicalLocation physicalLocation;

    @Size(max = 100)
    @Column(name = "eventName", length = 100)
    private String eventName;

    @Size(max = 1000)
    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "is_virtual")
    private Boolean isVirtual;

    @Column(name = "volunteers_needed_amount")
    private Integer volunteersNeededAmount;

    @Column(name = "start_date_and_time")
    private Instant startDateAndTime;

    @Column(name = "end_date_and_time")
    private Instant endDateAndTime;

    @Size(max = 100)
    @Column(name = "contact_name", length = 100)
    private String contactName;

    @Size(max = 100)
    @Column(name = "contact_phone_number", length = 100)
    private String contactPhoneNumber;

    @Size(max = 100)
    @Column(name = "contact_email", length = 100)
    private String contactEmail;

    @Size(max = 5000)
    @Column(name = "email_body", length = 5000)
    private String emailBody;

    public String getEmailBody() {
        return emailBody;
    }

    public void setEmailBody(String emailBody) {
        this.emailBody = emailBody;
    }

    public Set<CorporateSubgroup> getCorporateSubgroups() {
        return corporateSubgroups;
    }

    public void setCorporateSubgroups(Set<CorporateSubgroup> corporateSubgroups) {
        this.corporateSubgroups = corporateSubgroups;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PhysicalLocation getLocation() {
        return physicalLocation;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventNAme) {
        this.eventName = eventNAme;
    }

    public void setLocation(PhysicalLocation physicalLocation) {
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

    public User getEventCreator() {
        return eventCreator;
    }

    public void setEventCreator(User eventCreator) {
        this.eventCreator = eventCreator;
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

    public Set<Cause> getCauses() {
        return causes;
    }

    public void setCauses(Set<Cause> causes) {
        this.causes = causes;
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

    public Boolean getVirtual() {
        return isVirtual;
    }

    public void setIsVirtual(Boolean virtual) {
        this.isVirtual = virtual;
    }
}

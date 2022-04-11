package com.akshayapatravms.c4g.domain;

import javax.annotation.Nullable;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "event")
public class Event extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    // double check CascadeType persist
    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinTable(name = "event_cause", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "cause_id"))
    private Set<Cause> causes = new HashSet<>();

    // double check CascadeType persist
    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinTable(
        name = "event_corporate_subgroup",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "corporate_subgroup_id")
    )
    private Set<CorporateSubgroup> corporateSubgroups = new HashSet<>();


    @ManyToMany(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_event",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> volunteers = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "event_creator_id", referencedColumnName = "id", nullable = false)
    @Nullable
    private User eventCreator;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "physical_location_id", referencedColumnName = "id")
    private PhysicalLocation physicalLocation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "virtual_location_id", referencedColumnName = "id")
    private VirtualLocation virtualLocation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;

    @Size(max = 100)
    @Column(name = "eventName", length = 100)
    private String eventName;

    @Size(max = 1000)
    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "volunteers_needed_amount")
    private Integer volunteersNeededAmount;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "start_time_id", referencedColumnName = "id")
    private Time startTime;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "end_time_id", referencedColumnName = "id")
    private Time endTime;

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

    public PhysicalLocation getPhysicalLocation() {
        return physicalLocation;
    }

    public void setPhysicalLocation(PhysicalLocation physicalLocation) {
        this.physicalLocation = physicalLocation;
    }

    public VirtualLocation getVirtualLocation() {
        return virtualLocation;
    }

    public void setVirtualLocation(VirtualLocation virtualLocation) {
        this.virtualLocation = virtualLocation;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time endTime) {
        this.endTime = endTime;
    }

    public void setCorporateSubgroups(Set<CorporateSubgroup> corporateSubgroups) {
        this.corporateSubgroups = corporateSubgroups;
    }

    public Long getId() {
        return id;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
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

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDateAndTime) {
        this.startDate = startDateAndTime;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDateAndTime) {
        this.endDate = endDateAndTime;
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

    public Set<User> getVolunteers() {
        return volunteers;
    }

    public void setVolunteers(Set<User> volunteers) {
        this.volunteers = volunteers;
    }

    public String getCauseList(){
        StringBuilder causeList = new StringBuilder();
        for (Cause cause: this.getCauses()){
            if (causeList.length() > 0){
                causeList.append(", " + cause.getCauseName());
            } else{
                causeList.append(cause.getCauseName());
            }

        }
        return causeList.toString();
    }

    public String getCorpGroupList(){
        StringBuilder groupList = new StringBuilder();
        for (CorporateSubgroup subgroup: this.getCorporateSubgroups()){
            if (groupList.length() > 0){
                groupList.append(", " + subgroup.getSubgroupName());
            } else{
                groupList.append(subgroup.getSubgroupName());
            }

        }
        return groupList.toString();
    }

    @Override
    public String toString() {
        return "Event{" +
            "EventName='" + eventName + '\'' +
            ", volunteersNeededAmount='" + volunteersNeededAmount + '\'' +
            ", ID='" + id + '\'' +
            ", description='" + description + '\'' +
            "}";
    }
}

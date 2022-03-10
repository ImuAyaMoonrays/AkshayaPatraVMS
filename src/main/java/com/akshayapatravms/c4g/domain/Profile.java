package com.akshayapatravms.c4g.domain;

import com.akshayapatravms.c4g.service.dto.ProfileDTO;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "profile")
public class Profile extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "profile_event",
        joinColumns = @JoinColumn(name = "profile_id"),
        inverseJoinColumns = @JoinColumn(name = "evemt_id"))
    private Set<Event> events = new HashSet<>();


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private PhysicalLocation physicalLocation;

    @Column(name = "accepted_TOS")
    private Boolean acceptedTOS;

    @Size(max = 100)
    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private Integer age;

    @Size(max = 100)
    @Column(name = "phone_number", length = 100)
    private String phoneNumber;


    public Profile(){

    }

    public Profile(ProfileDTO profileDTO){
        this.acceptedTOS = profileDTO.getAcceptedTOS();
        this.physicalLocation = new PhysicalLocation(profileDTO.getLocationDTO());
        //todo add events to this and make an event constructor from a DTO
        //this.events = EvenprofileDTO.getEventDTOs();
        this.age = profileDTO.getAge();
        this.name = profileDTO.getName();
        this.phoneNumber = profileDTO.getPhoneNumber();
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public PhysicalLocation getLocation() {
        return physicalLocation;
    }

    public void setLocation(PhysicalLocation physicalLocation) {
        this.physicalLocation = physicalLocation;
    }

    public Boolean getAcceptedTOS() {
        return acceptedTOS;
    }

    public void setAcceptedTOS(Boolean acceptedTOS) {
        this.acceptedTOS = acceptedTOS;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

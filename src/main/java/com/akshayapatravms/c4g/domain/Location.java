package com.akshayapatravms.c4g.domain;

import com.akshayapatravms.c4g.enums.PresenceModality;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

// TODO: consider better design pattern for location
@Entity
@Table(name = "location")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Location extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "presence_modality", nullable = false)
    @Enumerated(EnumType.STRING)
    private PresenceModality presenceModality;

    @Size(max = 300)
    @Column(name = "virtual_meeting_address", length = 300)
    private String virtualMeetingAddress;

    @Size(max = 500)
    @Column(name = "address", length = 500)
    private String address;

    @Size(max = 100)
    @Column(name = "state", length = 100)
    private String state;

    @Size(max = 200)
    @Column(name = "city", length = 200)
    private String city;

    @Size(max = 200)
    @Column(name = "locality", length = 200)
    private String locality;

    @Size(max = 50)
    @Column(name = "pincode", length = 50)
    private Long pincode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PresenceModality getPresenceModality() {
        return presenceModality;
    }

    public void setPresenceModality(PresenceModality presenceModality) {
        this.presenceModality = presenceModality;
    }

    public String getVirtualMeetingAddress() {
        return virtualMeetingAddress;
    }

    public void setVirtualMeetingAddress(String virtualMeetingAddress) {
        this.virtualMeetingAddress = virtualMeetingAddress;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLocality() {
        return locality;
    }

    public void setLocality(String locality) {
        this.locality = locality;
    }

    public Long getPincode() {
        return pincode;
    }

    public void setPincode(Long pincode) {
        this.pincode = pincode;
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }
}

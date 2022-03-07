package com.akshayapatravms.c4g.domain;

import com.akshayapatravms.c4g.enums.PresenceModality;
import com.akshayapatravms.c4g.service.dto.LocationDTO;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "location")
public class Location extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

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


    @Size(max = 200)
    @Column(name = "region", length = 200)
    private String region;

    @Size(max = 200)
    @Column(name = "country", length = 200)
    private String country;

    public  Location(){
    }

    public  Location(LocationDTO locationDTO) {
        this.setAddress(locationDTO.getAddress());
        this.setCity(locationDTO.getCity());
        this.setLocality(locationDTO.getLocality());
        this.setState(locationDTO.getState());
        this.setRegion(locationDTO.getRegion());
        this.setCountry(locationDTO.getCountry());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}

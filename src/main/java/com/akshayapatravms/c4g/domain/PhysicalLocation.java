package com.akshayapatravms.c4g.domain;

import com.akshayapatravms.c4g.service.dto.PhysicalLocationDTO;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "physical_location")
public class PhysicalLocation extends AbstractAuditingEntity implements Serializable {

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

    public PhysicalLocation(){
    }

    public PhysicalLocation(PhysicalLocationDTO physicalLocationDTO) {
        this.setAddress(physicalLocationDTO.getAddress());
        this.setCity(physicalLocationDTO.getCity());
        this.setLocality(physicalLocationDTO.getLocality());
        this.setState(physicalLocationDTO.getState());
        this.setRegion(physicalLocationDTO.getRegion());
        this.setCountry(physicalLocationDTO.getCountry());
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

    @Override
    public String toString() {
        return "PhyscialLocation{" +
            "Address='" + address + '\'' +
            ", State='" + state + '\'' +
            ", City='" + city + '\'' +
            ", Locality='" + locality + '\'' +
            ", Region='" + region + '\'' +
            ", Country='" + country + '\'' +
            "}";
    }

}

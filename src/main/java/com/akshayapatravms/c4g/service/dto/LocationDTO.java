package com.akshayapatravms.c4g.service.dto;

import com.akshayapatravms.c4g.enums.PresenceModality;

public class LocationDTO {

    private String address;

    private String state;

    private String city;

    private String locality;

    private String region;

    private String country;

    public LocationDTO() {
        // Empty constructor needed for Jackson.
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

}

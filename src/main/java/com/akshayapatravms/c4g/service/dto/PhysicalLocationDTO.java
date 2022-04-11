package com.akshayapatravms.c4g.service.dto;

import com.akshayapatravms.c4g.domain.PhysicalLocation;

public class PhysicalLocationDTO {

    private String address;

    private String state;

    private String city;

    private String locality;

    private String region;

    private String country;

    public PhysicalLocationDTO() {
        // Empty constructor needed for Jackson.
    }

    public PhysicalLocationDTO(PhysicalLocation physicalLocation) {
        this.address = physicalLocation.getAddress();
        this.state = physicalLocation.getState();
        this.city = physicalLocation.getCity();
        this.locality = physicalLocation.getLocality();
        this.region = physicalLocation.getRegion();
        this.country = physicalLocation.getCountry();

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

    public PhysicalLocation createUpdatedPhysicalLocation(PhysicalLocation physicalLocation){
        if (physicalLocation == null){
            physicalLocation = new PhysicalLocation();
        }

        if (this.address != null){
            physicalLocation.setAddress(this.address);
        }
        if (this.locality != null){
            physicalLocation.setLocality(this.locality);
        }
        if (this.city != null){
            physicalLocation.setCity(this.city);
        }
        if (this.country!= null){
            physicalLocation.setCountry(this.country);
        }
        if (this.state!= null){
            physicalLocation.setState(this.state);
        }

        return physicalLocation;
    }

    @Override
    public String toString() {
        return "PhyscialLocationDTO{" +
            "Address='" + address + '\'' +
            ", State='" + state + '\'' +
            ", City='" + city + '\'' +
            ", Locality='" + locality + '\'' +
            ", Region='" + region + '\'' +
            ", Country='" + country + '\'' +
            "}";
    }

}

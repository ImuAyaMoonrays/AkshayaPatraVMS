package com.akshayapatravms.c4g.service.dto;

import com.akshayapatravms.c4g.enums.PresenceModality;

public class LocationDTO {

    private PresenceModality presenceModality;

    private String virtualMeetingAddress;

    private String address;

    private String state;

    private String city;

    private String locality;

    private Long pincode;

    public LocationDTO() {
        // Empty constructor needed for Jackson.
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
}

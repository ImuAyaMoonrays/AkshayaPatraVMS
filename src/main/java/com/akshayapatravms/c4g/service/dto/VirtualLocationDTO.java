package com.akshayapatravms.c4g.service.dto;

import com.akshayapatravms.c4g.domain.VirtualLocation;

public class VirtualLocationDTO {

    private String url;

    private String passcode;

    public VirtualLocationDTO() {
    }

    public VirtualLocationDTO(VirtualLocation virtualLocation) {
        this.url = virtualLocation.getUrl();
        this.passcode = virtualLocation.getPasscode();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPasscode() {
        return passcode;
    }

    public void setPasscode(String passcode) {
        this.passcode = passcode;
    }
}

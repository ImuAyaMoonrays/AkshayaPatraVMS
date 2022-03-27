package com.akshayapatravms.c4g.service.dto;

import com.akshayapatravms.c4g.domain.Cause;

public class CauseDTO {

    //    if payload contains id, will find existing cause by this id
    private Long id;

    private String causeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCauseName() {
        return causeName;
    }

    public void setCauseName(String causeName) {
        this.causeName = causeName;
    }

    public CauseDTO() {}

    public CauseDTO(Cause cause) {
        this.id = cause.getId();
        this.causeName = cause.getCauseName();
    }
}

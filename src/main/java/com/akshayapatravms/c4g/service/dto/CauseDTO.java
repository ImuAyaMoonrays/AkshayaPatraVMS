package com.akshayapatravms.c4g.service.dto;

public class CauseDTO {

    //    if payload contains id, will find existing cause by this id
    private Long id;

    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

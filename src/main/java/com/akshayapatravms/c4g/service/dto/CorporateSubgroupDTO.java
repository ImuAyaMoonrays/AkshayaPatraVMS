package com.akshayapatravms.c4g.service.dto;

import java.util.Set;

public class CorporateSubgroupDTO {

    private Long id;

    private String subgroupName;

    private Set<String> subgroupEmailPatterns;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubgroupName() {
        return subgroupName;
    }

    public void setSubgroupName(String subgroupName) {
        this.subgroupName = subgroupName;
    }

    public Set<String> getSubgroupEmailPatterns() {
        return subgroupEmailPatterns;
    }

    public void setSubgroupEmailPatterns(Set<String> subgroupEmailPatterns) {
        this.subgroupEmailPatterns = subgroupEmailPatterns;
    }
}

package com.akshayapatravms.c4g.service.dto;

import java.util.Set;

public class CorporateSubgroupDTO {

    private String subgroupName;

    private Set<String> subgroupEmailPatterns;

    public String getUppercaseSubgroupName() {
        return subgroupName.toUpperCase();
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

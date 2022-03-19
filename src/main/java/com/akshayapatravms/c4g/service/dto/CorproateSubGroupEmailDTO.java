package com.akshayapatravms.c4g.service.dto;

import java.util.List;
import java.util.Set;

public class CorproateSubGroupEmailDTO {
    private Long corporateSubgroupID;

    private List<String> emailPatterns;


    public Long getCorporateSubgroupID() {
        return corporateSubgroupID;
    }

    public void setCorporateSubgroupID(Long corporateSubgroupID) {
        this.corporateSubgroupID = corporateSubgroupID;
    }

    public List<String> getEmailPatterns() {
        return emailPatterns;
    }

    public void setEmailPatterns(List<String> emailPatterns) {
        this.emailPatterns = emailPatterns;
    }
}

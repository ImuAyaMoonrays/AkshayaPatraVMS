package com.akshayapatravms.c4g.service.dto.event;

import java.util.Set;

public class AdminCreateOrUpdateEventDTO extends AbstractAdminEventDTO{

    private Set<String> newCauses;
    private Set<Long> existingCauseIDs;

    public AdminCreateOrUpdateEventDTO() {
    }

    public Set<String> getNewCauses() {
        return newCauses;
    }

    public void setNewCauses(Set<String> newCauses) {
        this.newCauses = newCauses;
    }

    public Set<Long> getExistingCauseIDs() {
        return existingCauseIDs;
    }

    public void setExistingCauseIDs(Set<Long> existingCauseIDs) {
        this.existingCauseIDs = existingCauseIDs;
    }
}

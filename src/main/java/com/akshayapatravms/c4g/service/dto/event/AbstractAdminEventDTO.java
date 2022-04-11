package com.akshayapatravms.c4g.service.dto.event;

import com.akshayapatravms.c4g.domain.CorporateSubgroup;
import com.akshayapatravms.c4g.domain.Event;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class AbstractAdminEventDTO extends AbstractEventDTO {

    private Set<String> emailFilters;
    private String emailBody;

    public AbstractAdminEventDTO() {
    }

    public AbstractAdminEventDTO(Event event) {
        super(event);

        final Set<CorporateSubgroup> corporateSubgroups = event.getCorporateSubgroups();
        if (corporateSubgroups != null && corporateSubgroups.size() > 0) {
            this.emailFilters = event.getCorporateSubgroups().stream()
                .map(CorporateSubgroup::getSubgroupEmailPatterns)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
        }

        this.emailBody = event.getEmailBody();

    }

    public Set<String> getEmailFilters() {
        return emailFilters;
    }

    public void setEmailFilters(Set<String> emailFilters) {
        this.emailFilters = emailFilters;
    }

    public String getEmailBody() {
        return emailBody;
    }

    public void setEmailBody(String emailBody) {
        this.emailBody = emailBody;
    }
}

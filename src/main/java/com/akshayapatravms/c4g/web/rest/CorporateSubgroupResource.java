package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.service.CorporateSubgroupService;
import com.akshayapatravms.c4g.service.dto.CorporateSubgroupDTO;
import java.net.URISyntaxException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/corporateSubgroup")
public class CorporateSubgroupResource {

    private static class CoprorateSubgroupResourceException extends RuntimeException {

        private CoprorateSubgroupResourceException(String message) {
            super(message);
        }
    }

    private final Logger log = LoggerFactory.getLogger(CorporateSubgroupResource.class);

    private final CorporateSubgroupRepository corporateSubgroupRepository;

    private final CorporateSubgroupService corporateSubgroupService;

    public CorporateSubgroupResource(
        CorporateSubgroupRepository corporateSubgroupRepository,
        CorporateSubgroupService corporateSubgroupService
    ) {
        this.corporateSubgroupRepository = corporateSubgroupRepository;
        this.corporateSubgroupService = corporateSubgroupService;
    }

    @PostMapping("/createCorporateSubgroup")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public CorporateSubgroupDTO createEvent(@RequestBody CorporateSubgroupDTO corporateSubgroupDTO) throws URISyntaxException {
        return corporateSubgroupService.createSubgroup(corporateSubgroupDTO);
    }
}

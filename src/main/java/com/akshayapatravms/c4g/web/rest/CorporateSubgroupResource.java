package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.service.CorporateSubgroupService;
import com.akshayapatravms.c4g.service.dto.CorporateSubgroupDTO;
import java.net.URISyntaxException;

import com.akshayapatravms.c4g.service.dto.CorproateSubGroupEmailDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/corporateSubgroups")
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

    @PostMapping("/")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public CorporateSubgroupDTO createEvent(@RequestBody CorporateSubgroupDTO corporateSubgroupDTO) throws URISyntaxException {
        return corporateSubgroupService.createSubgroup(corporateSubgroupDTO);
    }

    @GetMapping("/")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity getAllCorpSubgroups(){
        try {
            return ResponseEntity.ok().body(corporateSubgroupService.getAllCorpSubgroups());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PutMapping("/emails")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity addEmail( @RequestBody CorproateSubGroupEmailDTO corproateSubGroupEmailDTO){
        try {
            corporateSubgroupService.addEmailPatternsToCorpSubgroup(
                corproateSubGroupEmailDTO.getCorporateSubgroupID(),
                corproateSubGroupEmailDTO.getEmailPatterns()
            );
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("/emails")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity removeEmail( @RequestBody CorproateSubGroupEmailDTO corproateSubGroupEmailDTO){
        try {
            corporateSubgroupService.removeEmailPatternsToCorpSubgroup(
                corproateSubGroupEmailDTO.getCorporateSubgroupID(),
                corproateSubGroupEmailDTO.getEmailPatterns()
            );
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}

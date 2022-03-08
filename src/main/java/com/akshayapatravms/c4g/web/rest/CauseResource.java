package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.security.AuthoritiesConstants;
import com.akshayapatravms.c4g.service.CauseService;
import com.akshayapatravms.c4g.service.dto.CauseDTO;
import java.net.URISyntaxException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/causes")
public class CauseResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final CauseService causeService;

    public CauseResource(CauseService causeService) {
        this.causeService = causeService;
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public List<CauseDTO> getCauses() throws URISyntaxException {
        return causeService.getCauses();
    }
}

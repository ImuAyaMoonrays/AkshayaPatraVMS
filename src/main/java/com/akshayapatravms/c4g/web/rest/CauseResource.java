package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.service.CauseService;
import com.akshayapatravms.c4g.service.dto.CauseDTO;
import java.net.URISyntaxException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/causes")
public class CauseResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final CauseService causeService;

    public CauseResource(CauseService causeService) {
        this.causeService = causeService;
    }

    @GetMapping("/getAll")
    public List<CauseDTO> getCauses() throws URISyntaxException {
        return causeService.getCauses();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteCause(@PathVariable Long id) {
        try {
            log.debug("REST request to delete Cause: {}", id);
            causeService.deleteCause(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}

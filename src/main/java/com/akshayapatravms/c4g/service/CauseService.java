package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.*;
import com.akshayapatravms.c4g.repository.CauseRepository;
import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.repository.EventRepository;
import com.akshayapatravms.c4g.service.dto.CauseDTO;
import com.akshayapatravms.c4g.service.dto.EventDTO;
import com.akshayapatravms.c4g.service.dto.LocationDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CauseService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final CauseRepository causeRepository;

    private final UserService userService;

    private final CacheManager cacheManager;

    public CauseService(CacheManager cacheManager, UserService userService, CauseRepository causeRepository) {
        this.cacheManager = cacheManager;
        this.userService = userService;
        this.causeRepository = causeRepository;
    }

    public List<CauseDTO> getCauses() {
        Iterable<Cause> causes = causeRepository.findAllByOrderByCauseName();
        List<CauseDTO> causeList = new ArrayList<>();
        for (Cause cause : causes) {
            causeList.add(new CauseDTO(cause));
        }
        return causeList;
    }
    //add cause
    //delete cause
    //get all causes
    //check if cause exists

}

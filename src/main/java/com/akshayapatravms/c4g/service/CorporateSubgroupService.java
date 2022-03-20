package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.*;
import com.akshayapatravms.c4g.repository.CorporateSubgroupRepository;
import com.akshayapatravms.c4g.service.dto.CorporateSubgroupDTO;
import com.akshayapatravms.c4g.service.mapper.CorporateSubgroupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CorporateSubgroupService {

    private final Logger log = LoggerFactory.getLogger(CorporateSubgroupService.class);

    private final CorporateSubgroupRepository corporateSubgroupRepository;

    private final CorporateSubgroupMapper corporateSubgroupMapper;

    public CorporateSubgroupService(
        CorporateSubgroupRepository corporateSubgroupRepository,
        CorporateSubgroupMapper corporateSubgroupMapper
    ) {
        this.corporateSubgroupRepository = corporateSubgroupRepository;
        this.corporateSubgroupMapper = corporateSubgroupMapper;
    }

    public CorporateSubgroupDTO createSubgroup(CorporateSubgroupDTO corporateSubgroupDTO) {
        if (corporateSubgroupRepository.findOneBySubgroupName(corporateSubgroupDTO.getSubgroupName().toUpperCase()).isPresent()) {
            throw new RuntimeException("Corporate subgroup by this name already exists");
        } else {
            CorporateSubgroup corporateSubgroup = new CorporateSubgroup();
            corporateSubgroup.setSubgroupEmailPatterns(corporateSubgroupDTO.getSubgroupEmailPatterns());
            corporateSubgroup.setSubgroupName(corporateSubgroupDTO.getSubgroupName().toUpperCase());
            return this.corporateSubgroupMapper.corporateSubgroupDTOFromCorporateSubgroup(
                    this.corporateSubgroupRepository.save(corporateSubgroup)
                );
        }
    }

    public List<CorporateSubgroup> getAllCorpSubgroups() throws RuntimeException{
        try {
            return corporateSubgroupRepository.findAll();
        } catch (Exception e ){
            throw new RuntimeException("unable to get corp subgroups");
        }
    }

    private ArrayList<String> sanitizeEmails(List<String> originalEmails){
        //remove any leading/trailing white space. Still could be white space in the middle.
        ArrayList<String> emails = new ArrayList<>();
        for (String email : originalEmails){
            String newemail = email.strip();
            if (newemail.length() > 0){
                emails.add(newemail);
            }
        }

        return emails;
    }

    //add any validation? Require it to start with @? Pattern will always be domain.end of email, correct?
    //if an email fails sanitation (currently just a blank string does this). it will not be added and the front end won't know
    public void addEmailPatternsToCorpSubgroup(Long corpID, List<String> emailPatterns) throws RuntimeException{
        try{
            Optional<CorporateSubgroup>  corp = corporateSubgroupRepository.findOneById(corpID);
            if (!corp.isPresent()){
                throw new RuntimeException("unable to find corp group");
            }
            List<String> sanitizedEmails = sanitizeEmails(emailPatterns);
            corp.get().getSubgroupEmailPatterns().addAll(sanitizedEmails);
            corporateSubgroupRepository.save(corp.get());
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public void removeEmailPatternsToCorpSubgroup(Long corpID, List<String> emailPatterns) throws RuntimeException{
        try{
            Optional<CorporateSubgroup>  corp = corporateSubgroupRepository.findOneById(corpID);
            if (!corp.isPresent()){
                throw new RuntimeException("unable to find corp group");
            }
            corp.get().getSubgroupEmailPatterns().removeAll(emailPatterns);
            corporateSubgroupRepository.save(corp.get());
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }




}

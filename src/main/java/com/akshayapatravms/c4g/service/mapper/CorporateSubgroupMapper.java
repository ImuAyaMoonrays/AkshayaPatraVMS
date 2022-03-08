package com.akshayapatravms.c4g.service.mapper;

import com.akshayapatravms.c4g.domain.CorporateSubgroup;
import com.akshayapatravms.c4g.service.dto.CorporateSubgroupDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CorporateSubgroupMapper {
    CorporateSubgroupDTO corporateSubgroupDTOFromCorporateSubgroup(CorporateSubgroup corporateSubgroup);
}

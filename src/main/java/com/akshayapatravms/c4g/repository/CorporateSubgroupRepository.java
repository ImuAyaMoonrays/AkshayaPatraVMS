package com.akshayapatravms.c4g.repository;

import com.akshayapatravms.c4g.domain.CorporateSubgroup;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorporateSubgroupRepository extends JpaRepository<CorporateSubgroup, Long> {
    Optional<CorporateSubgroup> findOneBySubgroupName(String subgroupName);

    Optional<CorporateSubgroup> findOneById(Long id);

    List<CorporateSubgroup> findAll();
}

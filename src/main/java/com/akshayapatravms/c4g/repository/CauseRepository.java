package com.akshayapatravms.c4g.repository;

import com.akshayapatravms.c4g.domain.Cause;
import com.akshayapatravms.c4g.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CauseRepository extends JpaRepository<Cause, Long> {
    Optional<Cause> findOneByCauseName(String causeName);

    Optional<Cause> findOneById(Long causeId);

    Iterable<Cause> findAllByOrderByCauseName();
}

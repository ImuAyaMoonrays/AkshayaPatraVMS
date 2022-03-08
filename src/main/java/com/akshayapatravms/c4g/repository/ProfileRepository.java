package com.akshayapatravms.c4g.repository;

import com.akshayapatravms.c4g.domain.Cause;
import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.akshayapatravms.c4g.domain.Profile;


@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> getProfileById(Long profileID);
}

package com.akshayapatravms.c4g.repository;

import com.akshayapatravms.c4g.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> getEventById(long eventID);

}

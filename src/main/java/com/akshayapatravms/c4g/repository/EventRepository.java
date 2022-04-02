package com.akshayapatravms.c4g.repository;

import com.akshayapatravms.c4g.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findOneById(long id);

    @Query("SELECT e FROM Event e JOIN e.volunteers v")
    public List<Event> findAllByAndVolunteers();

    @Query(value = "SELECT e FROM Event e left JOIN FETCH e.volunteers v")
    List<Event> findAllEventsAndVolunteers();

    @Query(value = "Select e from Event e left JOIN FETCH e.volunteers v " +
        "left JOIN FETCH e.physicalLocation p " +
        "left JOIN FETCH e.virtualLocation vl " +
        "left JOIN FETCH e.causes c " +
        "left JOIN FETCH e.corporateSubgroups csg" )
    List<Event> findAllEventInfo();


}

package com.akshayapatravms.c4g.repository;

import com.akshayapatravms.c4g.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findOneById(long id);

    @Query("SELECT e FROM Event e JOIN e.volunteers v")
    public List<Event> findAllByAndVolunteers();

    @Query(value = "SELECT e " +
        "FROM Event e left JOIN FETCH e.volunteers v " +
        "WHERE e.startDate >= :startDate " +
        "AND e.startDate <= :endDate ")
    List<Event> findAllEventsAndVolunteers(
        @Param("startDate") Instant startDate,
        @Param("endDate") Instant endDate);

    @Query(value = "Select e from Event e left JOIN FETCH e.volunteers v " +
        "left JOIN FETCH e.physicalLocation p " +
        "left JOIN FETCH e.virtualLocation vl " +
        "left JOIN FETCH e.causes c " +
        "left JOIN FETCH e.corporateSubgroups csg ")
    List<Event> findAllEventInfo();

    @Query(value = "Select e from Event e left JOIN FETCH e.volunteers v " +
        "left JOIN FETCH e.physicalLocation p " +
        "left JOIN FETCH e.virtualLocation vl " +
        "left JOIN FETCH e.causes c " +
        "left JOIN FETCH e.corporateSubgroups csg " +
        "WHERE e.startDate >= :startDate " +
        "AND e.startDate <= :endDate ")
    List<Event> findAllEventInfoWithDateFilter(
        @Param("startDate") Instant startDate,
        @Param("endDate") Instant endDate);

    @Query(value = "Select e from Event e left JOIN FETCH e.volunteers v " +
        "left JOIN FETCH e.physicalLocation p " +
        "left JOIN FETCH e.virtualLocation vl " +
        "left JOIN FETCH e.causes c " +
        "left JOIN FETCH e.corporateSubgroups csg " +
        "WHERE e.id = :eventID " +
        "AND e.startDate >= :startDate " +
        "AND e.startDate <= :endDate ")
    Optional<Event> findAllEventInfoForEvent(@Param("eventID") Long eventID);


}

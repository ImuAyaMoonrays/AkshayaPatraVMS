package com.akshayapatravms.c4g.repository;

import com.akshayapatravms.c4g.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
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

    @Query(value = "SELECT * FROM Event e WHERE e.end_date < CURRENT_TIMESTAMP", nativeQuery = true)
    List<Event> findAllPastEvents();

    @Query(value = "SELECT * FROM Event e WHERE e.end_date > CURRENT_TIMESTAMP", nativeQuery = true)
    List<Event> findAllFutureEvents();

    @Query(value = "SELECT * " +
        "FROM Event e " +
        "LEFT JOIN USER_EVENT ue ON e.id = ue.event_id " +
        "WHERE ue.user_id =:userId and e.end_date > CURRENT_TIMESTAMP", nativeQuery = true)
    List<Event> allRegisteredEventsForUser(@Param("userId") long userId);

    @Query(value = "SELECT DISTINCT e.* " +
        "FROM EVENT e " +
        "LEFT JOIN JHI_USER u ON u.id = :userId " +
        "LEFT JOIN USER_EVENT ue ON e.id = ue.event_id " +
        "LEFT JOIN EVENT_CORPORATE_SUBGROUP ecs ON ecs.event_id = e.id " +
        "LEFT JOIN CORPORATE_SUBGROUP cs ON ecs.corporate_subgroup_id = cs.id " +
        "LEFT JOIN SUBGROUP_EMAIL_PATTERN sep ON sep.corporate_subgroup_id = cs.id " +
        "WHERE ue.user_id IS DISTINCT FROM :userId " +
        "and e.end_date > CURRENT_TIMESTAMP " +
        "and (u.email LIKE '%' || sep.subgroup_email_patterns || '%' OR sep.subgroup_email_patterns IS NULL)",
        nativeQuery = true)
    List<Event> allRegisterableEventsForUser(@Param("userId") long userId);

    @Query(value = "SELECT * " +
        "FROM Event e " +
        "LEFT JOIN USER_EVENT ue ON e.id = ue.event_id " +
        "WHERE ue.user_id =:userId and e.end_date < CURRENT_TIMESTAMP", nativeQuery = true)
    List<Event> allCompletedEventsForUser(@Param("userId") long userId);

    @Modifying
    @Query(value = "DELETE FROM Event e WHERE e.id =:eventId", nativeQuery = true)
    void deleteEventByCreator(@Param("eventId") long eventId);

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

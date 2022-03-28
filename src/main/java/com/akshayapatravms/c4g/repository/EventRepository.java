package com.akshayapatravms.c4g.repository;

import com.akshayapatravms.c4g.domain.Event;
import liquibase.pro.packaged.Q;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query(value = "SELECT * FROM Event e WHERE e.end_date < CURRENT_TIMESTAMP")
    List<Event> findAllPastEvents();

    @Query(value = "SELECT * FROM Event e WHERE e.end_date > CURRENT_TIMESTAMP")
    List<Event> findAllFutureEvents();

    @Query(value = "SELECT * FROM EVENT e LEFT JOIN USER_EVENT ue ON e.id = ue.event_id WHERE ue.user_id =:userId and e.end_date > CURRENT_TIMESTAMP")
    List<Event> findAllFutureEventsForUser(@Param("userId")long userId);

    @Query(value = "SELECT * FROM EVENT e LEFT JOIN USER_EVENT ue ON e.id = ue.event_id WHERE ue.user_id =:userId and e.end_date < CURRENT_TIMESTAMP")
    List<Event> findAllCompletedEventsForUser(@Param("userId")long userId);

    @Query(value = "DELETE FROM EVENT e WHERE e.id =:eventId and e.event_creator_id =:userId")
    void deleteEventByCreator(@Param("eventId") long eventId, @Param("userId")long userId);
}

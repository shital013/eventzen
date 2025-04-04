package com.eventzen.eventzen_backend.repository;

import com.eventzen.eventzen_backend.model.Event;
import com.eventzen.eventzen_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCreatedBy(User user);
    List<Event> findByStatus(Event.EventStatus status);
    List<Event> findByVenueId(Long venueId);

    @Query("SELECT COUNT(e) > 0 FROM Event e WHERE " +
            "e.venue.id = :venueId AND " +
            "e.id != :excludeEventId AND " +
            "((e.startDate <= :end AND e.endDate >= :start))")
    boolean existsConflictingEvents(
            @Param("venueId") Long venueId,
            @Param("start") Date start,
            @Param("end") Date end,
            @Param("excludeEventId") Long excludeEventId
    );
}
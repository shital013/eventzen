package com.eventzen.eventzen_backend.repository;

import com.eventzen.eventzen_backend.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByLocationContainingIgnoreCase(String location);
    List<Venue> findByCapacityGreaterThanEqual(int capacity);
}

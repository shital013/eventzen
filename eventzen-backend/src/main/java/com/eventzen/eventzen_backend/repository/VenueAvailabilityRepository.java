package com.eventzen.eventzen_backend.repository;

import com.eventzen.eventzen_backend.model.Venue;
import com.eventzen.eventzen_backend.model.VenueAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VenueAvailabilityRepository extends JpaRepository<VenueAvailability, Long> {
    List<VenueAvailability> findByVenueAndDateBetween(Venue venue, LocalDate startDate, LocalDate endDate);
    boolean existsByVenueAndDateAndIsAvailable(Venue venue, LocalDate date, boolean isAvailable);
}
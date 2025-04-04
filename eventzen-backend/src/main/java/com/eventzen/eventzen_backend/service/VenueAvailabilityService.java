package com.eventzen.eventzen_backend.service;

import com.eventzen.eventzen_backend.exception.ResourceNotFoundException;
import com.eventzen.eventzen_backend.model.Venue;
import com.eventzen.eventzen_backend.model.VenueAvailability;
import com.eventzen.eventzen_backend.repository.VenueAvailabilityRepository;
import com.eventzen.eventzen_backend.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VenueAvailabilityService {

    private final VenueAvailabilityRepository availabilityRepository;
    private final VenueRepository venueRepository;

    @Autowired
    public VenueAvailabilityService(VenueAvailabilityRepository availabilityRepository, VenueRepository venueRepository) {
        this.availabilityRepository = availabilityRepository;
        this.venueRepository = venueRepository;
    }

    public VenueAvailability createAvailability(Long venueId, LocalDate date, boolean isAvailable) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));

        VenueAvailability availability = new VenueAvailability();
        availability.setVenue(venue);
        availability.setDate(date);
        availability.setAvailable(isAvailable);

        return availabilityRepository.save(availability);
    }

    public List<VenueAvailability> checkAvailability(Long venueId, LocalDate startDate, LocalDate endDate) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));

        return availabilityRepository.findByVenueAndDateBetween(venue, startDate, endDate);
    }

    public boolean isVenueAvailable(Long venueId, LocalDate date) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));

        return !availabilityRepository.existsByVenueAndDateAndIsAvailable(venue, date, false);
    }
}
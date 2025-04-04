package com.eventzen.eventzen_backend.controller;

import com.eventzen.eventzen_backend.model.VenueAvailability;
import com.eventzen.eventzen_backend.service.VenueAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/venue-availability")
public class VenueAvailabilityController {

    private final VenueAvailabilityService availabilityService;

    @Autowired
    public VenueAvailabilityController(VenueAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VenueAvailability> createAvailability(
            @RequestParam Long venueId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam boolean isAvailable) {
        return ResponseEntity.ok(availabilityService.createAvailability(venueId, date, isAvailable));
    }

    @GetMapping("/check")
    public ResponseEntity<List<VenueAvailability>> checkAvailability(
            @RequestParam Long venueId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(availabilityService.checkAvailability(venueId, startDate, endDate));
    }

    @GetMapping("/is-available")
    public ResponseEntity<Boolean> isVenueAvailable(
            @RequestParam Long venueId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(availabilityService.isVenueAvailable(venueId, date));
    }
}
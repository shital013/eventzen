package com.eventzen.eventzen_backend.controller;

import com.eventzen.eventzen_backend.dto.VenueDTO;
import com.eventzen.eventzen_backend.model.Venue;
import com.eventzen.eventzen_backend.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    private final VenueService venueService;

    @Autowired
    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Venue> createVenue(@RequestBody VenueDTO venueDTO) {
        return ResponseEntity.ok(venueService.createVenue(venueDTO));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Venue> updateVenue(@PathVariable Long id, @RequestBody VenueDTO venueDTO) {
        return ResponseEntity.ok(venueService.updateVenue(id, venueDTO));
    }

    @GetMapping
    public ResponseEntity<List<Venue>> getAllVenues() {
        return ResponseEntity.ok(venueService.getAllVenues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        return ResponseEntity.ok(venueService.getVenueById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVenue(@PathVariable Long id) {
        venueService.deleteVenue(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Venue>> getVenuesByLocation(@PathVariable String location) {
        return ResponseEntity.ok(venueService.getVenuesByLocation(location));
    }

    @GetMapping("/capacity/{capacity}")
    public ResponseEntity<List<Venue>> getVenuesByCapacity(@PathVariable int capacity) {
        return ResponseEntity.ok(venueService.getVenuesByCapacity(capacity));
    }
}
package com.eventzen.eventzen_backend.service;

import com.eventzen.eventzen_backend.dto.VenueDTO;
import com.eventzen.eventzen_backend.exception.ResourceNotFoundException;
import com.eventzen.eventzen_backend.model.Venue;
import com.eventzen.eventzen_backend.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {

    private final VenueRepository venueRepository;

    @Autowired
    public VenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    public Venue createVenue(VenueDTO venueDTO) {
        Venue venue = new Venue();
        mapDTOToVenue(venueDTO, venue);
        return venueRepository.save(venue);
    }

    public Venue updateVenue(Long id, VenueDTO venueDTO) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
        mapDTOToVenue(venueDTO, venue);
        return venueRepository.save(venue);
    }

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue getVenueById(Long id) {
        return venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
    }

    public void deleteVenue(Long id) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
        venueRepository.delete(venue);
    }

    public List<Venue> getVenuesByLocation(String location) {
        return venueRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Venue> getVenuesByCapacity(int capacity) {
        return venueRepository.findByCapacityGreaterThanEqual(capacity);
    }

    private void mapDTOToVenue(VenueDTO venueDTO, Venue venue) {
        venue.setName(venueDTO.getName());
        venue.setDescription(venueDTO.getDescription());
        venue.setCapacity(venueDTO.getCapacity());
        venue.setAmenities(venueDTO.getAmenities());
        venue.setLocation(venueDTO.getLocation());
    }
}
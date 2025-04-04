package com.eventzen.eventzen_backend.service;

import com.eventzen.eventzen_backend.dto.EventDTO;
import com.eventzen.eventzen_backend.exception.ConflictException;
import com.eventzen.eventzen_backend.exception.ResourceNotFoundException;
import com.eventzen.eventzen_backend.model.Event;
import com.eventzen.eventzen_backend.model.User;
import com.eventzen.eventzen_backend.model.Venue;
import com.eventzen.eventzen_backend.repository.EventRepository;
import com.eventzen.eventzen_backend.repository.UserRepository;
import com.eventzen.eventzen_backend.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final VenueRepository venueRepository;
    private final UserRepository userRepository;

    @Autowired
    public EventService(EventRepository eventRepository,
                        VenueRepository venueRepository,
                        UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.venueRepository = venueRepository;
        this.userRepository = userRepository;
    }

    public Event createEvent(EventDTO eventDTO) {
        validateEventTimes(eventDTO.getStartDate(), eventDTO.getEndDate());

        if (hasConflict(eventDTO.getVenueId(),
                eventDTO.getStartDate(),
                eventDTO.getEndDate(),
                null)) {
            throw new ConflictException("Another event already exists at this venue during the requested time");
        }

        Event event = new Event();
        mapDTOToEvent(eventDTO, event);
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, EventDTO eventDTO) {
        validateEventTimes(eventDTO.getStartDate(), eventDTO.getEndDate());

        if (hasConflict(eventDTO.getVenueId(),
                eventDTO.getStartDate(),
                eventDTO.getEndDate(),
                id)) {
            throw new ConflictException("Another event already exists at this venue during the requested time");
        }

        Event event = getEventById(id);
        mapDTOToEvent(eventDTO, event);
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    public void deleteEvent(Long id) {
        Event event = getEventById(id);
        eventRepository.delete(event);
    }

    public List<Event> getEventsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return eventRepository.findByCreatedBy(user);
    }

    public List<Event> getEventsByStatus(String status) {
        return eventRepository.findByStatus(Event.EventStatus.valueOf(status.toUpperCase()));
    }

    public List<Event> getEventsByVenue(Long venueId) {
        return eventRepository.findByVenueId(venueId);
    }

    private void validateEventTimes(LocalDateTime start, LocalDateTime end) {
        if (start.isAfter(end)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Event start time must be before end time"
            );
        }

        if (start.isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Event cannot be scheduled in the past"
            );
        }
    }

    private boolean hasConflict(Long venueId, LocalDateTime start, LocalDateTime end, Long excludeEventId) {
        Date startDate = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(end.atZone(ZoneId.systemDefault()).toInstant());

        return eventRepository.existsConflictingEvents(
                venueId,
                startDate,
                endDate,
                excludeEventId != null ? excludeEventId : -1L
        );
    }

    private void mapDTOToEvent(EventDTO eventDTO, Event event) {
        event.setName(eventDTO.getName());
        event.setDescription(eventDTO.getDescription());
        event.setStartDate(Date.from(eventDTO.getStartDate().atZone(ZoneId.systemDefault()).toInstant()));
        event.setEndDate(Date.from(eventDTO.getEndDate().atZone(ZoneId.systemDefault()).toInstant()));
        event.setStatus(Event.EventStatus.valueOf(eventDTO.getStatus().toUpperCase()));
        event.setCategory(eventDTO.getCategory());

        if (eventDTO.getVenueId() != null) {
            Venue venue = venueRepository.findById(eventDTO.getVenueId())
                    .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + eventDTO.getVenueId()));
            event.setVenue(venue);
        }

        User user = userRepository.findById(eventDTO.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + eventDTO.getCreatedBy()));
        event.setCreatedBy(user);
    }
}
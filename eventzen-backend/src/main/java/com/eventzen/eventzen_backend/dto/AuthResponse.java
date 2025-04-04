package com.eventzen.eventzen_backend.dto;

public record AuthResponse(
        String token,
        String username,
        String role
) {}
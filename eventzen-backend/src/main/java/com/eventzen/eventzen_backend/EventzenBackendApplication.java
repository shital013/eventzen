package com.eventzen.eventzen_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.eventzen.eventzen_backend.model"})
@EnableJpaRepositories(basePackages = {"com.eventzen.eventzen_backend.repository"})
@ComponentScan(basePackages = {"com.eventzen.eventzen_backend"})
public class EventzenBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventzenBackendApplication.class, args);
	}
}
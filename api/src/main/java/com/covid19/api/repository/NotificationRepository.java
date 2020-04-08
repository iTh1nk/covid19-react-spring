package com.covid19.api.repository;

import com.covid19.api.model.Notification;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
  
}
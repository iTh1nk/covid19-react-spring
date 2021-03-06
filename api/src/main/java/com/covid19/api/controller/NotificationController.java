package com.covid19.api.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import javax.validation.Valid;

import com.covid19.api.model.Notification;
import com.covid19.api.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class NotificationController {
  @Autowired
  private NotificationRepository notificationRepository;

  @GetMapping(value = "/toaster")
  Collection<Notification> getNotification() {
    return notificationRepository.findAll();
  }

  @PostMapping(value = "/toaster")
  ResponseEntity<Notification> createNotification(@Valid @RequestBody Notification notification)
      throws URISyntaxException {
    Notification result = notificationRepository.save(notification);
    return ResponseEntity.created(new URI("/api/toaster" + result.getId())).body(result);
  }

  @PutMapping("/toaster/put/{id}")
  ResponseEntity<Notification> updateNotification(@Valid @RequestBody Notification notification) {
    Notification result = notificationRepository.save(notification);
    return ResponseEntity.ok().body(result);
  }

  @DeleteMapping("/toaster/{id}")
  ResponseEntity<?> deleteNotification(@PathVariable Long id) {
    notificationRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

}
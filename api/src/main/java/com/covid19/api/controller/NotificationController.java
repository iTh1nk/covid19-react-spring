package com.covid19.api.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import com.covid19.api.model.Notification;
import com.covid19.api.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

  @GetMapping(value = "/test")
  public @ResponseBody List<Notification> getCompanies() {

    List<Notification> notifications = new ArrayList<Notification>();
    notifications.add(new Notification(3, "Andrew Strauss"));
    notifications.add(new Notification(12, "John Greece"));
    notifications.add(new Notification(101, "Robert Parera"));
    notifications.add(new Notification(153, "Charlotte O' Neil"));
    notifications.add(new Notification(239, "Eddy Knight"));

    return notifications;
  }

  @PostMapping(value = "/test")
  ResponseEntity<Notification> createExpense(@Valid @RequestBody Notification expense) throws URISyntaxException {
    Notification result = notificationRepository.save(expense);
    return ResponseEntity.created(new URI("/api/test" + result.getId())).body(result);
  }

}
package com.covid19.api.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import javax.validation.Valid;

import com.covid19.api.model.OC;
import com.covid19.api.repository.OCRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data/oc")
public class OCController {

  @Autowired
  private OCRepository ocRepository;

  @GetMapping("/list")
  Collection<OC> getOCData() {
    return ocRepository.findAll();
  }

  @PostMapping("/add")
  ResponseEntity<OC> createOCData(@Valid @RequestBody OC oc) throws URISyntaxException {
    OC result = ocRepository.save(oc);
    return ResponseEntity.created(new URI("/api/data/oc/add" + result.getId())).body(result);
  }

  @DeleteMapping("/del/{id}")
  ResponseEntity<?> deleteOCData(@PathVariable Long id) {
    ocRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/update/{id}")
  ResponseEntity<OC> updateOCData(@Valid @RequestBody OC oc) {
    OC result = ocRepository.save(oc);
    return ResponseEntity.ok().body(result);
  }

}
package com.covid19.api.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import javax.validation.Valid;

import com.covid19.api.model.Irvine;
import com.covid19.api.repository.IrvineRepository;

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
@RequestMapping("/api/data/irvine")
public class IrvineController {

  @Autowired
  private IrvineRepository irvineRepository;

  @GetMapping("/list")
  Collection<Irvine> getIrvineData() {
    return irvineRepository.findAll();
  }

  @PostMapping("/add")
  ResponseEntity<Irvine> createIrvineData(@Valid @RequestBody Irvine irvine) throws URISyntaxException {
    Irvine result = irvineRepository.save(irvine);
    return ResponseEntity.created(new URI("/api/data/irvine/add" + result.getId())).body(result);
  }

  @DeleteMapping("/del/{id}")
  ResponseEntity<?> deleteIrvineData(@PathVariable Long id) {
    irvineRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/update/{id}")
  ResponseEntity<Irvine> updateIrvineDate(@Valid @RequestBody Irvine irvine) {
    Irvine result = irvineRepository.save(irvine);
    return ResponseEntity.ok().body(result);
  }

}
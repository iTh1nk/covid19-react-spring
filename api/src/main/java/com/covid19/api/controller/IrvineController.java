package com.covid19.api.controller;

import java.util.Collection;

import com.covid19.api.model.Irvine;
import com.covid19.api.repository.IrvineRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

  

}
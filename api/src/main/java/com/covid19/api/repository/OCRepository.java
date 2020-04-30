package com.covid19.api.repository;

import com.covid19.api.model.OC;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OCRepository extends JpaRepository<OC, Long> {

}
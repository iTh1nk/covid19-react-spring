package com.covid19.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "oc")
public class OC {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String date;

  private Integer confirmed;

  private Integer newcase;

  private Integer deaths;

  private Integer icu;

  private Integer hospitalized;

  private Integer tests;

  private Integer anaheim;

  private Integer santaana;

  private Integer huntingtonbeach;

  private Integer tustin;

}
package com.covid19.api.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import javax.validation.Valid;

import com.covid19.api.model.AdminUser;
import com.covid19.api.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/user")
public class UserController {

  private UserRepository userRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  public UserController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @GetMapping("/list")
  Collection<AdminUser> getAdminUser() {
    return userRepository.findAll();
  }

  @PostMapping("/signup")
  ResponseEntity<AdminUser> signUp(@Valid @RequestBody AdminUser adminUser) throws URISyntaxException {
    adminUser.setPassword(bCryptPasswordEncoder.encode(adminUser.getPassword()));
    AdminUser result = userRepository.save(adminUser);
    return ResponseEntity.created(new URI("/api/user/signup" + result.getId())).body(result);
  }

  @DeleteMapping("/del/{id}")
  ResponseEntity<?> deleteAdminUser(@PathVariable long id) {
    userRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping(value="/isAuth")
  public String getIsAuth() {
      return "isAuth";
  }
  

}
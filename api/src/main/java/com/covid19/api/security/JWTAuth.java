package com.covid19.api.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.covid19.api.model.AdminUser;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JWTAuth extends UsernamePasswordAuthenticationFilter {
  
  private AuthenticationManager authenticationManager;

  public JWTAuth(AuthenticationManager authenticationManager) {
    System.out.println("  #########################  Auth  #########################  ");
    this.authenticationManager = authenticationManager;
  }
  
  @Override
  public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
    System.out.println("  #########################  Auth 1  #########################  ");
    try {
      AdminUser creds = new ObjectMapper().readValue(req.getInputStream(), AdminUser.class);
      System.out.println("  #########################  DEBUG  #########################  \n" + creds);
      return authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword(), new ArrayList<>()));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth)
      throws IOException, ServletException {
    String token = JWT.create().withSubject(((User) auth.getPrincipal()).getUsername())
        .withExpiresAt(new Date(System.currentTimeMillis() + 60_000)).sign(HMAC512("MacMaster".getBytes()));
    res.addHeader("Authorization", "Bearer " + token);
    System.out.println("  #########################  Auth 2  #########################  \n" + token);
  }
}
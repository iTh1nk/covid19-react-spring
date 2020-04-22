package com.covid19.api.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTAuthorization extends BasicAuthenticationFilter {

  public JWTAuthorization(AuthenticationManager authenticationManager) {
    super(authenticationManager);
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws IOException, ServletException {
    System.out.println("  $$$$$$$$$$$$$$$$$$$$$$$$$  Authorization 1  $$$$$$$$$$$$$$$$$$$$$$$$$  ");
    String header = req.getHeader("Authorization");

    if (header == null || !header.startsWith("Bearer")) {
      chain.doFilter(req, res);
      return;
    }
    HttpServletResponse response = (HttpServletResponse) res;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    response.setHeader("Access-Control-Max-Age", "3600");
    response.setHeader("Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Authorization, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers");

    UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    chain.doFilter(req, res);
  }

  private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
    System.out.println("  $$$$$$$$$$$$$$$$$$$$$$$$$  Authorization 2  $$$$$$$$$$$$$$$$$$$$$$$$$  ");
    String token = request.getHeader("Authorization");
    if (token != null) {
      System.out.println("  $$$$$$$$$$$$$$$$$$$$$$$$$  Authorization 2 - 1  $$$$$$$$$$$$$$$$$$$$$$$$$  \n"
          + token.replace("Bearer ", ""));
      String user = JWT.require(Algorithm.HMAC512("MacMaster".getBytes())).build().verify(token.replace("Bearer ", ""))
          .getSubject();

      System.out.println("  $$$$$$$$$$$$$$$$$$$$$$$$$  Authorization 2 - 1 - 1  $$$$$$$$$$$$$$$$$$$$$$$$$  \n" + user);

      if (user != null) {
        System.out.println("  $$$$$$$$$$$$$$$$$$$$$$$$$  Authorization 2 - 2  $$$$$$$$$$$$$$$$$$$$$$$$$  ");
        return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
      }
      return null;
    }
    System.out.println("  $$$$$$$$$$$$$$$$$$$$$$$$$  Authorization 3  $$$$$$$$$$$$$$$$$$$$$$$$$  ");
    return null;
  }
}
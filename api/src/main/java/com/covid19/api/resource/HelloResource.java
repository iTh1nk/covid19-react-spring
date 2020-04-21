// package com.covid19.api.resource;

// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RequestMapping("/api/hello")
// @RestController
// public class HelloResource {

//   @GetMapping("/all")
//   public String hello() {
//     return "Hello YouTube";
//   }
  
//   @PreAuthorize("hasAnyRole('ADMIN')")
//   @GetMapping("/sall")
//   public String securedHello() {
//     return "Secured Hello";
//   }
  
// }
package com.covid19.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

  private UserDetailsServiceImpl userDetailsService;
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  public WebSecurity(UserDetailsServiceImpl userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userDetailsService = userDetailsService;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    System.out.println(" *************************  WebSecurity 1  ************************* ");
    auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    System.out.println(" *************************  WebSecurity 2  ************************* ");
    http.cors().and().csrf().disable()
    
        // .authorizeRequests().antMatchers(HttpMethod.POST, "/api/user/signup").permitAll()

        // .antMatchers(HttpMethod.GET, "/api/toaster").permitAll()
        // .anyRequest().authenticated().and()

        // // .formLogin().permitAll().and()

        // .addFilter(new JWTAuth(authenticationManager()))
        // .addFilter(new JWTAuthorization(authenticationManager()))
        // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        

        ;
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    System.out.println(" *************************  WebSecurity 3  ************************* ");
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
    return source;
  }

}
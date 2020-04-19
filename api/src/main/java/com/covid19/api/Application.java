package com.covid19.api;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// @Configuration
	// static class ApplicationSecurity extends WebSecurityConfigurerAdapter {

	// @Bean
	// public BCryptPasswordEncoder bCryptPasswordEncoder() {
	// return new BCryptPasswordEncoder();
	// }

	// @Override
	// protected void configure(HttpSecurity httpSecurity) throws Exception {
	// httpSecurity.authorizeRequests().antMatchers("/**").permitAll();
	// }
	// }

	@EnableWebSecurity
	public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.cors().and().csrf().disable();
		}

		@Bean
		CorsConfigurationSource corsConfigurationSource() {
			CorsConfiguration configuration = new CorsConfiguration();
			configuration.setAllowedOrigins(Arrays.asList("*"));
			configuration.setAllowedMethods(Arrays.asList("*"));
			configuration.setAllowedHeaders(Arrays.asList("*"));
			configuration.setAllowCredentials(true);
			UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
			source.registerCorsConfiguration("/**", configuration);
			return source;
		}

		@Bean
		public BCryptPasswordEncoder bCryptPasswordEncoder() {
			return new BCryptPasswordEncoder();
		}

	}

}
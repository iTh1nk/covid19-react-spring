package com.covid19.api.security;

import com.covid19.api.model.AdminUser;
import com.covid19.api.repository.UserRepository;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private UserRepository userRepository;

  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
  
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    AdminUser adminUser = userRepository.findByUsername(username);
    if (adminUser == null) {
      throw new UsernameNotFoundException(username);
    }
    return new User(adminUser.getUsername(), adminUser.getPassword(), emptyList());
  }
}
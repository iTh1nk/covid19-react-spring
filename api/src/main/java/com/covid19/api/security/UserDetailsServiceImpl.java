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
    System.out.println("******************  Impl  ******************");
    AdminUser adminUser = userRepository.findByUsername(username);
    System.out.println("******************  Impl2  ******************\n" + adminUser);
    if (adminUser == null) {
      System.out.println("User Name Not Found!");
      throw new UsernameNotFoundException(username);
    }
    System.out.println("******************  Impl3  ******************");
    return new User(adminUser.getUsername(), adminUser.getPassword(), emptyList());
  }
}
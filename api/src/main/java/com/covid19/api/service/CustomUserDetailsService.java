// package com.covid19.api.service;

// import java.util.Optional;

// import com.covid19.api.model.CustomUserDetails;
// import com.covid19.api.model.Users;
// import com.covid19.api.repository.UsersRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//   @Autowired
//   private UsersRepository usersRepository;

//   @Override
//   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

//     Optional<Users> optionalUsers = usersRepository.findByName(username);

//     optionalUsers.orElseThrow(() -> new UsernameNotFoundException("Username Not Found."));

//     return optionalUsers.map(CustomUserDetails::new).get();
//   }

// }
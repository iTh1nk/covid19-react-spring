// package com.covid19.security;

// import java.io.IOException;
// import java.util.ArrayList;

// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import com.auth0.jwt.JWT;
// import com.auth0.jwt.algorithms.Algorithm;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

// public class JWTAuthorization extends BasicAuthenticationFilter {
//   public JWTAuthorization(AuthenticationManager authenticationManager) {
//     super(authenticationManager);
//   }

//   @Override
//   protected void internalFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
//       throws IOException, ServletException {
//     String header = req.getHeader("Authorization");

//     if (header == null || !header.startsWith("Bearer")) {
//       chain.doFilter(req, res);
//       return;
//     }

//     UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

//     SecurityContextHolder.getContext().setAuthentication(authentication);
//     chain.doFilter(req, res);
//   }

//   private UsernamePasswordAuthenticationToken getAuthentication (HttpServletRequest request) {
//     String token = request.getHeader("Authorization");
//     if (token != null) {
//       String user = JWT.require(Algorithm.HMAC512("MacMaster".getBytes())).build().verify(token.replace("Bearer", "")).getSubject();

//       if (user != null) {
//         return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
//       }
//       return null;
//     }
//     return null;
//   }
// }
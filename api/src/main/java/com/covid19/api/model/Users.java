// package com.covid19.api.model;

// import java.util.Set;

// import javax.persistence.CascadeType;
// import javax.persistence.Column;
// import javax.persistence.Entity;
// import javax.persistence.FetchType;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import javax.persistence.Id;
// import javax.persistence.JoinColumn;
// import javax.persistence.JoinTable;
// import javax.persistence.OneToMany;
// import javax.persistence.Table;

// import lombok.Data;

// @Entity
// @Data
// @Table(name = "user")
// public class Users {
//   @Id
//   @GeneratedValue(strategy = GenerationType.AUTO)
//   @Column(name = "user_id")
//   private int id;

//   @Column(name = "email")
//   private String email;

//   @Column(name = "password")
//   private String password;

//   @Column(name = "name")
//   private String name;

//   @Column(name = "last_name")
//   private String last_name;

//   @Column(name = "active")
//   private int active;

//   @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//   @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
//   private Set<Role> roles;

//   public Users() {
//   }

//   public Users(Users users) {
//     this.id = users.getId();
//     this.active = users.getActive();
//     this.email = users.getEmail();
//     this.roles = users.getRoles();
//     this.name = users.getName();
//     this.last_name = users.getLast_name();
//     this.password = users.getPassword();
//   }
// }
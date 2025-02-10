// package main.java.com.blog.blogapp.security;

// import main.java.com.blog.blogapp.model.User;
// import main.java.com.blog.blogapp.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("api/auth")

// public class AuthController {

//     @Autowired
//     private UserRepository userRepository;

//     @PostMapping("/register")
//     public ResponseEntity<String> register(@RequestBody User user) {
//         user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//         userRepository.save(user);

//         return ResponseEntity.ok("User registered successfully");
//     }

//     @PostMapping("/login")
//     public ResponseEntity<String> login(@RequestBody User user) {
//         User foundUser = userRepository.findByUsername(user.getUsername());
//         if (foundUser != null && new BCryptPasswordEncoder().matches(user.getPassword(), foundUser.getPassword())) {
//             return ResponseEntity.ok("Login successful");
//         }
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//     }
// }
package com.blog.blogapp.security;

import com.blog.blogapp.model.User;
import com.blog.blogapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // Create response with ID and username
        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("username", savedUser.getUsername());

        return ResponseEntity.ok(response);
    }

    // Login a user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());

        if (foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
            // Create response with ID and username
            Map<String, Object> response = new HashMap<>();
            response.put("id", foundUser.getId());
            response.put("username", foundUser.getUsername());

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}

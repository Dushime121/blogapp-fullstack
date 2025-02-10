package com.blog.blogapp;

import com.blog.blogapp.model.User;
import com.blog.blogapp.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private BCryptPasswordEncoder passwordEncoder;

    private User mockUser;

    @BeforeEach
    void setup() {
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername("testuser");
        mockUser.setPassword("testpassword");
    }

    @Test
    public void login_shouldReturn200_whenValidCredentials() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(mockUser);
        when(passwordEncoder.matches("testpassword", mockUser.getPassword())).thenReturn(true);

        String credentials = "{\"username\": \"testuser\", \"password\": \"testpassword\"}";

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(credentials))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(mockUser.getId()))
                .andExpect(jsonPath("$.username").value(mockUser.getUsername()));
    }

    @Test
    public void login_shouldReturn401_whenInvalidCredentials() throws Exception {
        when(userRepository.findByUsername("wronguser")).thenReturn(null);

        String credentials = "{\"username\": \"wronguser\", \"password\": \"wrongpassword\"}";

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(credentials))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid credentials"));
    }

    @Test
    public void login_shouldReturn401_whenWrongPassword() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(mockUser);
        when(passwordEncoder.matches("wrongpassword", mockUser.getPassword())).thenReturn(false);

        String credentials = "{\"username\": \"testuser\", \"password\": \"wrongpassword\"}";

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(credentials))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid credentials"));
    }
}

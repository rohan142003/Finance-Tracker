package com.rohan.finance_tracker.controller;

import com.rohan.finance_tracker.dto.LoginRequest;
import com.rohan.finance_tracker.dto.LoginResponse;
import com.rohan.finance_tracker.dto.RegisterRequest;

import com.rohan.finance_tracker.entity.User;

import com.rohan.finance_tracker.repository.UserRepository;

import com.rohan.finance_tracker.service.AuthenticationService;
import com.rohan.finance_tracker.service.UserService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    private final AuthenticationService authenticationService;

    private final UserRepository userRepository;


    public AuthController(
            UserService userService,
            AuthenticationService authenticationService,
            UserRepository userRepository
    ) {

        this.userService = userService;

        this.authenticationService =
                authenticationService;

        this.userRepository =
                userRepository;
    }


    // ==============================
    // REGISTER
    // ==============================

    @PostMapping("/register")
    public String register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return userService.register(request);
    }


    // ==============================
    // LOGIN
    // ==============================

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request
    ) {

        return authenticationService.login(request);
    }


    // ==============================
    // CURRENT LOGGED-IN USER
    // ==============================

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(
            Authentication authentication
    ) {

        String email =
                authentication.getName();


        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        return Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail()
        );
    }

}
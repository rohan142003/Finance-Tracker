package com.rohan.finance_tracker.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {

        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

                // Disable CSRF because we're using JWT
                .csrf(csrf ->
                        csrf.disable()
                )


                // We don't want server-side sessions.
                // JWT handles authentication.
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // Configure endpoint security
                .authorizeHttpRequests(auth ->

                        auth

                                // Registration and Login
                                // must be accessible without JWT
                                .requestMatchers(
                                        "/api/auth/**"
                                )
                                .permitAll()


                                // Everything else requires
                                // authentication
                                .anyRequest()
                                .authenticated()

                )


                // Run JWT filter before Spring's
                // username/password filter
                .addFilterBefore(

                        jwtAuthenticationFilter,

                        UsernamePasswordAuthenticationFilter.class

                );


        return http.build();
    }

}
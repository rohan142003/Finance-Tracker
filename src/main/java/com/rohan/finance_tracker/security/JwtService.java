package com.rohan.finance_tracker.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "FinanceTrackerSecretKeyFinanceTrackerSecretKey123456";


    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes(
                            StandardCharsets.UTF_8
                    )
            );


    // ==========================================
    // GENERATE JWT
    // ==========================================

    public String generateToken(String email) {

        return Jwts.builder()

                // Store user's email inside JWT
                .subject(email)

                // Token creation time
                .issuedAt(new Date())

                // Token expires after 24 hours
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000
                        )
                )

                // Sign JWT
                .signWith(key)

                .compact();
    }


    // ==========================================
    // EXTRACT EMAIL FROM JWT
    // ==========================================

    public String extractEmail(String token) {

        return extractAllClaims(token)
                .getSubject();
    }


    // ==========================================
    // EXTRACT JWT CLAIMS
    // ==========================================

    private Claims extractAllClaims(
            String token
    ) {

        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload();
    }


    // ==========================================
    // CHECK WHETHER TOKEN IS VALID
    // ==========================================

    public boolean isTokenValid(
            String token
    ) {

        try {

            Claims claims =
                    extractAllClaims(token);

            return claims
                    .getExpiration()
                    .after(new Date());

        } catch (Exception e) {

            return false;
        }
    }
}
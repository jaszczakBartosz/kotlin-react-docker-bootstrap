package com.bartoszjaszczak.demo.auth.jwt

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtil {
    @Value("\${jwt.secret}")
    private lateinit var secret: String

    @Value("\${jwt.expiration}")
    private var jwtExpiration: Long = 0

    fun generateToken(userDetails: UserDetails): String {
        val key = Keys.hmacShaKeyFor(secret.toByteArray())
        return Jwts.builder()
            .setSubject(userDetails.username)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(key)
            .compact()
    }

    fun validateToken(token: String, userDetails: UserDetails): Boolean {
        val key = Keys.hmacShaKeyFor(secret.toByteArray())
        val claims = Jwts.parser()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body

        val username = claims.subject
        val expiration = claims.expiration
        return username == userDetails.username && !expiration.before(Date())
    }

    fun extractUsername(token: String): String {
        val key = Keys.hmacShaKeyFor(secret.toByteArray())
        return Jwts.parser()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body
            .subject
    }
}
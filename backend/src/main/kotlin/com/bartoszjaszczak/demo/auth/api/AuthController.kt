package com.bartoszjaszczak.demo.auth.api

import com.bartoszjaszczak.demo.auth.jwt.JwtUtil
import com.bartoszjaszczak.demo.auth.user.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class AuthRequest(
    val username: String,
    val password: String
)

data class AuthResponse(
    val token: String
)

data class RegisterRequest(
    val username: String,
    val password: String
)

@RestController
@RequestMapping("/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val userService: UserService,
    private val jwtUtil: JwtUtil
) {

    @PostMapping("/login")
    fun login(@RequestBody request: AuthRequest): ResponseEntity<AuthResponse> {
        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(request.username, request.password)
        )

        val userDetails = userService.loadUserByUsername(request.username)
        val jwt = jwtUtil.generateToken(userDetails)

        return ResponseEntity.ok(AuthResponse(jwt))
    }

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<AuthResponse> {
        val user = userService.createUser(request.username, request.password)
        val userDetails = userService.loadUserByUsername(user.username)
        val jwt = jwtUtil.generateToken(userDetails)

        return ResponseEntity.ok(AuthResponse(jwt))
    }
}
package com.bartoszjaszczak.demo.auth.user

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) : UserDetailsService {

    @Transactional
    fun createUser(username: String, password: String): User {
        val encodedPassword = passwordEncoder.encode(password)
        val user = User(username = username, password = encodedPassword)
        return userRepository.save(user)
    }

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        val authorities = user.roles.map { SimpleGrantedAuthority(it) }

        return org.springframework.security.core.userdetails.User
            .withUsername(user.username)
            .password(user.password)
            .authorities(authorities)
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build()
    }

    fun findByUsername(username: String): User? =
        userRepository.findByUsername(username)
}
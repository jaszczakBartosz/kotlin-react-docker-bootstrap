package com.bartoszjaszczak.demo.auth.user

import com.bartoszjaszczak.demo.shared_kernel.auth.User
import com.bartoszjaszczak.demo.shared_kernel.auth.UserProvider
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class UserProviderImpl(private val userService: UserService) : UserProvider {

    override fun get(): User {
        SecurityContextHolder.getContext().authentication?.let {
            val username = it.name
            return userService.findByUsername(username)?.let { user ->
                User(
                    id = user.id,
                    username = user.username
                )
            } ?: throw IllegalStateException("User not found")
        } ?: throw IllegalStateException("User not authenticated")
    }
}
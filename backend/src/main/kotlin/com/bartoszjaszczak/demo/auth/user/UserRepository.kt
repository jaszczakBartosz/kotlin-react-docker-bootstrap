package com.bartoszjaszczak.demo.auth.user

import org.springframework.stereotype.Repository

interface UserRepository {
    fun findByUsername(username: String): User?
    fun save(user: User): User
}

@Repository
class InMemoryUserRepository : UserRepository {
    private val users = mutableMapOf<String, User>()

    override fun findByUsername(username: String): User? = users[username]

    override fun save(user: User): User {
        if (users.containsKey(user.username)) {
            throw IllegalArgumentException("User with username ${user.username} already exists")
        }
        val id = users.size.toLong() + 1
        val newUser = user.copy(id = id)
        users[newUser.username] = newUser
        return newUser
    }
}
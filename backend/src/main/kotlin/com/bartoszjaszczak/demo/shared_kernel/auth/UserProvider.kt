package com.bartoszjaszczak.demo.shared_kernel.auth

interface UserProvider {
    fun get(): User
}

data class User(
    val id: Long = 0,
    val username: String,
)
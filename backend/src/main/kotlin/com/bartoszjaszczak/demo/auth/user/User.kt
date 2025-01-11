package com.bartoszjaszczak.demo.auth.user

data class User(
    val id: Long = 0,

    val username: String,

    val password: String,

    val roles: Set<String> = setOf("ROLE_USER")
)
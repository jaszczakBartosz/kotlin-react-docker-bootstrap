package com.bartoszjaszczak.demo.shared_kernel.exception

import java.time.LocalDateTime

class AuthenticationException(message: String) : RuntimeException(message)
class TokenException(message: String) : RuntimeException(message)
class ResourceNotFoundException(message: String) : RuntimeException(message)

data class ErrorResponse(val message: String, var status: Int, var timestamp: LocalDateTime? = LocalDateTime.now()) {
    constructor(message: String, status: Int) : this(message, status, LocalDateTime.now())
}
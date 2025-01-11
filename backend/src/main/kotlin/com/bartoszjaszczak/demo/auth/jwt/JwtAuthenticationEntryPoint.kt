package com.bartoszjaszczak.demo.auth.jwt

import com.bartoszjaszczak.demo.shared_kernel.exception.ErrorResponse
import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.MediaType
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class JwtAuthenticationEntryPoint : AuthenticationEntryPoint {
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        response.contentType = MediaType.APPLICATION_JSON_VALUE
        response.status = HttpServletResponse.SC_UNAUTHORIZED

        val body = ErrorResponse(
            status = HttpServletResponse.SC_UNAUTHORIZED,
            message = "Unauthorized: ${authException.message}",
            timestamp = LocalDateTime.now()
        )

        ObjectMapper().writeValue(response.outputStream, body)
    }
}
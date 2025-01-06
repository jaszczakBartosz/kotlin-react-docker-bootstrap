package com.bartoszjaszczak.demo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse
import org.springframework.web.servlet.function.router

@SpringBootApplication
class DemoApplication

fun main(args: Array<String>) {
	runApplication<DemoApplication>(*args)
}

@Configuration
class RouterConfig {
	@Bean
	fun userRoutes(handler: UserHandler) = router {
		"/api/users".nest {
			GET("", handler::getAllUsers)
		}
	}
}

@Component
class UserHandler {
	fun getAllUsers(request: ServerRequest): ServerResponse {
		// Handler logic
		return ServerResponse.ok().body("All users")
	}
}


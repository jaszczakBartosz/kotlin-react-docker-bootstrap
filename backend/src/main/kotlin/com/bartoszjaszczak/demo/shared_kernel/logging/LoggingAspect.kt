package com.bartoszjaszczak.demo.shared_kernel.logging

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.springframework.stereotype.Component
import kotlin.time.measureTimedValue

@Aspect
@Component
class LoggingAspect {

    @Around("@within(org.springframework.web.bind.annotation.RestController)")
    fun logControllerMethods(joinPoint: ProceedingJoinPoint): Any {
        val methodName = "${joinPoint.signature.declaringType.simpleName}.${joinPoint.signature.name}"

        logger.info("Executing $methodName")

        return try {
            val (result, duration) = measureTimedValue {
                joinPoint.proceed()
            }
            logger.info("Completed $methodName in ${duration.inWholeMilliseconds}ms")
            result
        } catch (e: Exception) {
            logger.error("Error executing $methodName", e)
            throw e
        }
    }
}
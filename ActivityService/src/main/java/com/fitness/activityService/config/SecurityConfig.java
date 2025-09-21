package com.fitness.activityService.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    private final String jwtUri;

    public SecurityConfig(@Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}") String jwtUri) {
        this.jwtUri = jwtUri;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // disable CSRF for APIs
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated()    // all endpoints secured
                )
                .oauth2ResourceServer(oauth2-> oauth2.jwt(jwt-> jwt.jwkSetUri(jwtUri)));

        return http.build();
    }

}

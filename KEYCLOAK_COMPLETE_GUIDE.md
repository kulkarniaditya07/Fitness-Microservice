# Keycloak 26.3.4 & Authorization Service Complete Setup Guide

## Table of Contents
1. [Keycloak Installation & Setup](#keycloak-installation--setup)
2. [Realm Configuration](#realm-configuration)
3. [Client Configuration](#client-configuration)
4. [Role & Permission Setup](#role--permission-setup)
5. [User Management](#user-management)
6. [Authorization Service Architecture](#authorization-service-architecture)
7. [Spring Boot Integration](#spring-boot-integration)
8. [Gateway Configuration](#gateway-configuration)
9. [Microservice Integration](#microservice-integration)
10. [Testing & Troubleshooting](#testing--troubleshooting)

---

## Keycloak Installation & Setup

### Prerequisites
- Java 17+ (Keycloak 26.3.4 requires Java 17)
- Docker (recommended) or standalone installation
- PostgreSQL 15+ (for production)

### Installation via Docker (Recommended)

#### Step 1: Create Docker Compose File
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: keycloak_password_123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U keycloak"]
      interval: 10s
      timeout: 5s
      retries: 5

  keycloak:
    image: quay.io/keycloak/keycloak:26.3.4
    environment:
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: keycloak_password_123
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin_password_123
      KC_PROXY: edge
      KC_HOSTNAME: localhost
      KC_HOSTNAME_PORT: 8080
      KC_HTTP_ENABLED: 'true'
    command: start-dev
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - keycloak_data:/opt/keycloak/data

volumes:
  postgres_data:
  keycloak_data:
```

#### Step 2: Start Keycloak
```bash
docker-compose up -d
```

#### Step 3: Access Keycloak Admin Console
- URL: `http://localhost:8080`
- Username: `admin`
- Password: `admin_password_123`

---

## Realm Configuration

### Step 1: Create a New Realm

1. Navigate to Admin Console → Click "Keycloak" dropdown (top-left)
2. Click "Create Realm"
3. Enter realm name: `fitness-realm`
4. Click "Create"

### Step 2: Realm Settings

Navigate to **Realm Settings**:

#### General Tab
- **Realm name**: `fitness-realm`
- **Enabled**: Toggle ON
- **User-Managed Access**: ON (for authorization delegation)

#### Login Tab
- **User Registration**: ON
- **Email as username**: ON
- **Edit username**: OFF
- **Forgot password**: ON
- **Remember me**: ON
- **Verify email**: ON

#### Email Tab
Configure SMTP:
```
From: noreply@fitness-app.com
Host: smtp.gmail.com
Port: 587
Enable StartTLS: ON
Username: your-email@gmail.com
Password: your-app-password
```

#### Tokens Tab
- **Access Token Lifespan**: 5 minutes
- **Refresh Token Lifespan**: 7 days
- **Offline Access Token Lifespan**: 30 days
- **Access Token Signed Algorithm**: RS256

#### Sessions Tab
- **SSO Session Idle**: 30 minutes
- **SSO Session Max Lifespan**: 10 hours

---

## Client Configuration

### Step 1: Create Gateway Client

Navigate to **Clients** → **Create**

#### Settings Tab
- **Client type**: OpenID Connect
- **Client ID**: `fitness-gateway`
- **Name**: Fitness Gateway
- **Description**: API Gateway for fitness microservices
- **Enabled**: ON
- **Always Display in Console**: ON

#### Capability Config
- **Client Authentication**: ON (Confidential)
- **Authorization**: ON
- **Standard Flow Enabled**: ON
- **Implicit Flow Enabled**: OFF
- **Direct Access Grants Enabled**: ON
- **Service Accounts Enabled**: ON

#### Access Settings
- **Root URL**: `http://localhost:8000`
- **Home URL**: `http://localhost:8000`
- **Valid Redirect URIs**: 
  ```
  http://localhost:8000/*
  http://localhost:3000/*
  ```
- **Web Origins**: 
  ```
  http://localhost:3000
  http://localhost:8000
  ```

#### Advanced Settings
- **Access Token Format**: Default (JWT)
- **Advanced Settings → Proof Key for Public Clients (PKCE)**: OFF

#### Client Scopes
Add predefined scopes: `profile`, `email`, `roles`, `web-origins`

### Step 2: Create Microservices Clients

For each microservice (UserService, ActivityService, AiService):

#### UserService Client
- **Client ID**: `fitness-user-service`
- **Client Authentication**: ON
- **Service Accounts Enabled**: ON
- **Authorization**: ON
- **Root URL**: `http://localhost:8001`

#### ActivityService Client
- **Client ID**: `fitness-activity-service`
- **Client Authentication**: ON
- **Service Accounts Enabled**: ON
- **Authorization**: ON
- **Root URL**: `http://localhost:8002`

#### AiService Client
- **Client ID**: `fitness-ai-service`
- **Client Authentication**: ON
- **Service Accounts Enabled**: ON
- **Authorization**: ON
- **Root URL**: `http://localhost:8003`

### Step 3: Create Authorization Service Client

- **Client ID**: `fitness-auth-service`
- **Client Authentication**: ON
- **Service Accounts Enabled**: ON
- **Authorization**: ON
- **Root URL**: `http://localhost:8888`

#### Service Account Roles
1. Navigate to **Service Accounts Roles** tab
2. Add roles: `manage-users`, `manage-realm`, `query-clients`, `query-groups`

### Step 4: Get Client Credentials

For each client:
1. Navigate to **Credentials** tab
2. Copy **Client Secret** (you'll need this)

---

## Role & Permission Setup

### Step 1: Create Realm Roles

Navigate to **Realm Roles** → **Create Role**

#### Global Roles
```
ADMIN
  - Can manage users, roles, permissions
  - Access all services

MANAGER
  - Can view reports, manage users
  - Limited access to configuration

USER
  - Standard user access
  - Can view own data

TRAINER
  - Can create/manage activities
  - Can assign workouts to users

PREMIUM_USER
  - Enhanced features
  - Priority support
```

### Step 2: Create Client Roles

For each microservice client:

#### UserService Roles
```
user-service:user-read
user-service:user-write
user-service:user-delete
user-service:profile-read
user-service:profile-write
```

#### ActivityService Roles
```
activity-service:activity-read
activity-service:activity-write
activity-service:activity-delete
activity-service:report-read
```

#### AiService Roles
```
ai-service:workout-plan-generate
ai-service:meal-plan-generate
ai-service:recommendations-read
```

### Step 3: Create Authorization Policies

Navigate to **Clients** → `fitness-gateway` → **Authorization** tab

#### Resource-Based Access Control (RBAC)

1. **Policies** → **Create Policy** → **Role**
   
   **Policy: admin-access**
   - Roles: `ADMIN`
   - Logic: Positive
   
   **Policy: trainer-access**
   - Roles: `TRAINER`
   - Logic: Positive

2. **Policies** → **Create Policy** → **Time-Based**
   
   **Policy: business-hours**
   - Hour From: 06
   - Hour To: 22
   - Day of Month From: 1
   - Day of Month To: 31

### Step 4: Create Permission/Scopes

Navigate to **Clients** → `fitness-gateway` → **Authorization** tab → **Scopes**

```
user:read
user:write
user:delete
activity:read
activity:write
activity:delete
workout:read
workout:write
meal-plan:read
meal-plan:write
admin:access
```

---

## User Management

### Step 1: Create Test Users

Navigate to **Users** → **Add User**

#### Admin User
- **Username**: `admin-user`
- **Email**: `admin@fitness-app.com`
- **First Name**: Admin
- **Last Name**: User
- **Email Verified**: ON
- **Enabled**: ON

Set Password:
- Go to **Credentials** tab
- Click **Set Password**
- Password: `Admin@123`
- Temporary: OFF

Assign Roles:
- **Realm Roles**: `ADMIN`
- **Client Roles** (fitness-gateway): `admin-access`

#### Trainer User
- **Username**: `trainer-user`
- **Email**: `trainer@fitness-app.com`
- **Enabled**: ON

Assign Roles:
- **Realm Roles**: `TRAINER`, `USER`
- **Client Roles** (fitness-gateway): `trainer-access`
- **Client Roles** (fitness-activity-service): `activity-service:activity-write`, `activity-service:activity-read`

#### Regular User
- **Username**: `john-user`
- **Email**: `john@fitness-app.com`
- **Enabled**: ON

Assign Roles:
- **Realm Roles**: `USER`
- **Client Roles**: `user:read`, `activity:read`

### Step 2: Configure User Attributes

For each user, add custom attributes:
- **fitness_level**: beginner|intermediate|advanced
- **membership_type**: free|premium
- **department**: if applicable

---

## Authorization Service Architecture

### Overview
The Authorization Service acts as a middleware that:
1. Validates JWT tokens from Keycloak
2. Enforces fine-grained RBAC
3. Manages application-specific permissions
4. Caches authorization decisions
5. Logs audit trails

### Architecture Diagram
```
┌─────────────────┐
│   API Client    │
└────────┬────────┘
         │ Request + JWT Token
         ▼
┌─────────────────┐
│     Gateway     │
│   (Port 8000)   │
└────────┬────────┘
         │ Forward Request
         ▼
┌──────────────────────────┐
│ Authorization Service    │
│      (Port 8888)         │
│ • Token Validation       │
│ • RBAC Enforcement       │
│ • Permission Caching     │
│ • Audit Logging          │
└────────┬─────────────────┘
         │ Authorized Request
         ▼
┌─────────────────┐
│ Microservices   │
│ (8001-8003)     │
└─────────────────┘
```

### Database Schema for Authorization Service

```sql
CREATE TABLE permissions (
    id UUID PRIMARY KEY,
    role_id VARCHAR(255) NOT NULL,
    resource_name VARCHAR(255) NOT NULL,
    action VARCHAR(50) NOT NULL,
    conditions JSONB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    user_id VARCHAR(255),
    action VARCHAR(255),
    resource VARCHAR(255),
    result VARCHAR(50),
    timestamp TIMESTAMP,
    ip_address VARCHAR(45)
);

CREATE TABLE permission_cache (
    user_id VARCHAR(255) PRIMARY KEY,
    permissions JSONB,
    cached_at TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE INDEX idx_user_audit ON audit_logs(user_id);
CREATE INDEX idx_role_perms ON permissions(role_id);
```

---

## Spring Boot Integration

### Step 1: Gateway Configuration

#### `pom.xml` Dependencies
```xml
<!-- Spring Security & OAuth2 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-oauth2-resource-server</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

#### `application.yml`
```yaml
spring:
  application:
    name: fitness-gateway
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8080/realms/fitness-realm
          jwk-set-uri: http://localhost:8080/realms/fitness-realm/protocol/openid-connect/certs
  cloud:
    gateway:
      default-filters:
        - TokenRelay=
        - AuthenticationFilter
      routes:
        - id: user-service
          uri: http://localhost:8001
          predicates:
            - Path=/api/users/**
          filters:
            - AuthenticationFilter
            - RateLimit=10,1m

        - id: activity-service
          uri: http://localhost:8002
          predicates:
            - Path=/api/activities/**
          filters:
            - AuthenticationFilter

        - id: ai-service
          uri: http://localhost:8003
          predicates:
            - Path=/api/ai/**
          filters:
            - AuthenticationFilter

        - id: auth-service
          uri: http://localhost:8888
          predicates:
            - Path=/api/auth/**
          filters:
            - AuthenticationFilter

server:
  port: 8000

logging:
  level:
    org.springframework.security: DEBUG
    org.springframework.oauth2: DEBUG
```

### Step 2: Authorization Service Configuration

#### `pom.xml` for Authorization Service
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-oauth2-resource-server</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>com.github.benmanes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```

#### `application.yml` for Authorization Service
```yaml
spring:
  application:
    name: fitness-auth-service
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
  datasource:
    url: jdbc:postgresql://localhost:5432/fitness_auth_db
    username: postgres
    password: postgres
    driver-class-name: org.postgresql.Driver
  cache:
    type: caffeine
    caffeine:
      spec: maximumSize=10000,expireAfterWrite=10m
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8080/realms/fitness-realm
          jwk-set-uri: http://localhost:8080/realms/fitness-realm/protocol/openid-connect/certs

server:
  port: 8888

keycloak:
  admin-client-id: fitness-auth-service
  admin-client-secret: <paste-from-keycloak-credentials>
  server-url: http://localhost:8080
  realm: fitness-realm

logging:
  level:
    root: INFO
    com.fitness.auth: DEBUG
```

---

## Gateway Configuration

### Step 1: Security Configuration

Create `SecurityConfig.java`:

```java
package com.fitness.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .csrf().disable()
            .cors()
            .and()
            .authorizeExchange()
                .pathMatchers("/actuator/health/**").permitAll()
                .pathMatchers("/api/auth/login", "/api/auth/register").permitAll()
                .pathMatchers("/api/users/**").hasRole("USER")
                .pathMatchers("/api/activities/**").hasRole("USER")
                .pathMatchers("/api/ai/**").hasRole("USER")
                .anyExchange().authenticated()
            .and()
            .oauth2ResourceServer()
                .jwt();
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("http://localhost:8000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        
        JwtGrantedAuthoritiesConverter authoritiesConverter = new JwtGrantedAuthoritiesConverter();
        authoritiesConverter.setAuthoritiesClaimName("roles");
        authoritiesConverter.setAuthorityPrefix("ROLE_");
        
        converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);
        return converter;
    }
}
```

### Step 2: Authentication Filter

Create `AuthenticationFilter.java`:

```java
package com.fitness.gateway.filter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class AuthenticationFilter implements GlobalFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        
        // Skip for public endpoints
        if (isPublicRoute(request.getPath().toString())) {
            return chain.filter(exchange);
        }
        
        // Extract JWT from Authorization header
        String authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return onError(exchange, "Missing or invalid Authorization header", HttpStatus.UNAUTHORIZED);
        }
        
        try {
            String token = authHeader.substring(7);
            
            // Add user info to headers for downstream services
            ServerHttpRequest modifiedRequest = request.mutate()
                .header("X-User-ID", extractClaimFromToken(token, "sub"))
                .header("X-User-Roles", extractClaimFromToken(token, "roles"))
                .build();
            
            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        } catch (Exception e) {
            log.error("Token validation failed", e);
            return onError(exchange, "Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }
    
    private boolean isPublicRoute(String path) {
        return path.contains("/api/auth/login") || 
               path.contains("/api/auth/register") ||
               path.contains("/actuator/health");
    }
    
    private String extractClaimFromToken(String token, String claim) {
        // Implement JWT parsing using JJWT
        return "parsed_" + claim;
    }
    
    private Mono<Void> onError(ServerWebExchange exchange, String message, HttpStatus status) {
        exchange.getResponse().setStatusCode(status);
        return exchange.getResponse().setComplete();
    }
}
```

---

## Microservice Integration

### Step 1: UserService Configuration

#### `application.yml`
```yaml
spring:
  application:
    name: fitness-user-service
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8080/realms/fitness-realm

server:
  port: 8001

keycloak:
  server-url: http://localhost:8080
  realm: fitness-realm
  client-id: fitness-user-service
  client-secret: <paste-from-keycloak-credentials>
```

#### Security Configuration
```java
package com.fitness.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/actuator/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .oauth2ResourceServer()
                .jwt();
        
        return http.build();
    }
}
```

#### Controller with Method-Level Security
```java
package com.fitness.user.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') and @userService.isOwnerOrAdmin(#id, authentication)")
    public UserDTO getUser(@PathVariable String id, Authentication auth) {
        return userService.getUserById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public UserDTO createUser(@RequestBody UserCreateRequest request) {
        return userService.createUser(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public UserDTO updateUser(@PathVariable String id, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
}
```

### Step 2: ActivityService Configuration

Similar to UserService with service-specific roles:

```java
@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @PostMapping
    @PreAuthorize("hasRole('TRAINER') or hasRole('ADMIN')")
    public ActivityDTO createActivity(@RequestBody ActivityCreateRequest request) {
        return activityService.createActivity(request);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ActivityDTO getActivity(@PathVariable String id) {
        return activityService.getActivityById(id);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<ActivityDTO> listActivities(
        @RequestParam(required = false) String category) {
        return activityService.listActivities(category);
    }
}
```

---

## Authorization Service Implementation

### Authorization Service Main Components

#### `Permission.java` Entity
```java
package com.fitness.auth.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "permissions")
@Data
public class Permission {
    
    @Id
    @GeneratedValue
    private UUID id;
    
    @Column(nullable = false)
    private String roleId;
    
    @Column(nullable = false)
    private String resourceName;
    
    @Column(nullable = false)
    private String action;
    
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> conditions;
    
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

#### `AuditLog.java` Entity
```java
package com.fitness.auth.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {
    
    @Id
    @GeneratedValue
    private UUID id;
    
    @Column(nullable = false)
    private String userId;
    
    @Column(nullable = false)
    private String action;
    
    @Column(nullable = false)
    private String resource;
    
    @Column(nullable = false)
    private String result; // GRANTED, DENIED
    
    @Column(nullable = false)
    private LocalDateTime timestamp;
    
    @Column(length = 45)
    private String ipAddress;
    
    private String reason;
}
```

#### `AuthorizationService.java`
```java
package com.fitness.auth.service;

import com.fitness.auth.model.AuditLog;
import com.fitness.auth.model.Permission;
import com.fitness.auth.repository.AuditLogRepository;
import com.fitness.auth.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthorizationService {
    
    private final PermissionRepository permissionRepository;
    private final AuditLogRepository auditLogRepository;
    
    @Cacheable(value = "userPermissions", key = "#userId")
    public Set<String> getUserPermissions(String userId, Authentication auth) {
        Set<String> roles = auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> role.replace("ROLE_", ""))
            .collect(Collectors.toSet());
        
        List<Permission> permissions = permissionRepository
            .findByRoleIdIn(new ArrayList<>(roles));
        
        return permissions.stream()
            .map(p -> p.getResourceName() + ":" + p.getAction())
            .collect(Collectors.toSet());
    }
    
    public boolean authorize(String userId, String resource, String action, 
                            String ipAddress, Authentication auth) {
        try {
            Set<String> userPermissions = getUserPermissions(userId, auth);
            String requiredPermission = resource + ":" + action;
            boolean granted = userPermissions.contains(requiredPermission);
            
            auditLog(userId, resource + ":" + action, requiredPermission, 
                    granted ? "GRANTED" : "DENIED", ipAddress);
            
            return granted;
        } catch (Exception e) {
            log.error("Authorization check failed", e);
            auditLog(userId, resource + ":" + action, resource + ":" + action, 
                    "ERROR", ipAddress);
            return false;
        }
    }
    
    private void auditLog(String userId, String action, String resource, 
                         String result, String ipAddress) {
        AuditLog log = new AuditLog(
            null, userId, action, resource, result, LocalDateTime.now(), ipAddress, null
        );
        auditLogRepository.save(log);
    }
}
```

#### `AuthorizationController.java`
```java
package com.fitness.auth.controller;

import com.fitness.auth.dto.AuthorizationRequest;
import com.fitness.auth.dto.AuthorizationResponse;
import com.fitness.auth.service.AuthorizationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthorizationController {
    
    private final AuthorizationService authorizationService;
    
    @PostMapping("/authorize")
    public AuthorizationResponse authorize(
        @RequestBody AuthorizationRequest request,
        Authentication auth,
        HttpServletRequest httpRequest) {
        
        String ipAddress = getClientIp(httpRequest);
        boolean authorized = authorizationService.authorize(
            request.getUserId(),
            request.getResource(),
            request.getAction(),
            ipAddress,
            auth
        );
        
        return new AuthorizationResponse(authorized, request.getResource(), request.getAction());
    }
    
    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor == null || xForwardedFor.isEmpty()) {
            return request.getRemoteAddr();
        }
        return xForwardedFor.split(",")[0];
    }
}
```

---

## Testing & Troubleshooting

### Step 1: Get Access Token

```bash
curl -X POST http://localhost:8080/realms/fitness-realm/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=fitness-gateway" \
  -d "client_secret=<client-secret>" \
  -d "grant_type=password" \
  -d "username=john-user" \
  -d "password=John@123" \
  -d "scope=openid profile email roles"
```

Response:
```json
{
  "access_token": "eyJhbGc...",
  "expires_in": 300,
  "refresh_expires_in": 604800,
  "token_type": "Bearer",
  "id_token": "eyJhbGc...",
  "not-before-policy": 0,
  "session_state": "...",
  "scope": "email profile roles openid"
}
```

### Step 2: Test Authorization

```bash
curl -X POST http://localhost:8000/api/users/123 \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

### Step 3: Verify JWT Token

Decode token at [jwt.io](https://jwt.io):

Payload should contain:
```json
{
  "sub": "user-id",
  "email": "john@fitness-app.com",
  "roles": ["USER", "TRAINER"],
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Common Issues & Solutions

#### Issue 1: Token Validation Fails
```
Solution: 
1. Verify Keycloak JWK endpoint is accessible: 
   curl http://localhost:8080/realms/fitness-realm/protocol/openid-connect/certs
2. Check issuer-uri matches exactly
3. Ensure port 8080 is accessible from services
```

#### Issue 2: CORS Errors
```
Solution:
1. Add cors configuration in SecurityConfig
2. Verify allowed origins match your frontend URL
3. Ensure credentials are included in requests: 
   fetch(url, { credentials: 'include' })
```

#### Issue 3: Role Not Recognized
```
Solution:
1. Verify roles are assigned in Keycloak Admin Console
2. Check role claim name in JWT matches your extractor
3. Add "roles" to client scope mappings
```

#### Issue 4: Token Expires
```
Solution:
1. Implement refresh token rotation in frontend
2. Intercept 401 responses and refresh token
3. Update access token lifespan in Realm Settings if needed
```

### Performance Tuning

#### Enable Caching
```yaml
spring:
  cache:
    type: caffeine
    caffeine:
      spec: maximumSize=10000,expireAfterWrite=10m
```

#### Database Indexes
```sql
CREATE INDEX idx_role_perms ON permissions(role_id);
CREATE INDEX idx_user_audit ON audit_logs(user_id, timestamp DESC);
CREATE INDEX idx_token_cache ON permission_cache(expires_at);
```

#### Token Caching Strategy
- Cache user permissions for 10 minutes
- Invalidate cache on role changes
- Use distributed cache (Redis) for multi-instance setup

### Monitoring & Logging

Configure application logging:
```yaml
logging:
  level:
    org.springframework.security: DEBUG
    org.springframework.security.oauth2: DEBUG
    com.fitness: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
```

View Keycloak logs:
```bash
docker-compose logs keycloak
```

---

## Production Checklist

- [ ] Use HTTPS for all endpoints
- [ ] Enable PKCE flow for public clients (SPA)
- [ ] Implement rate limiting on auth endpoints
- [ ] Configure backup for PostgreSQL database
- [ ] Enable audit logging
- [ ] Set up monitoring and alerts
- [ ] Use environment variables for secrets
- [ ] Implement token refresh rotation
- [ ] Configure session timeout policies
- [ ] Set up key rotation for signing keys
- [ ] Enable 2FA for admin accounts
- [ ] Configure email verification
- [ ] Implement brute-force protection
- [ ] Enable bot detection (if needed)
- [ ] Set up disaster recovery plan

---

## Resources & References

- **Keycloak 26.3.4 Documentation**: https://www.keycloak.org/documentation
- **Spring Security OAuth2**: https://spring.io/projects/spring-security-oauth2-resource-server
- **OIDC Spec**: https://openid.net/connect/
- **JWT Best Practices**: https://tools.ietf.org/html/rfc8949


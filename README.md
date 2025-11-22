# 🏋️ Fitness Microservice Suite

[![Java](https://img.shields.io/badge/language-Java-blue.svg)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7%2B-green.svg)](https://spring.io/projects/spring-boot)
[![Kafka](https://img.shields.io/badge/Kafka-Messaging-informational)](https://kafka.apache.org/)
[![REST API](https://img.shields.io/badge/REST-Fully%20Documented-yellow)](#api-documentation)
[![AI-Driven](https://img.shields.io/badge/Features-AI%20Recommendations-orange)](#ai-power)

---

## 🚀 Overview

The **Fitness Microservice** project is an extensible, AI-powered backend tailored for fitness applications. Built with a modular microservice architecture, it enables seamless fitness activity tracking, personalized recommendations, and robust user management—all while leveraging the flexibility & scalability of Spring Boot and event-driven communication.

---

## 🏗️ Architecture

The system comprises discrete, maintainable microservices, each responsible for a functional domain:

<img width="1584" height="661" alt="Microservice Architecture" src="https://github.com/user-attachments/assets/d93cbef5-003e-4848-b9e9-72fd8909b3a9" />

---

## 🧩 Major Modules

### 1. **UserService**
Handles user registration, authentication, and profile management.
- Built with Spring Boot
- **Security:** Support for JWT/OAuth2-based protection (see `SecurityConfig.java`)
- API documentation at `/swagger-ui/`
- Entity example: see `User.java`

### 2. **ActivityService**
Records and manages user fitness activities (e.g., running, cycling, gym sessions).
- Receives and validates activity data
- Publishes relevant events via Kafka to other services
- Utilizes load-balanced inter-service communication (see `WebClientConfig.java`)

### 3. **AiService**
AI-powered, generates personalized fitness feedback and workout suggestions.
- Processes activity data and returns recommendations/safety tips
- Integrates with LLMs via Gemini API (`GeminiService.java`)
- Async analysis using `@Async` and Kafka
- Highly customizable prompts

### 4. **fitness-util**
Utility module shared across services.
- Common response & exception handling (`GlobalExceptionsHandler.java`)
- Data mapping & pagination helpers (`PageableObject.java`)

---

## 🤖 AI-Powered Recommendations

Upon recording an activity, the AiService analyzes it with an LLM prompt and responds with:
- **Performance Analysis:** Pace, heart rate, calories, custom insights
- **Actionable Improvements**
- **Tailored Workout Suggestions**
- **Personalized Safety Tips**

Example JSON output:

```json
{
  "analysis": {
    "overall": "Your endurance is improving.",
    "pace": "Even split maintained.",
    "heartRate": "Stayed mostly in zone 2.",
    "caloriesBurned": "Efficient calorie burn.",
    "OtherAdditionalMetrics": "N/A"
  },
  "improvements": [
    {
      "area": "Form",
      "recommendation": "Monitor running posture."
    }
  ],
  "suggestions": [
    {
      "workout": "Tempo Run",
      "description": "Enhances speed endurance."
    }
  ],
  "safety": [
    "Hydrate before/after.",
    "Stretch thoroughly."
  ]
}
```

---

## 🔒 Security

- OAuth2/JWT-ready authentication for service endpoints
- Custom error, validation, and exception handling

---

## 📦 Tech Stack

- **Java 17+**
- **Spring Boot** (REST, Kafka, Cloud, Security)
- **Kafka** (Event messaging)
- **LLM API Integration:** Gemini / compatible
- **OpenAPI / Swagger** (for auto-generated docs)
- **Lombok, JPA, ModelMapper, Jackson**

---

## 📑 API Documentation

All services use OpenAPI for auto-generated, interactive documentation.

- Visit `/swagger-ui/index.html` after running each service to explore available endpoints.

---

## 🛠️ Setup & Run

1. **Clone the project:**
   ```bash
   git clone https://github.com/kulkarniaditya07/Fitness-Microservice.git
   cd Fitness-Microservice
   ```
2. **Build with Maven:**
   ```bash
   mvn clean install
   ```
3. **Environment prerequisites:**
   - Kafka/Zookeeper running locally or via Docker
   - Required LLM API keys and URLs set in environment

4. **Run each service:**
   ```bash
   cd UserService && mvn spring-boot:run
   ```
   Repeat for `ActivityService`, `AiService`, etc.

---

## 🧪 Testing

Each service features JUnit-based tests.
```bash
mvn test
```
See test sources in `src/test/java/`.

---


## 📧 Contact

For issues or feature requests, open an issue or reach out to [Aditya Kulkarni](mailto:kulkarniaditya074@gmail.com).

---

> _Power up fitness tracking and coaching with scalable, AI-driven microservices!_

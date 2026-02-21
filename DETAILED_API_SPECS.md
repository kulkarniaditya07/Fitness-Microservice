# Detailed API Specifications by Service

## UserService - User Management & Authentication

### Base Path: `/api/users`

---

### 1. Register
**POST /api/users/register**
- **Authentication:** None required
- **Purpose:** Create a new user account
- **Request:**
  ```json
  {
    "firstName": "string (required)",
    "lastName": "string (required)",
    "email": "string (required, valid email format)",
    "password": "string (required, min 8 chars, at least 1 uppercase, 1 number, 1 special char)"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "createdAt": "2026-02-21T10:30:00Z"
  }
  ```
- **Error Responses:**
  - 400: Invalid email format, weak password, missing fields
  - 409: Email already exists

---

### 2. Login
**POST /api/users/login**
- **Authentication:** None required
- **Purpose:** Authenticate user and return JWT token
- **Request:**
  ```json
  {
    "email": "string (required)",
    "password": "string (required)",
    "rememberMe": "boolean (optional, default: false)"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Error Responses:**
  - 400: Invalid credentials
  - 401: Email not found or password incorrect
  - 404: User not found

---

### 3. Get Profile
**GET /api/users/profile**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Retrieve current user's profile
- **Query Parameters:** None
- **Success Response (200):**
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "joinDate": "2026-01-15T08:00:00Z",
    "tags": ["Runner", "Morning Workouts", "Goal: 10k Steps"],
    "settings": {
      "notificationsEnabled": true,
      "privacyMode": false,
      "weeklySummaryEmails": true,
      "language": "English"
    }
  }
  ```
- **Error Responses:**
  - 401: Unauthorized (invalid/missing token)
  - 404: User not found

---

### 4. Update Profile
**PUT /api/users/profile**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Update user profile information
- **Request:**
  ```json
  {
    "firstName": "string (optional)",
    "lastName": "string (optional)",
    "tags": ["string"] (optional, max 5 tags)
  }
  ```
- **Success Response (200):**
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "tags": ["Runner", "Cyclist"]
  }
  ```
- **Error Responses:**
  - 400: Invalid data
  - 401: Unauthorized

---

### 5. Update Settings
**PUT /api/users/settings**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Update user settings and preferences
- **Request:**
  ```json
  {
    "notificationsEnabled": "boolean (optional)",
    "privacyMode": "boolean (optional)",
    "weeklySummaryEmails": "boolean (optional)",
    "language": "string (optional, allowed: 'English', 'Hindi', 'Spanish')"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "notificationsEnabled": true,
    "privacyMode": false,
    "weeklySummaryEmails": true,
    "language": "English"
  }
  ```
- **Error Responses:**
  - 400: Invalid settings values
  - 401: Unauthorized

---

### 6. Export Data
**GET /api/users/export**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Export all user data
- **Query Parameters:**
  - `format`: "json" | "csv" (default: "json")
- **Success Response (200):**
  - Returns file download with all user data
- **Response Body Example (if JSON):**
  ```json
  {
    "user": { ... },
    "activities": [ ... ],
    "recommendations": [ ... ],
    "settings": { ... },
    "exportedAt": "2026-02-21T10:30:00Z"
  }
  ```
- **Error Responses:**
  - 401: Unauthorized

---

## ActivityService - Activity Tracking & Analytics

### Base Path: `/api/activities`

---

### 1. Create Activity
**POST /api/activities**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Log a new activity/workout
- **Request:**
  ```json
  {
    "type": "RUNNING | CYCLING | YOGA | WALKING | GYM | SWIMMING (required)",
    "duration": "number, 1-1440 minutes (required)",
    "calories": "number, 1-5000 (required)",
    "startTime": "ISO timestamp or HH:mm string (required)",
    "effort": "Low | Moderate | High (required)",
    "notes": "string (optional, max 500 chars)"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "type": "RUNNING",
    "duration": 30,
    "calories": 220,
    "startTime": "2026-02-21T06:30:00Z",
    "effort": "Moderate",
    "notes": "Easy morning run",
    "createdAt": "2026-02-21T10:30:00Z"
  }
  ```
- **Error Responses:**
  - 400: Invalid activity data
  - 401: Unauthorized

---

### 2. Get All Activities
**GET /api/activities**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Retrieve all activities for current user
- **Query Parameters:**
  ```
  limit=50 (default: 50, max: 500)
  offset=0 (default: 0)
  type=RUNNING (optional, filter by type)
  startDate=2026-02-01 (optional, ISO format)
  endDate=2026-02-28 (optional, ISO format)
  sortBy=createdAt (optional: createdAt, calories, duration)
  sortOrder=desc (optional: asc, desc)
  ```
- **Success Response (200):**
  ```json
  {
    "activities": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "type": "RUNNING",
        "duration": 30,
        "calories": 220,
        "startTime": "2026-02-21T06:30:00Z",
        "effort": "Moderate",
        "createdAt": "2026-02-21T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 42,
      "limit": 50,
      "offset": 0,
      "hasMore": false
    }
  }
  ```
- **Error Responses:**
  - 401: Unauthorized
  - 400: Invalid query parameters

---

### 3. Get Activity Statistics
**GET /api/activities/statistics**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Get aggregated activity statistics
- **Query Parameters:**
  ```
  period=week (required: week, month, year)
  type=RUNNING (optional, filter by activity type)
  ```
- **Success Response (200):**
  ```json
  {
    "period": "week",
    "periodStart": "2026-02-15",
    "periodEnd": "2026-02-21",
    "summary": {
      "totalActivities": 6,
      "totalDuration": 195,
      "totalCalories": 1340,
      "averageCaloriesPerActivity": 223.33,
      "averageDurationPerActivity": 32.5
    },
    "streak": {
      "current": 9,
      "longest": 12,
      "unit": "days"
    },
    "recovery": {
      "score": 72,
      "status": "Good",
      "recommendation": "Continue current pace"
    },
    "weeklyBreakdown": [
      {
        "day": "2026-02-15",
        "dayName": "Sunday",
        "activities": 1,
        "duration": 30,
        "calories": 220,
        "effortDistribution": {
          "low": 0,
          "moderate": 1,
          "high": 0
        }
      }
    ],
    "typeDistribution": {
      "RUNNING": 3,
      "CYCLING": 2,
      "YOGA": 1,
      "WALKING": 0,
      "GYM": 0,
      "SWIMMING": 0
    },
    "trends": {
      "caloriesTrend": 6.5,
      "durationTrend": 3.2,
      "frequencyTrend": 2.1,
      "effortTrend": "stable"
    }
  }
  ```
- **Error Responses:**
  - 401: Unauthorized
  - 400: Invalid period parameter

---

### 4. Get Activity Types
**GET /api/activities/types**
- **Authentication:** Optional
- **Purpose:** Get available activity types
- **Query Parameters:** None
- **Success Response (200):**
  ```json
  {
    "types": [
      { "value": "RUNNING", "label": "Running", "icon": "running" },
      { "value": "CYCLING", "label": "Cycling", "icon": "cycling" },
      { "value": "YOGA", "label": "Yoga", "icon": "yoga" },
      { "value": "WALKING", "label": "Walking", "icon": "walking" },
      { "value": "GYM", "label": "Gym", "icon": "gym" },
      { "value": "SWIMMING", "label": "Swimming", "icon": "swimming" }
    ]
  }
  ```
- **Error Responses:** None expected

---

### 5. Delete Activity
**DELETE /api/activities/{activityId}**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Delete an activity log
- **Path Parameters:**
  ```
  activityId: UUID (required)
  ```
- **Success Response (204):** No content or
  ```json
  {
    "message": "Activity deleted successfully",
    "id": "550e8400-e29b-41d4-a716-446655440001"
  }
  ```
- **Error Responses:**
  - 401: Unauthorized
  - 403: Forbidden (user doesn't own activity)
  - 404: Activity not found

---

## AiService - AI Recommendations

### Base Path: `/api/recommendations`

---

### 1. Get Recommendations
**GET /api/recommendations**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Retrieve AI-generated recommendations
- **Query Parameters:**
  ```
  type=ALL (optional: RUNNING, CYCLING, YOGA, ALL, default: ALL)
  limit=3 (default: 3, max: 10)
  category=all (optional: performance, safety, all)
  ```
- **Success Response (200):**
  ```json
  {
    "recommendations": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "type": "RUNNING",
        "title": "Improve Cadence",
        "tip": "Add 3 x 60-second fast strides after warm-up to improve pace control.",
        "category": "performance",
        "generatedAt": "2026-02-21T08:00:00Z",
        "relevanceScore": 92,
        "basedOnActivities": 5,
        "tips": [
          "Tip 1 detail",
          "Tip 2 detail"
        ]
      }
    ],
    "safetyAlert": {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "title": "Overtraining Risk",
      "description": "Increase load by no more than 10% week-over-week to avoid overtraining.",
      "severity": "medium",
      "icon": "warning"
    },
    "generatedAt": "2026-02-21T10:00:00Z"
  }
  ```
- **Error Responses:**
  - 401: Unauthorized

---

### 2. Generate New Recommendations
**POST /api/recommendations/generate**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Trigger generation of new recommendations (async)
- **Request:**
  ```json
  {
    "activityType": "RUNNING (optional: RUNNING, CYCLING, YOGA, ALL)",
    "recentActivityCount": 5 (optional, default: 5, max: 30),
    "includeGeneralTips": true (optional, default: true)
  }
  ```
- **Success Response (202 or 200):**
  ```json
  {
    "status": "processing",
    "message": "Recommendations are being generated...",
    "estimatedTime": "5-10 seconds",
    "requestId": "550e8400-e29b-41d4-a716-446655440004",
    "recommendations": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "type": "RUNNING",
        "title": "Improve Cadence",
        "tip": "Add 3 x 60-second fast strides after warm-up to improve pace control.",
        "category": "performance",
        "generatedAt": "2026-02-21T10:30:00Z",
        "relevanceScore": 92
      }
    ]
  }
  ```
- **Error Responses:**
  - 401: Unauthorized
  - 400: Invalid activity type or parameters
  - 429: Too many requests

---

### 3. Get Safety Tips
**GET /api/recommendations/safety-tips**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Get general safety tips
- **Query Parameters:**
  ```
  type=ALL (optional: RUNNING, CYCLING, YOGA, ALL)
  severity=all (optional: low, medium, high, all)
  ```
- **Success Response (200):**
  ```json
  {
    "tips": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440005",
        "title": "Recovery is Important",
        "description": "Allow 48 hours between high-intensity sessions in the same muscle groups.",
        "severity": "high",
        "applicableTypes": ["GYM", "RUNNING"],
        "icon": "shield",
        "createdAt": "2025-12-01T00:00:00Z"
      }
    ],
    "total": 15
  }
  ```
- **Error Responses:**
  - 401: Unauthorized

---

## Dashboard Service

### Base Path: `/api/dashboard`

---

### 1. Get Dashboard Summary
**GET /api/dashboard/summary**
- **Authentication:** Required (Bearer Token)
- **Purpose:** Get all dashboard data in one call
- **Query Parameters:** None
- **Success Response (200):**
  ```json
  {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "joinDate": "2026-01-15"
    },
    "thisWeek": {
      "totalActivities": 6,
      "totalCalories": 1340,
      "totalDuration": 195,
      "streak": 9
    },
    "stats": [
      {
        "label": "Total Activities",
        "value": "42",
        "trend": "+12%",
        "positive": true,
        "icon": "activity"
      },
      {
        "label": "Calories Burned",
        "value": "8,940",
        "trend": "+6%",
        "positive": true,
        "icon": "flame"
      },
      {
        "label": "Current Streak",
        "value": "9 days",
        "trend": "+2 days",
        "positive": true,
        "icon": "fire"
      },
      {
        "label": "Recovery Score",
        "value": "72%",
        "trend": "+3%",
        "positive": false,
        "icon": "heart"
      }
    ],
    "weeklyCalories": [
      { "day": "Sun", "calories": 390, "activities": 1 },
      { "day": "Mon", "calories": 350, "activities": 1 },
      { "day": "Tue", "calories": 420, "activities": 2 },
      { "day": "Wed", "calories": 280, "activities": 1 },
      { "day": "Thu", "calories": 510, "activities": 1 },
      { "day": "Fri", "calories": 470, "activities": 1 },
      { "day": "Sat", "calories": 620, "activities": 2 }
    ],
    "motivationalMessage": "You are 2 workouts away from beating your best weekly streak. Keep the momentum.",
    "recommendationCount": 3,
    "newRecommendations": 1
  }
  ```
- **Error Responses:**
  - 401: Unauthorized
  - 500: Service integration error

---

## Common Response Structures

### Success Response Headers
```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: private, max-age=300
X-Request-ID: uuid
```

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Optional additional details",
    "path": "/api/users/register",
    "timestamp": "2026-02-21T10:30:00Z",
    "requestId": "uuid"
  }
}
```

### Common Error Codes
- `INVALID_REQUEST` - Malformed request
- `INVALID_EMAIL` - Invalid email format
- `WEAK_PASSWORD` - Password doesn't meet requirements
- `DUPLICATE_EMAIL` - Email already registered
- `INVALID_CREDENTIALS` - Wrong email/password
- `UNAUTHORIZED` - Missing/invalid token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource doesn't exist
- `CONFLICT` - Resource conflict (e.g., duplicate)
- `RATE_LIMITED` - Too many requests
- `INTERNAL_ERROR` - Server error



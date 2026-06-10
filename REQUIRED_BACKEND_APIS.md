# Required Backend APIs for Fitness Microservice Frontend

## Overview
This document outlines all the backend APIs required to support the frontend components of the Fitness Microservice application. The frontend is built with Next.js and uses React for component management.

---

## 1. Authentication APIs (UserService)

### 1.1 User Registration
**Endpoint:** `POST /api/users/register`

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201 Created):**
```json
{
  "id": "string (UUID)",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "createdAt": "timestamp"
}
```

**Used by:** `/auth/register` page

---

### 1.2 User Login
**Endpoint:** `POST /api/users/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "rememberMe": "boolean (optional)"
}
```

**Response (200 OK):**
```json
{
  "token": "JWT token",
  "refreshToken": "string (optional)",
  "user": {
    "id": "string (UUID)",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
}
```

**Used by:** `/auth/login` page

---

### 1.3 Get Current User Profile
**Endpoint:** `GET /api/users/profile`

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "id": "string (UUID)",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "joinDate": "timestamp",
  "tags": ["string (e.g., 'Runner', 'Morning Workouts', 'Goal: 10k Steps')"]
}
```

**Used by:** 
- `/dashboard` - ProfileCard component
- Dashboard overview display

---

### 1.4 Update User Profile
**Endpoint:** `PUT /api/users/profile`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "tags": ["string"]
}
```

**Response (200 OK):**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "tags": ["string"]
}
```

**Used by:** Dashboard - ProfileCard updates

---

### 1.5 Update User Settings
**Endpoint:** `PUT /api/users/settings`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "notificationsEnabled": "boolean",
  "privacyMode": "boolean",
  "weeklySummaryEmails": "boolean",
  "language": "string (e.g., 'English', 'Hindi', 'Spanish')"
}
```

**Response (200 OK):**
```json
{
  "notificationsEnabled": "boolean",
  "privacyMode": "boolean",
  "weeklySummaryEmails": "boolean",
  "language": "string"
}
```

**Used by:** Settings Panel component

---

### 1.6 Export User Data
**Endpoint:** `GET /api/users/export`

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):** File download or JSON export of all user data

**Used by:** Settings Panel - Export Data button

---

## 2. Activity APIs (ActivityService)

### 2.1 Create Activity
**Endpoint:** `POST /api/activities`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "type": "RUNNING | CYCLING | YOGA | WALKING | GYM | SWIMMING",
  "duration": "number (minutes)",
  "calories": "number",
  "startTime": "string (HH:mm format or ISO timestamp)",
  "effort": "Low | Moderate | High"
}
```

**Response (201 Created):**
```json
{
  "id": "string (UUID)",
  "userId": "string",
  "type": "string",
  "duration": "number",
  "calories": "number",
  "startTime": "timestamp",
  "effort": "string",
  "createdAt": "timestamp"
}
```

**Used by:** ActivityTracker component - "Add Activity" form

---

### 2.2 Get All User Activities
**Endpoint:** `GET /api/activities`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `limit`: number (default: 50)
- `offset`: number (default: 0)
- `type`: string (optional, filter by activity type)
- `startDate`: ISO timestamp (optional)
- `endDate`: ISO timestamp (optional)

**Response (200 OK):**
```json
{
  "activities": [
    {
      "id": "string",
      "type": "string",
      "duration": "number",
      "calories": "number",
      "startTime": "timestamp",
      "effort": "string",
      "createdAt": "timestamp"
    }
  ],
  "total": "number",
  "limit": "number",
  "offset": "number"
}
```

**Used by:** 
- ActivityTracker component - "Recent Logs" table
- Dashboard - Statistics aggregation

---

### 2.3 Get Activity Statistics
**Endpoint:** `GET /api/activities/statistics`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `period`: "week | month | year" (default: "week")
- `type`: string (optional, filter by activity type)

**Response (200 OK):**
```json
{
  "totalActivities": "number",
  "totalCalories": "number",
  "totalDuration": "number",
  "averageCaloriesPerActivity": "number",
  "averageDurationPerActivity": "number",
  "currentStreak": "number (days)",
  "weeklyBreakdown": [
    {
      "day": "string (Mon-Sun)",
      "calories": "number",
      "duration": "number",
      "activityCount": "number"
    }
  ],
  "recoveryScore": "number (0-100)",
  "typeDistribution": {
    "RUNNING": "number",
    "CYCLING": "number",
    "YOGA": "number",
    "WALKING": "number",
    "GYM": "number",
    "SWIMMING": "number"
  }
}
```

**Used by:**
- Dashboard - StatCard component (Total Activities, Calories Burned, Current Streak, Recovery Score)
- Dashboard - WeeklyBars component (7-day calories breakdown)

---

### 2.4 Delete Activity
**Endpoint:** `DELETE /api/activities/{activityId}`

**Headers:** `Authorization: Bearer {token}`

**Response (204 No Content or 200 OK):**
```json
{
  "message": "Activity deleted successfully"
}
```

**Used by:** ActivityTracker component - Delete recent log

---

### 2.5 Get Activity Types
**Endpoint:** `GET /api/activities/types`

**Headers:** `Authorization: Bearer {token}` (optional)

**Response (200 OK):**
```json
{
  "types": [
    {
      "value": "RUNNING",
      "label": "Running"
    },
    {
      "value": "CYCLING",
      "label": "Cycling"
    },
    {
      "value": "YOGA",
      "label": "Yoga"
    },
    {
      "value": "WALKING",
      "label": "Walking"
    },
    {
      "value": "GYM",
      "label": "Gym"
    },
    {
      "value": "SWIMMING",
      "label": "Swimming"
    }
  ]
}
```

**Used by:** ActivityTracker component - Activity Type dropdown

---

## 3. AI Recommendation APIs (AiService)

### 3.1 Get AI Recommendations
**Endpoint:** `GET /api/recommendations`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `type`: "RUNNING | CYCLING | YOGA | ALL" (default: "ALL")
- `limit`: number (default: 3)
- `regenerate`: boolean (default: false)

**Response (200 OK):**
```json
{
  "recommendations": [
    {
      "id": "string",
      "type": "RUNNING | CYCLING | YOGA | ALL",
      "title": "string",
      "tip": "string (detailed recommendation)",
      "category": "performance | safety",
      "generatedAt": "timestamp",
      "relevanceScore": "number (0-100)"
    }
  ],
  "safetyTip": {
    "title": "string",
    "description": "string",
    "severity": "low | medium | high"
  }
}
```

**Used by:**
- Dashboard - RecommendationPanel component
- Displays AI-generated performance and safety suggestions

---

### 3.2 Generate New Recommendations
**Endpoint:** `POST /api/recommendations/generate`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "activityType": "RUNNING | CYCLING | YOGA | ALL (optional)",
  "recentActivityCount": "number (default: 5)"
}
```

**Response (200 OK or 202 Accepted):**
```json
{
  "recommendations": [
    {
      "id": "string",
      "type": "string",
      "title": "string",
      "tip": "string",
      "category": "string",
      "generatedAt": "timestamp",
      "relevanceScore": "number"
    }
  ],
  "status": "generated | processing",
  "message": "string"
}
```

**Used by:** RecommendationPanel - "Generate New Recommendations" button

---

### 3.3 Get Safety Tips
**Endpoint:** `GET /api/recommendations/safety-tips`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `type`: string (optional, filter by activity type)

**Response (200 OK):**
```json
{
  "tips": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "severity": "low | medium | high",
      "applicableTypes": ["string"],
      "createdAt": "timestamp"
    }
  ]
}
```

**Used by:** RecommendationPanel - Safety tip section

---

## 4. Dashboard Analytics APIs (ActivityService/AiService)

### 4.1 Get Dashboard Summary
**Endpoint:** `GET /api/dashboard/summary`

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "userName": "string",
  "totalActivities": "number",
  "totalCalories": "number",
  "currentStreak": "number (days)",
  "recoveryScore": "number (0-100)",
  "weeklyTrends": {
    "caloriesTrend": "number (percentage)",
    "activitiesTrend": "number (percentage)",
    "streakTrend": "string"
  },
  "motivationalMessage": "string",
  "newRecommendationsCount": "number",
  "weeklyCaloriesByDay": [
    {
      "day": "string",
      "calories": "number"
    }
  ]
}
```

**Used by:** 
- Dashboard page - Overall statistics and summary
- StatCard components (Total Activities, Calories Burned, Current Streak, Recovery Score)
- WeeklyBars component (7-day breakdown)
- Motivation section message

---

## 5. Error Handling

All API endpoints should return standardized error responses:

### Error Response Format
```json
{
  "error": {
    "code": "string (e.g., 'INVALID_EMAIL', 'UNAUTHORIZED', 'NOT_FOUND')",
    "message": "string",
    "details": "string (optional)",
    "timestamp": "timestamp"
  }
}
```

### Common HTTP Status Codes
- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate email/resource already exists
- `500 Internal Server Error` - Server-side error

---

## 6. Authentication & Security

### Required Headers
All protected endpoints (marked with `Authorization: Bearer {token}`) require:
- `Authorization: Bearer {JWT_TOKEN}` header
- Token should be obtained from login endpoint

### CORS Requirements
- Allow requests from frontend origin (e.g., `http://localhost:3000`)
- Support CORS headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`

### Token Management
- JWT tokens should have appropriate expiration (suggested: 1 hour)
- Refresh tokens for session renewal (optional but recommended)
- Tokens should be stored securely in HttpOnly cookies or localStorage

---

## 7. Frontend Components to Backend API Mapping

| Component | API Endpoints Required |
|-----------|----------------------|
| **Login Page** | POST /api/users/login |
| **Register Page** | POST /api/users/register |
| **Dashboard Page** | GET /api/dashboard/summary, GET /api/activities/statistics |
| **ProfileCard** | GET /api/users/profile |
| **ActivityTracker** | POST /api/activities, GET /api/activities, DELETE /api/activities/{id}, GET /api/activities/types |
| **StatCard** | GET /api/activities/statistics |
| **WeeklyBars** | GET /api/activities/statistics |
| **RecommendationPanel** | GET /api/recommendations, POST /api/recommendations/generate, GET /api/recommendations/safety-tips |
| **SettingsPanel** | PUT /api/users/settings, GET /api/users/export |
| **Navbar** | GET /api/users/profile (for logout/auth state) |

---

## 8. Data Models Summary

### User Model
```
{
  id: UUID
  firstName: string
  lastName: string
  email: string (unique)
  password: hashed string
  joinDate: timestamp
  settings: {
    notificationsEnabled: boolean
    privacyMode: boolean
    weeklySummaryEmails: boolean
    language: string
  }
  tags: string[]
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Activity Model
```
{
  id: UUID
  userId: UUID
  type: enum (RUNNING, CYCLING, YOGA, WALKING, GYM, SWIMMING)
  duration: number (minutes)
  calories: number
  startTime: timestamp
  effort: enum (Low, Moderate, High)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Recommendation Model
```
{
  id: UUID
  userId: UUID
  type: enum (RUNNING, CYCLING, YOGA, ALL)
  title: string
  tip: string
  category: enum (performance, safety)
  relevanceScore: number (0-100)
  generatedAt: timestamp
  isActive: boolean
}
```

---

## 9. Implementation Notes

1. **Pagination:** Implement pagination for list endpoints (activities, etc.) to handle large datasets
2. **Caching:** Consider caching frequently accessed data like user profile, statistics
3. **Rate Limiting:** Implement rate limiting to prevent abuse
4. **Validation:** Validate all input data (email format, password strength, number ranges)
5. **Database Indexes:** Index frequently queried fields (userId, email, activityType, createdAt)
6. **Async Operations:** Consider async processing for AI recommendation generation
7. **Monitoring:** Log all API calls for debugging and analytics

---

## 10. Future Enhancements

- Social features (share activities, leaderboards)
- Real-time notifications WebSocket
- Advanced analytics and reporting
- Integration with wearable devices
- Mobile app specific endpoints
- Analytics dashboard for admins



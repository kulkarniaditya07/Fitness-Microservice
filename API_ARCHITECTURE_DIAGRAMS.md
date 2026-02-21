# API Architecture & Diagrams

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                          │
│                                                                     │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────────────────┐ │
│  │   Login    │  │  Dashboard   │  │     Activity/Settings       │ │
│  │  Register  │  │   Profile    │  │     Recommendations        │ │
│  │   Pages    │  │   Widgets    │  │     Forms                  │ │
│  └────────────┘  └──────────────┘  └─────────────────────────────┘ │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │                    React Components                             ││
│  │  ActivityTracker, ProfileCard, RecommendationPanel, etc.       ││
│  └────────────────────────────────────────────────────────────────┘│
│                                ↓ (Axios/React Query)               │
└─────────────────────────────────────────────────────────────────────┘
                                ↓
        ┌───────────────────────────────────────────────────────────┐
        │              API GATEWAY (Spring Cloud Gateway)           │
        └───────────────────────────────────────────────────────────┘
                                ↓
        ┌─────────────────────────────────────────────────────────────┐
        │                    MICROSERVICES                            │
        │                                                             │
        │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────┐ │
        │  │  UserService     │  │ ActivityService  │  │AiService │ │
        │  │                  │  │                  │  │          │ │
        │  │ • Register       │  │ • Create Activity│  │ • Gen.   │ │
        │  │ • Login          │  │ • Get Activities │  │   Rec.   │ │
        │  │ • Profile        │  │ • Statistics     │  │ • Safety │ │
        │  │ • Settings       │  │ • Activity Types │  │   Tips   │ │
        │  │ • Export         │  │ • Delete         │  │          │ │
        │  └──────────────────┘  └──────────────────┘  └──────────┘ │
        │         ↓                       ↓                    ↓     │
        │  ┌──────────────┐        ┌──────────────┐     ┌──────────┐│
        │  │   User DB    │        │ Activity DB  │     │   Rec DB ││
        │  │  (MongoDB)   │        │  (MongoDB)   │     │(MongoDB) ││
        │  └──────────────┘        └──────────────┘     └──────────┘│
        │                                                             │
        │  ┌────────────────────────────────────────────────────────┐│
        │  │         Dashboard Service (Aggregation Layer)          ││
        │  │  • GET /api/dashboard/summary (combines all data)      ││
        │  └────────────────────────────────────────────────────────┘│
        │                                                             │
        └─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. Authentication Flow

```
Frontend              Gateway              UserService           Database
   │                    │                       │                   │
   │─ POST /login ─────→│                       │                   │
   │                    │─ POST /register ─────→│                   │
   │                    │                       │─ Hash Password ───→│
   │                    │                       │                   │
   │                    │     ← JWT Token ──────│                   │
   │ ← Token (200 OK) ──│                       │                   │
   │                    │                       │                   │
```

### 2. Activity Logging Flow

```
Frontend              Gateway          ActivityService         Database
   │                    │                   │                    │
   │─ POST /activity ──→│                   │                    │
   │  (with JWT)        │─ Create Activity─→│                    │
   │                    │                   │─ Save Activity ────→│
   │                    │                   │                    │
   │                    │ ← Activity (201)──│                    │
   │ ← Success ─────────│                   │                    │
   │                    │                   │                    │
```

### 3. Statistics Calculation Flow

```
Frontend              Gateway           ActivityService          Database
   │                    │                    │                     │
   │─ GET /statistics ─→│                    │                     │
   │  (week/month)      │─ Calculate Stats ─→│                     │
   │                    │                    │─ Query Activities ─→│
   │                    │                    │                     │
   │                    │  ← Process Data ───│ ← All Activities ──│
   │                    │                    │                     │
   │                    │  Aggregate:        │                     │
   │                    │  • Total Calories  │                     │
   │                    │  • Total Duration  │                     │
   │                    │  • Current Streak  │                     │
   │                    │  • Weekly Breakdown│                     │
   │                    │  • Type Distribution                      │
   │                    │                    │                     │
   │ ← Statistics (200)─│                    │                     │
```

### 4. Recommendation Generation Flow

```
Frontend              Gateway            AiService          ActivityService
   │                    │                   │                     │
   │─ POST /generate ──→│                   │                     │
   │  (JWT)             │─ Generate Rec ───→│                     │
   │                    │                   │─ Get Recent Act. ──→│
   │                    │                   │                     │
   │                    │                   │ ← Last 5 Activities │
   │                    │  (202 Accepted)   │                     │
   │ ← Processing ──────│                   │ Analyze & Generate  │
   │                    │                   │ AI Recommendations  │
   │                    │                   │                     │
   │ (Poll or Callback) │                   │ Save Recommendations│
   │─ GET /recommendations ──────────────→  │                     │
   │ ← Recommendations ─│                   │                     │
```

### 5. Dashboard Summary Flow

```
Frontend              Gateway         Dashboard Service      Other Services
   │                    │                   │                     │
   │─ GET /dashboard ──→│                   │                     │
   │  (JWT)             │─ Get Summary ────→│                     │
   │                    │                   │─ Call UserService ─→│
   │                    │                   │─ Call ActivityService
   │                    │                   │─ Call AiService ───→│
   │                    │                   │                     │
   │                    │                   │ ← Aggregate Data ───│
   │                    │                   │                     │
   │ ← Dashboard Data ──│ ← Summary (200) ──│                     │
   │  (All Metrics)     │                   │                     │
```

---

## API Endpoint Organization

### By Service

```
UserService (6 APIs)
├── POST   /api/users/register
├── POST   /api/users/login
├── GET    /api/users/profile
├── PUT    /api/users/profile
├── PUT    /api/users/settings
└── GET    /api/users/export

ActivityService (5 APIs)
├── POST   /api/activities
├── GET    /api/activities
├── GET    /api/activities/statistics
├── GET    /api/activities/types
└── DELETE /api/activities/{id}

AiService (3 APIs)
├── GET    /api/recommendations
├── POST   /api/recommendations/generate
└── GET    /api/recommendations/safety-tips

Dashboard Service (1 API)
└── GET    /api/dashboard/summary
```

---

## Frontend Component to API Mapping

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND PAGES                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Login Page (/auth/login)                                 │  │
│  │ • Form: email, password, rememberMe                      │  │
│  │ ├─→ POST /api/users/login                                │  │
│  │ └─→ Get JWT Token                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Register Page (/auth/register)                           │  │
│  │ • Form: firstName, lastName, email, password             │  │
│  │ ├─→ POST /api/users/register                             │  │
│  │ └─→ Create Account                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Dashboard Page (/dashboard)                              │  │
│  │                                                          │  │
│  │ ┌──────────────────────────────────────────────────┐    │  │
│  │ │ Header Section                                  │    │  │
│  │ ├─→ GET /api/users/profile                        │    │  │
│  │ └─→ GET /api/dashboard/summary                    │    │  │
│  │ └──────────────────────────────────────────────────┘    │  │
│  │                                                          │  │
│  │ ┌──────────────────────────────────────────────────┐    │  │
│  │ │ StatCards (Total, Calories, Streak, Recovery) │    │  │
│  │ └─→ GET /api/activities/statistics                │    │  │
│  │ └──────────────────────────────────────────────────┘    │  │
│  │                                                          │  │
│  │ ┌──────────────────────────────────────────────────┐    │  │
│  │ │ WeeklyBars Chart                                │    │  │
│  │ └─→ GET /api/activities/statistics (weekly data) │    │  │
│  │ └──────────────────────────────────────────────────┘    │  │
│  │                                                          │  │
│  │ ┌──────────────────────────────────────────────────┐    │  │
│  │ │ ProfileCard                                     │    │  │
│  │ └─→ GET /api/users/profile                        │    │  │
│  │ └──────────────────────────────────────────────────┘    │  │
│  │                                                          │  │
│  │ ┌──────────────────────────────────────────────────┐    │  │
│  │ │ ActivityTracker                                 │    │  │
│  │ ├─→ GET /api/activities/types                     │    │  │
│  │ ├─→ POST /api/activities (new activity)           │    │  │
│  │ ├─→ GET /api/activities (list)                    │    │  │
│  │ └─→ DELETE /api/activities/{id}                   │    │  │
│  │ └──────────────────────────────────────────────────┘    │  │
│  │                                                          │  │
│  │ ┌──────────────────────────────────────────────────┐    │  │
│  │ │ RecommendationPanel                             │    │  │
│  │ ├─→ GET /api/recommendations                      │    │  │
│  │ ├─→ POST /api/recommendations/generate            │    │  │
│  │ └─→ GET /api/recommendations/safety-tips          │    │  │
│  │ └──────────────────────────────────────────────────┘    │  │
│  │                                                          │  │
│  │ ┌──────────────────────────────────────────────────┐    │  │
│  │ │ SettingsPanel                                   │    │  │
│  │ ├─→ PUT /api/users/settings                       │    │  │
│  │ └─→ GET /api/users/export                         │    │  │
│  │ └──────────────────────────────────────────────────┘    │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request/Response Examples

### Login Request Flow
```
1. Frontend sends:
   POST /api/users/login
   {
     "email": "john@example.com",
     "password": "SecurePass123!",
     "rememberMe": true
   }

2. Backend validates and returns:
   200 OK
   {
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
     "expiresIn": 3600,
     "user": {
       "id": "550e8400-e29b-41d4-a716-446655440000",
       "firstName": "John",
       "lastName": "Doe",
       "email": "john@example.com"
     }
   }

3. Frontend stores token and includes in future requests:
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Activity Creation Flow
```
1. Frontend sends (with JWT):
   POST /api/activities
   Authorization: Bearer {token}
   {
     "type": "RUNNING",
     "duration": 30,
     "calories": 220,
     "startTime": "06:30",
     "effort": "Moderate"
   }

2. Backend validates, saves, and returns:
   201 Created
   {
     "id": "550e8400-e29b-41d4-a716-446655440001",
     "userId": "550e8400-e29b-41d4-a716-446655440000",
     "type": "RUNNING",
     "duration": 30,
     "calories": 220,
     "startTime": "2026-02-21T06:30:00Z",
     "effort": "Moderate",
     "createdAt": "2026-02-21T10:30:00Z"
   }

3. Frontend updates activity list with new activity
```

### Dashboard Summary Flow
```
1. Frontend sends (with JWT):
   GET /api/dashboard/summary
   Authorization: Bearer {token}

2. Dashboard Service:
   - Calls UserService for profile
   - Calls ActivityService for statistics
   - Calls AiService for recommendations
   - Aggregates all data

3. Backend returns:
   200 OK
   {
     "user": { ... },
     "thisWeek": { ... },
     "stats": [ ... ],
     "weeklyCalories": [ ... ],
     "motivationalMessage": "...",
     "recommendationCount": 3
   }

4. Frontend renders complete dashboard with all sections
```

---

## Error Handling Flow

```
Frontend (With JWT)
   │
   ├─ Missing/Invalid Token
   │  └─→ 401 Unauthorized
   │      {
   │        "error": {
   │          "code": "UNAUTHORIZED",
   │          "message": "Invalid or expired token"
   │        }
   │      }
   │      └─→ Frontend: Redirect to login
   │
   ├─ Invalid Request Data
   │  └─→ 400 Bad Request
   │      {
   │        "error": {
   │          "code": "INVALID_REQUEST",
   │          "message": "Duration must be > 0"
   │        }
   │      }
   │      └─→ Frontend: Show validation error
   │
   ├─ Resource Not Found
   │  └─→ 404 Not Found
   │      {
   │        "error": {
   │          "code": "NOT_FOUND",
   │          "message": "Activity not found"
   │        }
   │      }
   │      └─→ Frontend: Show error message
   │
   ├─ Resource Already Exists
   │  └─→ 409 Conflict
   │      {
   │        "error": {
   │          "code": "CONFLICT",
   │          "message": "Email already registered"
   │        }
   │      }
   │      └─→ Frontend: Show duplicate error
   │
   └─ Server Error
      └─→ 500 Internal Server Error
          {
            "error": {
              "code": "INTERNAL_ERROR",
              "message": "Something went wrong"
            }
          }
          └─→ Frontend: Show generic error + retry
```

---

## Caching Strategy

```
┌─────────────────────────────────────────────┐
│      Frontend (React Query Caching)         │
│                                             │
│  GET /api/users/profile                    │
│  └─→ Cache: 5 minutes                      │
│                                             │
│  GET /api/activities/types                 │
│  └─→ Cache: 1 hour (rarely changes)        │
│                                             │
│  GET /api/activities/statistics             │
│  └─→ Cache: 10 minutes                     │
│      └─→ Invalidate on new activity        │
│                                             │
│  GET /api/recommendations                   │
│  └─→ Cache: 15 minutes                     │
│      └─→ Manual refresh available          │
│                                             │
│  GET /api/dashboard/summary                │
│  └─→ Cache: 5 minutes                      │
│      └─→ Auto-refresh on activity change   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Database Schema Relationships

```
┌──────────────┐
│    Users     │
├──────────────┤
│ id (PK)      │
│ email (UK)   │
│ password     │
│ firstName    │
│ lastName     │
│ joinDate     │
│ createdAt    │
│ updatedAt    │
└──────┬───────┘
       │
       │ 1:N
       ├─→ Activities
       │   ├─ id (PK)
       │   ├─ userId (FK)
       │   ├─ type
       │   ├─ duration
       │   ├─ calories
       │   ├─ startTime
       │   ├─ effort
       │   ├─ createdAt
       │
       ├─→ Recommendations
       │   ├─ id (PK)
       │   ├─ userId (FK)
       │   ├─ type
       │   ├─ title
       │   ├─ tip
       │   ├─ category
       │   ├─ relevanceScore
       │   ├─ generatedAt
       │
       └─→ Settings
           ├─ userId (PK/FK)
           ├─ notificationsEnabled
           ├─ privacyMode
           ├─ weeklySummaryEmails
           ├─ language
```

---

## Deployment Architecture

```
┌────────────────────────────────────────────────────────┐
│                  CLOUD DEPLOYMENT                      │
│                                                        │
│  ┌─────────────────────────────────────────────────┐ │
│  │            Load Balancer / API Gateway          │ │
│  └────────────────────┬────────────────────────────┘ │
│                       │                              │
│     ┌─────────────────┼─────────────────┐            │
│     │                 │                 │            │
│  ┌──▼──┐          ┌───▼───┐      ┌──────▼──┐         │
│  │User │          │Activity│      │AI       │         │
│  │Service          │Service │      │Service  │         │
│  └──┬──┘          ┌───┬───┘      └──┬───┬──┘         │
│     │             │   │             │   │             │
│  ┌──▼──────────┐┌─▼───▼─┐     ┌─────▼───▼────┐      │
│  │ User DB     ││Activity│     │ Recommend DB │      │
│  │ (MongoDB)   ││DB      │     │  (MongoDB)   │      │
│  └─────────────┘└────────┘     └──────────────┘      │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │         Logging & Monitoring                    │ │
│  │  (ELK Stack / Prometheus / Grafana)            │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │              CI/CD Pipeline                      │ │
│  │  (GitHub Actions / GitLab CI / Jenkins)         │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

**All diagrams reference the 15 APIs identified in the analysis**



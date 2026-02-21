# Frontend Analysis Summary - Backend API Requirements

**Generated:** February 21, 2026
**Project:** Fitness Microservice
**Frontend:** Next.js 15 with React
**Analysis Scope:** fitness-frontend directory

---

## Executive Summary

Based on a comprehensive analysis of the fitness-frontend codebase, I've identified **14 core backend APIs** required to support all frontend components. These APIs are distributed across 3 microservices (UserService, ActivityService, AiService) plus a Dashboard aggregation layer.

---

## Frontend Structure Overview

### Pages
1. **Home Page** (`/`) - Landing page with feature highlights
2. **Login Page** (`/auth/login`) - User authentication
3. **Register Page** (`/auth/register`) - New user registration  
4. **Dashboard Page** (`/dashboard`) - Main user dashboard with all metrics and features

### Components (by functionality)
- **Layout:** Navbar
- **Activity:** ActivityTracker
- **Dashboard:** StatCard, WeeklyBars
- **Profile:** ProfileCard
- **Recommendations:** RecommendationPanel
- **Settings:** SettingsPanel
- **Common:** Various UI components

### Frontend Libraries Used
- Next.js 15.1.0 (App Router)
- React 18.3.1
- React Hook Form (form management)
- Axios (HTTP client)
- TanStack React Query (data fetching/caching)
- Chart.js & react-chartjs-2 (charts)
- Zustand (state management)
- NextAuth (authentication)
- DaisyUI (UI components)
- Tailwind CSS (styling)

---

## Data Flow Analysis

### User Journey
1. **Unauthenticated:**
   - User lands on home page
   - Registers new account or logs in

2. **Authenticated:**
   - Access dashboard with personal statistics
   - View activity history
   - Log new activities
   - Receive AI recommendations
   - Manage settings

### Data Requirements by Component

| Component | Data Needed | API Source |
|-----------|-------------|-----------|
| **Login Form** | Email, Password validation | POST /api/users/login |
| **Register Form** | First/Last name, email, password | POST /api/users/register |
| **Dashboard Header** | User name, welcome message | GET /api/users/profile |
| **StatCards** | Activities, calories, streak, recovery | GET /api/activities/statistics |
| **WeeklyBars** | Daily calories for 7 days | GET /api/activities/statistics |
| **ProfileCard** | Name, email, join date, tags, stats | GET /api/users/profile |
| **ActivityTracker** | Activity types, form submission, activity list | GET /api/activities/types, POST /api/activities, GET /api/activities |
| **RecommendationPanel** | AI tips, safety alerts, filter options | GET /api/recommendations, POST /api/recommendations/generate |
| **SettingsPanel** | User preferences | PUT /api/users/settings, GET /api/users/export |

---

## Complete Backend API List

### UserService (6 APIs)
1. `POST /api/users/register` - Register new user
2. `POST /api/users/login` - User login with JWT token
3. `GET /api/users/profile` - Get current user profile
4. `PUT /api/users/profile` - Update user profile
5. `PUT /api/users/settings` - Update user settings/preferences
6. `GET /api/users/export` - Export user data

### ActivityService (5 APIs)
7. `POST /api/activities` - Create new activity log
8. `GET /api/activities` - Get all activities (with pagination/filtering)
9. `GET /api/activities/statistics` - Get activity statistics & metrics
10. `GET /api/activities/types` - Get available activity types
11. `DELETE /api/activities/{id}` - Delete activity

### AiService (3 APIs)
12. `GET /api/recommendations` - Get AI recommendations
13. `POST /api/recommendations/generate` - Generate new recommendations
14. `GET /api/recommendations/safety-tips` - Get safety tips

### Dashboard Service (1 API)
15. `GET /api/dashboard/summary` - Aggregated dashboard data

---

## Key Statistics & Metrics

### Metrics the Frontend Displays
- **Total Activities** - Total count of all logged activities
- **Calories Burned** - Sum of all calories from activities
- **Current Streak** - Number of consecutive days with activities
- **Recovery Score** - Health metric 0-100%
- **Weekly Breakdown** - Calories per day for 7 days
- **Activity Distribution** - Count by activity type (Running, Cycling, Yoga, etc.)
- **Trends** - % change compared to previous period

### Activity Types Supported
1. RUNNING
2. CYCLING
3. YOGA
4. WALKING
5. GYM
6. SWIMMING

### Effort Levels
1. Low - Light intensity
2. Moderate - Medium intensity
3. High - High intensity

### User Settings
1. Notifications enabled/disabled
2. Privacy mode toggle
3. Weekly email summary toggle
4. Language preference (English, Hindi, Spanish)

---

## Authentication & Authorization

### Requirements
- JWT token-based authentication
- Token obtained from login endpoint
- All protected endpoints require: `Authorization: Bearer {JWT_TOKEN}`
- Optional remember-me functionality
- Session management with refresh tokens

### Protected vs Public Endpoints
- **Public:** Register, Login, Activity Types (optional)
- **Protected:** All other endpoints require authentication

---

## API Response Structure

### Standard Success Response
```json
{
  "data": { /* endpoint specific data */ },
  "status": "success",
  "timestamp": "ISO timestamp"
}
```

### Standard Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": "Optional details"
  }
}
```

### HTTP Status Codes
- 200 OK - Successful GET/PUT
- 201 Created - Successful POST
- 204 No Content - Successful DELETE
- 400 Bad Request - Invalid input
- 401 Unauthorized - Missing/invalid token
- 404 Not Found - Resource not found
- 409 Conflict - Duplicate resource
- 500 Internal Server Error

---

## Data Persistence Requirements

### MongoDB Collections
1. **Users**
   - id, firstName, lastName, email, hashedPassword, joinDate, settings, tags
   - Indexes: email (unique)

2. **Activities**
   - id, userId, type, duration, calories, startTime, effort, createdAt
   - Indexes: userId, createdAt, type

3. **Recommendations**
   - id, userId, type, title, tip, category, relevanceScore, generatedAt
   - Indexes: userId, createdAt

4. **Settings**
   - userId, notificationsEnabled, privacyMode, weeklySummaryEmails, language
   - Indexes: userId (unique)

---

## Frontend Dependencies on Backend

### Critical Path Dependencies
1. **Login** → Must complete before accessing any dashboard features
2. **Activities** → Must be retrievable for stats calculations
3. **Statistics** → Must aggregate activities for dashboard display
4. **Recommendations** → Must be available for recommendation panel
5. **User Profile** → Must be available for header/profile display

### Optional/Nice-to-Have
- Export data functionality
- Recommendation regeneration
- Advanced filtering and sorting

---

## Implementation Approach

### Recommended Phases

**Phase 1 (Week 1) - Core Auth & Activity**
- User registration and login
- Activity CRUD operations
- Basic statistics calculation

**Phase 2 (Week 2) - Analytics & Recommendations**
- Full statistics with trends
- Recommendation retrieval (initial mock data)
- Dashboard aggregation

**Phase 3 (Week 3) - AI Features**
- AI recommendation generation algorithm
- Safety tips implementation
- Performance optimization

**Phase 4 (Week 4) - Polish**
- Comprehensive testing
- Documentation
- Deployment preparation

---

## Frontend-Backend Integration Notes

### Considerations
1. **CORS Configuration** - Allow requests from frontend origin
2. **Rate Limiting** - Implement to prevent abuse
3. **Caching** - Cache statistics (5-10 min TTL)
4. **Pagination** - Implement for activities list (50 items/page suggested)
5. **Error Handling** - Standardized error responses with codes
6. **Logging** - Track API calls for debugging
7. **Security** - Password hashing, JWT validation, input sanitization

### Frontend Libraries Ready
- Axios for HTTP requests
- React Query for data fetching and caching
- NextAuth for authentication handling
- React Hook Form for form validation
- Zustand for state management

---

## Deliverables Provided

1. **REQUIRED_BACKEND_APIS.md** - Comprehensive API documentation
2. **API_QUICK_REFERENCE.md** - Quick lookup for all endpoints
3. **DETAILED_API_SPECS.md** - Complete endpoint specifications with examples
4. **IMPLEMENTATION_CHECKLIST.md** - Step-by-step implementation guide
5. **This Summary Document** - Overview and analysis

---

## Next Steps

1. Review the API specifications with your backend team
2. Prioritize implementation phases
3. Set up development environment and databases
4. Begin Phase 1 implementation
5. Create Swagger/OpenAPI documentation
6. Set up automated testing
7. Configure CI/CD pipeline
8. Plan deployment strategy

---

## Contact & Questions

For clarifications on:
- **Frontend Components** - Review fitness-frontend/src code
- **API Specifications** - See DETAILED_API_SPECS.md
- **Implementation Timeline** - See IMPLEMENTATION_CHECKLIST.md
- **Quick Reference** - See API_QUICK_REFERENCE.md

---

**End of Analysis Document**

Generated with comprehensive code review of fitness-frontend components, forms, and data flows.



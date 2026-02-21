# Backend APIs Quick Reference

## Summary of All Required APIs

### 🔐 Authentication & User Management (UserService)
1. **POST /api/users/register** - User registration
2. **POST /api/users/login** - User login with JWT token
3. **GET /api/users/profile** - Get current user profile
4. **PUT /api/users/profile** - Update user profile
5. **PUT /api/users/settings** - Update user settings (notifications, privacy, language, etc.)
6. **GET /api/users/export** - Export user data

### 🏃 Activity Management (ActivityService)
1. **POST /api/activities** - Create new activity log
2. **GET /api/activities** - Get all activities with pagination & filters
3. **GET /api/activities/statistics** - Get activity statistics (totals, streaks, recovery score, weekly breakdown)
4. **GET /api/activities/types** - Get available activity types (RUNNING, CYCLING, YOGA, WALKING, GYM, SWIMMING)
5. **DELETE /api/activities/{activityId}** - Delete activity

### 🤖 AI Recommendations (AiService)
1. **GET /api/recommendations** - Get AI recommendations (filterable by activity type)
2. **POST /api/recommendations/generate** - Generate new recommendations (async)
3. **GET /api/recommendations/safety-tips** - Get safety tips

### 📊 Dashboard Analytics
1. **GET /api/dashboard/summary** - Get dashboard summary with all metrics and weekly trends

---

## Key Data Points Needed by Frontend

### From User Profile
- Name, Email, Join Date
- User tags/interests (Runner, Morning Workouts, etc.)

### From Activity Statistics
- Total activities count
- Total calories burned
- Current activity streak (days)
- Recovery score (0-100%)
- Weekly calories breakdown by day
- Activity type distribution

### From Recommendations
- 3+ AI recommendations with title, tip, and activity type
- Safety tip message
- Ability to filter by activity type

### Dashboard Stats
- Trends (% increase/decrease for activities, calories, streak)
- Motivational message based on performance
- Count of new recommendations

---

## Frontend Components Using Each API

| Page/Component | Purpose | APIs Used |
|---|---|---|
| Login Page | User authentication | POST /api/users/login |
| Register Page | New user account creation | POST /api/users/register |
| Dashboard | Main view with all stats | GET /api/dashboard/summary, GET /api/activities/statistics |
| Profile Card | Display user info | GET /api/users/profile |
| Activity Tracker | Log new activities & view history | POST /api/activities, GET /api/activities, DELETE /api/activities/{id}, GET /api/activities/types |
| Statistics Cards | Show KPIs | GET /api/activities/statistics |
| Weekly Chart | Calories per day | GET /api/activities/statistics |
| Recommendations Panel | AI tips | GET /api/recommendations, POST /api/recommendations/generate |
| Settings Panel | Manage preferences | PUT /api/users/settings, GET /api/users/export |

---

## Activity Types Supported
- **RUNNING** - Running/jogging
- **CYCLING** - Cycling/biking
- **YOGA** - Yoga/flexibility
- **WALKING** - Walking
- **GYM** - Gym/weightlifting
- **SWIMMING** - Swimming

---

## Effort Levels
- **Low** - Light intensity
- **Moderate** - Medium intensity
- **High** - High intensity

---

## Activity Metrics
- **Duration** - Minutes
- **Calories** - Total calories burned
- **Start Time** - When activity started (HH:mm or ISO format)
- **Type** - Activity type (from list above)
- **Effort** - Intensity level

---

## User Settings Fields
- `notificationsEnabled` - Workout reminders toggle
- `privacyMode` - Private activity mode toggle
- `weeklySummaryEmails` - Weekly email summary toggle
- `language` - Language preference (English, Hindi, Spanish)

---

## Authentication Requirements
- All protected endpoints need: `Authorization: Bearer {JWT_TOKEN}`
- Token obtained from login endpoint
- Include CORS headers for cross-origin requests

---

## Pagination & Filtering
- **Activities endpoint** supports:
  - `limit` - Number of results (default: 50)
  - `offset` - Pagination offset (default: 0)
  - `type` - Filter by activity type
  - `startDate` - Filter from date
  - `endDate` - Filter to date

---

## Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": "Optional details",
    "timestamp": "ISO timestamp"
  }
}
```

HTTP Status Codes:
- 200 OK (GET, PUT)
- 201 Created (POST)
- 204 No Content (DELETE)
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 409 Conflict (duplicate resource)
- 500 Internal Server Error



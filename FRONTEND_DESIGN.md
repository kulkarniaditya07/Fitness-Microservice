# Fitness Microservice - Frontend Design Document
## Getting Started ⭐ START HERE
### Project Name
**Application Name**: `fitness-frontend`  
**Framework**: Next.js 15+ with React 18+ and TypeScript  
**Location**: `/home/aditya-kulkarni/Microservice/fitness-microservice/fitness-frontend`
### Quick Setup - Copy & Paste These Commands
```bash
# Step 1: Navigate and create project folder
cd /home/aditya-kulkarni/Microservice/fitness-microservice
mkdir fitness-frontend
cd fitness-frontend
# Step 2: Initialize Next.js project
# Select: Yes to all options when prompted
npx create-next-app@latest . --typescript --tailwind --eslint
# Step 3: Install ALL dependencies (Copy the entire line)
npm install daisyui zustand @tanstack/react-query axios react-hook-form zod chart.js react-chartjs-2 next-auth clsx tailwind-merge date-fns
# Step 4: Create folder structure
mkdir -p src/app/{auth,dashboard} src/components/{auth,dashboard,activity,recommendation,profile,layout,common,charts,forms,settings} src/services/{api,auth} src/hooks src/store src/types src/utils src/middleware src/styles src/config public/{icons,images}
# Step 5: Create .env.local file (see contents below)
# Step 6: Start dev server
npm run dev
```
### Environment Variables (.env.local)
Create file `.env.local` in your project root with this content:
```env
API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-change-in-production
NEXT_PUBLIC_ENABLE_RECOMMENDATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_USER_API=/api/users
NEXT_PUBLIC_ACTIVITY_API=/api/activities
NEXT_PUBLIC_RECOMMENDATION_API=/api/recommendation
```
### All Dependencies Summary
These 12 packages will be installed:
| Package | Purpose |
|---------|---------|
| daisyui | Tailwind UI Components |
| zustand | State Management |
| @tanstack/react-query | Data Fetching |
| axios | HTTP Client |
| react-hook-form | Form Management |
| zod | Validation |
| chart.js | Charting |
| react-chartjs-2 | React Charts |
| next-auth | Authentication |
| clsx | CSS Utilities |
| tailwind-merge | Tailwind Utilities |
| date-fns | Date Utilities |
### Verify Setup
```bash
node --version        # Should be 18+
npm --version         # Should be 8+
npm run dev          # Should start at http://localhost:3000
```
### Next Steps
1. Complete setup commands above
2. Verify dev server runs at http://localhost:3000
3. Copy **Prompt 1** from section below
4. Paste into ChatGPT
5. Follow ChatGPT to create files
6. Continue with Prompts 2-14
---
## Table of Contents
1. [Getting Started](#getting-started) ⭐ **START HERE**
2. [Technology Stack](#technology-stack)
3. [Color Scheme](#color-scheme)
4. [System Architecture](#system-architecture)
5. [Page Structure & Routing](#page-structure--routing)
6. [Component Architecture](#component-architecture)
7. [Data Models & API Integration](#data-models--api-integration)
8. [Feature Implementation](#feature-implementation)
9. [ChatGPT Prompts](#chatgpt-prompts)
---
7. [Feature Implementation](#feature-implementation)
8. [ChatGPT Prompts](#chatgpt-prompts)
---
## Technology Stack
### Frontend Framework
- **Next.js 15+** - React framework with built-in routing, API routes, and SSR/SSG capabilities
- **TypeScript** - For type safety and better development experience
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind component library with pre-built components
- **React Query** - Server state management and caching
- **Zustand** - Lightweight client state management
- **Next-Auth.js** - Authentication and session management
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Chart.js & React-Chartjs-2** - Data visualization
- **Streamline Icons** - Icon library
### Backend Integration
- **API Gateway**: `http://localhost:8080`
- **User Service**: `/api/users`
- **Activity Service**: `/api/activities`
- **AI Recommendation Service**: `/api/recommendation`
---
## Color Scheme
### Primary Palette (from coolors.co)
```
Primary Blue: #0066CC        - Main brand color
Secondary Teal: #00A896      - Accent and highlights
Success Green: #2DBA4E       - Positive actions, achievements
Warning Orange: #FF9500      - Alerts and attention
Danger Red: #E63946          - Errors and warnings
Neutral Gray: #F5F5F5        - Backgrounds
Dark Gray: #2C3E50           - Text and borders
```
### Tailwind Configuration Addition
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#00A896',
        success: '#2DBA4E',
        warning: '#FF9500',
        danger: '#E63946',
      },
    },
  },
};
```
### DaisyUI Theme Configuration
- **Primary Theme**: `fitness` (custom theme based on primary blue)
- **Secondary Theme**: `emerald` (for accents)
- **Fallback**: `light` theme as default
---
## System Architecture
### Application Structure
```
fitness-frontend/
├── public/
│   ├── icons/                    # Streamline icons
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/                      # Next.js app router
│   │   ├── (auth)/              # Authentication routes group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/       # Home/overview
│   │   │   ├── profile/         # User profile
│   │   │   ├── activities/      # Activity management
│   │   │   ├── recommendations/ # AI recommendations
│   │   │   └── settings/        # User settings
│   │   ├── api/                 # API routes & proxies
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home/landing page
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── LogoutButton.tsx
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx
│   │   │   ├── StatsOverview.tsx
│   │   │   ├── RecentActivities.tsx
│   │   │   └── HealthChart.tsx
│   │   ├── activity/
│   │   │   ├── ActivityTracker.tsx
│   │   │   ├── ActivityList.tsx
│   │   │   ├── ActivityForm.tsx
│   │   │   ├── ActivityStats.tsx
│   │   │   └── ActivityTypeSelector.tsx
│   │   ├── recommendation/
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── RecommendationList.tsx
│   │   │   ├── RecommendationDetail.tsx
│   │   │   └── SafetyTips.tsx
│   │   ├── profile/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── ProfileEditForm.tsx
│   │   │   ├── AvatarUpload.tsx
│   │   │   └── UserStats.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── common/
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── SuccessNotification.tsx
│   │   │   ├── ErrorNotification.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── Badge.tsx
│   │   └── charts/
│   │       ├── LineChart.tsx
│   │       ├── BarChart.tsx
│   │       ├── PieChart.tsx
│   │       ├── CalorieChart.tsx
│   │       └── ProgressChart.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── userService.ts
│   │   │   ├── activityService.ts
│   │   │   ├── recommendationService.ts
│   │   │   └── apiClient.ts
│   │   └── auth/
│   │       ├── authService.ts
│   │       └── tokenManager.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useUser.ts
│   │   ├── useActivities.ts
│   │   ├── useRecommendations.ts
│   │   ├── useNotification.ts
│   │   └── useForm.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── userStore.ts
│   │   ├── activityStore.ts
│   │   └── notificationStore.ts
│   ├── types/
│   │   ├── models.ts
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── helpers.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── apiProxy.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   └── config/
│       ├── api.config.ts
│       └── auth.config.ts
├── .env.local               # Environment variables
├── tailwind.config.ts       # Tailwind configuration
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── package.json
└── README.md
```
---
## Page Structure & Routing
### Public Pages
#### 1. **Landing Page** (`/`)
- Hero section with application overview
- Feature highlights (User Management, Activity Tracking, AI Recommendations)
- Call-to-action buttons (Login/Register)
- Mobile responsive design
#### 2. **Login Page** (`/auth/login`)
- Email and password input fields
- "Remember me" checkbox
- "Forgot password?" link
- Sign up link
- OAuth integration options
- Form validation and error messages
#### 3. **Register Page** (`/auth/register`)
- First Name, Last Name inputs
- Email input with validation
- Password input with strength indicator
- Confirm password field
- Terms and conditions checkbox
- Login link
- Form validation and error messages
### Protected Pages (Authenticated Users)
#### 4. **Dashboard** (`/dashboard`)
- Welcome message with user's name
- Statistics cards (Total Activities, Total Calories, Streak Days)
- Quick action buttons
- Recent activities list
- Activity summary chart (last 7 days)
- Weekly progress overview
- Motivational messages/achievements
#### 5. **Activities** (`/dashboard/activities`)
- Activity tracking form (inline or modal)
- Selectable activity types (running, cycling, swimming, yoga, etc.)
- Input fields for duration, calories burned, start time
- Additional metrics input
- List of user's activities (paginated, sortable, filterable)
- Activity detail view
- Edit and delete actions
- Export activities as CSV/PDF
#### 6. **Recommendations** (`/dashboard/recommendations`)
- AI-generated recommendations list
- Filter by activity type
- Recommendation cards showing:
  - Activity type
  - Improvements needed
  - Safety tips
  - Suggestions for better performance
- Detailed recommendation view
- Generate new recommendations button
#### 7. **Profile** (`/dashboard/profile`)
- User information display
- Avatar/profile picture
- Edit profile form
- Change password section
- Activity statistics summary
- Member since date
- Account management options
#### 8. **Settings** (`/dashboard/settings`)
- Privacy settings
- Notification preferences
- Theme preferences (light/dark/auto)
- Language selection
- Data export options
- Account deletion option
- Logout button
---
## Component Architecture
### Authentication Components
**LoginForm.tsx**
- Email input with validation
- Password input with show/hide toggle
- Remember me checkbox
- Submit button with loading state
- Error message display
- Link to register page
- DaisyUI: `input`, `checkbox`, `button`, `alert`
**RegisterForm.tsx**
- First name input
- Last name input
- Email input with async validation
- Password input with strength indicator (visual bar)
- Confirm password input
- Terms checkbox
- Submit button with loading state
- Error message display
- Link to login page
- DaisyUI: `input`, `checkbox`, `button`, `progress`, `alert`
**LogoutButton.tsx**
- Dropdown menu with logout option
- Profile preview
- Settings link
- DaisyUI: `dropdown`, `button`
### Dashboard Components
**StatCard.tsx**
- Icon display (Streamline icon)
- Stat value (large text)
- Stat label
- Trend indicator (up/down arrow with percentage)
- Hover effect with shadow
- DaisyUI: `card`
**StatsOverview.tsx**
- Grid layout of multiple stat cards
- Responsive design (1 col mobile, 2 cols tablet, 4 cols desktop)
- Loading skeleton state
- DaisyUI: `grid`, `card`
**RecentActivities.tsx**
- Table of recent activities
- Columns: Activity Type, Duration, Calories, Date/Time
- View detail button
- Edit/Delete actions
- Empty state message
- Loading state
- Pagination
- DaisyUI: `table`, `button`, `pagination`
**HealthChart.tsx**
- Line chart showing activity trends
- X-axis: Days of week
- Y-axis: Calories or activity count
- Interactive tooltip on hover
- Legend
- Responsive sizing
- React-Chartjs-2 + Chart.js
### Activity Components
**ActivityTracker.tsx**
- Activity type selector (dropdown/buttons)
- Duration input (minutes)
- Calories burned input
- Start time picker (date + time)
- Additional metrics input (expandable)
- Submit button with loading state
- Success/error feedback
- DaisyUI: `form`, `input`, `select`, `button`, `alert`
**ActivityList.tsx**
- Filterable list of activities
- Sort options (date, type, calories)
- Activity cards or table view toggle
- Pagination
- Search functionality
- Empty state
- Loading state
- DaisyUI: `select`, `input`, `tabs`, `pagination`
**ActivityForm.tsx**
- Reusable form for creating/editing activities
- Form validation with Zod
- Error messages per field
- Loading state on submit
- Cancel button
- DaisyUI: `form`, `input`, `button`, `alert`
**ActivityStats.tsx**
- Stat boxes (total, this week, this month)
- Activity breakdown by type (pie chart)
- Average metrics (duration, calories)
- Best day/time to exercise
- DaisyUI: `card`, `stat`
**ActivityTypeSelector.tsx**
- Toggle buttons or grid of activity types
- Icon + label for each type
- Selected state highlight
- DaisyUI: `btn-group`, `button`
### Recommendation Components
**RecommendationCard.tsx**
- Activity type icon
- Recommendation type badge
- Snippet of recommendation text
- View details button
- Safety tips preview
- Date created
- DaisyUI: `card`, `badge`, `button`
**RecommendationList.tsx**
- Filterable list of recommendations
- Group by activity type or date
- Search functionality
- Empty state
- Loading state
- DaisyUI: `tabs`, `input`, `card`
**RecommendationDetail.tsx**
- Full recommendation content
- Improvements section (bulleted list)
- Suggestions section (bulleted list)
- Safety tips section (alert boxes)
- Back button
- Share recommendation option
- DaisyUI: `card`, `alert`, `button`
**SafetyTips.tsx**
- Warning/info alert boxes
- List of safety tips
- Icon indicators (warning, info, tip)
- Color-coded by importance
- DaisyUI: `alert`
### Profile Components
**ProfileCard.tsx**
- Avatar image
- User name
- Email address
- Member since date
- Role badge
- Edit button
- DaisyUI: `card`, `avatar`, `badge`, `button`
**ProfileEditForm.tsx**
- First name input
- Last name input
- Email display (read-only)
- Bio/description textarea
- Save button with loading state
- Cancel button
- Validation messages
- DaisyUI: `form`, `input`, `textarea`, `button`, `alert`
**AvatarUpload.tsx**
- Avatar preview
- File upload input
- Upload button with loading state
- Crop/resize functionality (optional)
- Remove avatar button
- DaisyUI: `file-input`, `button`, `avatar`
**UserStats.tsx**
- Total activities count
- Total calories burned
- Longest streak
- Average activity duration
- DaisyUI: `stat`
### Layout Components
**Navbar.tsx**
- Logo and brand name
- Navigation links (Dashboard, Activities, Recommendations, Profile)
- Search bar (optional)
- User dropdown menu
- Mobile menu toggle
- Active route indicator
- DaisyUI: `navbar`, `dropdown`, `menu`
**Sidebar.tsx**
- Logo
- Main navigation links
- Active link highlight
- Collapsible menu items
- User profile mini card at bottom
- Settings and logout links
- Responsive (collapsible on mobile)
- DaisyUI: `menu`, `collapse`
**TopBar.tsx**
- Breadcrumb navigation
- User greeting
- Current time/date
- Notifications bell icon
- Theme toggle button
- DaisyUI: `breadcrumbs`, `badge`
**MobileMenu.tsx**
- Hamburger menu button
- Drawer/offcanvas navigation
- Close button
- Same navigation links as sidebar
- User profile section
- DaisyUI: `drawer`, `menu`
**Footer.tsx**
- Copyright information
- Quick links
- Social media links
- Contact information
- DaisyUI: `footer`
### Common Components
**LoadingSpinner.tsx**
- Centered spinner animation
- Optional loading text
- Overlay option for full page
- DaisyUI: `loading`
**ErrorBoundary.tsx**
- React error boundary wrapper
- Error message display
- Retry button
- Log error functionality
**SuccessNotification.tsx**
- Green alert with success icon
- Message text
- Auto-dismiss after 5 seconds
- Close button
- DaisyUI: `alert`, `alert-success`
**ErrorNotification.tsx**
- Red alert with error icon
- Error message text
- Auto-dismiss or persistent option
- Close button
- DaisyUI: `alert`, `alert-error`
**Modal.tsx**
- Reusable modal wrapper
- Header with close button
- Body content slot
- Footer with action buttons
- Backdrop click to close option
- DaisyUI: `modal`
**ConfirmDialog.tsx**
- Modal with title and message
- Confirm button (primary)
- Cancel button (secondary)
- Optional icon/color coding
- DaisyUI: `modal`, `button`
**Badge.tsx**
- Status badge (Active, Inactive, Completed)
- Color-coded
- Icon + text
- DaisyUI: `badge`
### Chart Components
**LineChart.tsx**
- Generic line chart wrapper
- Props for data, labels, options
- Responsive sizing
- Interactive legend
- Tooltip on hover
- React-Chartjs-2
**BarChart.tsx**
- Generic bar chart wrapper
- Multi-series support
- Color coordination
- Responsive sizing
- Tooltip on hover
- React-Chartjs-2
**PieChart.tsx**
- Generic pie chart wrapper
- Legend display
- Click to filter option
- Responsive sizing
- React-Chartjs-2
**CalorieChart.tsx**
- Specialized chart for calories over time
- Daily or weekly view toggle
- Goal line indicator
- Color coding for above/below goal
- React-Chartjs-2
**ProgressChart.tsx**
- Circular progress indicator
- Percentage display
- Color based on progress level
- Optional label
- DaisyUI: `radial-progress`
---
## Data Models & API Integration
### Type Definitions (`types/models.ts`)
```typescript
// User Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  userRole: UserRole;
  createdAt: string;
  updatedAt: string;
}
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface UserRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface UserLoginRequest {
  email: string;
  password: string;
}
export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
}
// Activity Types
export interface Activity {
  id: string;
  userId: number;
  type: ActivityType;
  duration: number; // in minutes
  caloriesBurned: number;
  startTime: string; // ISO DateTime
  additionalMetrics?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
export enum ActivityType {
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  SWIMMING = 'SWIMMING',
  YOGA = 'YOGA',
  WALKING = 'WALKING',
  GYM = 'GYM',
  SPORTS = 'SPORTS',
  HIKING = 'HIKING',
}
export interface ActivityRequest {
  userId: number;
  type: ActivityType;
  duration: number;
  caloriesBurned: number;
  startTime: string;
  additionalMetrics?: Record<string, any>;
}
export interface ActivityResponse extends Activity {}
// Recommendation Types
export interface Recommendation {
  id: string;
  activityId: string;
  userId: number;
  type: string;
  recommendations: string;
  improvements: string[];
  suggestions: string[];
  safety: string[];
  createdAt: string;
}
export interface RecommendationDto extends Recommendation {}
// API Response Wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}
// Auth Types
export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}
export interface AuthError {
  code: string;
  message: string;
}
```
### API Service Integration (`services/api/`)
**apiClient.ts**
- Axios instance configuration
- Base URL from environment
- Request/response interceptors
- Token attachment to headers
- Error handling
- Retry logic for failed requests
**userService.ts**
```typescript
- getUser(id: number): Promise<ApiResponse<User>>
- createUser(data: UserRegisterRequest): Promise<ApiResponse<string>>
- updateUser(id: number, data: UserUpdateRequest): Promise<ApiResponse<string>>
- deleteUser(id: number): Promise<ApiResponse<string>>
- validateUserById(id: number): Promise<ApiResponse<boolean>>
```
**activityService.ts**
```typescript
- trackActivity(data: ActivityRequest): Promise<ApiResponse<string>>
- getActivity(id: string): Promise<ApiResponse<ActivityResponse>>
- getUserActivities(userId: number): Promise<ApiResponse<Activity[]>>
- updateActivity(id: string, data: Partial<ActivityRequest>): Promise<ApiResponse<string>>
- deleteActivity(id: string): Promise<ApiResponse<string>>
```
**recommendationService.ts**
```typescript
- getUserRecommendations(userId: number): Promise<ApiResponse<Recommendation[]>>
- getActivityRecommendation(activityId: string): Promise<ApiResponse<Recommendation>>
- generateRecommendations(userId: number): Promise<ApiResponse<string>>
```
### Custom Hooks (`hooks/`)
**useAuth.ts**
- `isAuthenticated`: boolean
- `user`: User | null
- `login(email, password)`: Promise
- `register(data)`: Promise
- `logout()`: void
- `isLoading`: boolean
- `error`: string | null
**useUser.ts**
- Query and mutation hooks for user operations
- React Query integration
**useActivities.ts**
- `activities`: Activity[]
- `createActivity(data)`: Promise
- `updateActivity(id, data)`: Promise
- `deleteActivity(id)`: Promise
- `isLoading`: boolean
- `error`: string | null
**useRecommendations.ts**
- `recommendations`: Recommendation[]
- `getRecommendations(userId)`: Promise
- `isLoading`: boolean
- `error`: string | null
**useNotification.ts**
- `showSuccess(message)`: void
- `showError(message)`: void
- `showInfo(message)`: void
- `showWarning(message)`: void
**useForm.ts**
- Wrapper around React Hook Form
- Built-in Zod validation
- Error handling
- Field registration utilities
### State Management (`store/`)
**authStore.ts** (Zustand)
- `user`: User | null
- `token`: string | null
- `isAuthenticated`: boolean
- `setUser(user)`: void
- `setToken(token)`: void
- `logout()`: void
- `hydrate()`: Promise (from localStorage)
**userStore.ts** (Zustand)
- `currentUser`: User | null
- `setCurrentUser(user)`: void
- `updateUserProfile(data)`: void
**activityStore.ts** (Zustand)
- `activities`: Activity[]
- `selectedActivity`: Activity | null
- `setActivities(activities)`: void
- `addActivity(activity)`: void
- `selectActivity(id)`: void
- `clearSelected()`: void
**notificationStore.ts** (Zustand)
- `notifications`: Notification[]
- `addNotification(notification)`: void
- `removeNotification(id)`: void
- `clearAll()`: void
---
## Feature Implementation
### 1. Authentication Flow
- Email/password registration
- Email/password login
- JWT token storage (httpOnly cookie)
- Token refresh mechanism
- OAuth2 integration (optional)
- Password reset (future enhancement)
### 2. Activity Tracking
- Form validation with real-time feedback
- Multiple activity type support
- Bulk activity upload (CSV)
- Activity history with pagination
- Filter by date range, activity type
- Sort by date, calories, duration
- Edit existing activities
- Delete activities with confirmation
- Export activities as CSV
### 3. AI Recommendations
- Fetch personalized recommendations
- Display recommendations by category
- Safety tips highlighting
- Performance improvement suggestions
- Share recommendations (social, email)
- Favorite/bookmark recommendations
### 4. User Profile Management
- View and edit profile information
- Avatar upload and management
- View activity statistics
- Privacy settings
- Data export options
- Account deletion with confirmation
### 5. Dashboard & Analytics
- Overview statistics (cards)
- Activity trends (line chart - 7/30 days)
- Activity breakdown by type (pie chart)
- Calorie burn analytics
- Streak tracking
- Achievement badges (future)
- Weekly goals progress
### 6. Responsive Design
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements
- Touch-friendly interactions
- Collapsible navigation
- Responsive tables/lists
### 7. Performance Optimization
- Image lazy loading
- Code splitting by route
- Caching strategies (React Query)
- Memoization of components
- Optimized re-renders
- Service worker for offline support (future)
### 8. Accessibility
- ARIA labels and roles
- Keyboard navigation
- Color contrast compliance
- Form field associations
- Error announcements
- Focus management
### 9. Error Handling
- API error display with user-friendly messages
- Form validation errors
- Network error handling
- 404 and 500 error pages
- Retry mechanisms
- Error boundary for React crashes
### 10. Loading States
- Skeleton screens for data loading
- Button loading states
- Full-page loading for navigation
- Optimistic updates for forms
- Progress indicators
---
## ChatGPT Prompts
Use these detailed prompts to generate codebase from ChatGPT. Modify them as needed based on progress.
### Prompt 1: Project Setup and Configuration
```
Create a complete Next.js 15 TypeScript project structure for a fitness tracking application with the following specifications:
1. Initialize Next.js with App Router (not Pages Router)
2. Install and configure:
   - TailwindCSS for styling
   - DaisyUI for component library
   - React Query for server state management
   - Zustand for client state management
   - Next-Auth.js for authentication
   - Axios for API calls
   - React Hook Form for form management
   - Zod for schema validation
   - Chart.js and react-chartjs-2 for data visualization
   - Streamline Icons integration
3. Create the directory structure as shown in the design document (System Architecture section)
4. Configure:
   - tailwind.config.ts with custom color theme (primary: #0066CC, secondary: #00A896, success: #2DBA4E, warning: #FF9500, danger: #E63946)
   - next.config.ts for image optimization and environment variables
   - tsconfig.json for path aliases (@/components, @/services, etc.)
   - .env.local template with API_BASE_URL, NEXT_PUBLIC_APP_URL variables
5. Set up TypeScript types:
   - types/models.ts with User, Activity, Recommendation, ActivityType enums
   - types/api.ts with ApiResponse wrapper
   - types/auth.ts with authentication types
6. Create utility files:
   - utils/constants.ts with API endpoints, activity types, colors
   - utils/formatters.ts with date/time, calorie formatting functions
   - utils/validators.ts with custom validation rules
   - utils/helpers.ts with utility functions
7. Create middleware:
   - middleware.ts for auth checks on protected routes
   - Create an error boundary component
8. Set up global styling:
   - styles/globals.css with Tailwind directives and custom variables
   - styles/variables.css with CSS custom properties
Generate all configuration files and boilerplate code with proper TypeScript types and error handling.
```
### Prompt 2: Authentication System
```
Create a complete authentication system for the fitness application with:
1. Authentication Pages:
   - /app/auth/login/page.tsx - Login form page with email, password inputs
   - /app/auth/register/page.tsx - Registration form with first name, last name, email, password, confirm password
   - Create auth/layout.tsx for unauthenticated layout
2. Authentication Components:
   - components/auth/LoginForm.tsx with:
     * Email input with validation
     * Password input with show/hide toggle
     * Remember me checkbox
     * Submit button with loading state
     * Error message display
     * Link to register page
     * Use React Hook Form + Zod validation
     * Use DaisyUI components (input, checkbox, button, alert)
   - components/auth/RegisterForm.tsx with:
     * First name and last name inputs
     * Email input with async email validation
     * Password input with strength indicator visual
     * Confirm password field with match validation
     * Terms checkbox (required)
     * Submit button with loading state
     * Use React Hook Form + Zod validation
     * Use DaisyUI components
   - components/auth/LogoutButton.tsx with dropdown menu
3. Authentication Services:
   - services/api/authService.ts with:
     * login(email: string, password: string): Promise<AuthSession>
     * register(data: UserRegisterRequest): Promise<AuthSession>
     * logout(): void
     * getCurrentSession(): AuthSession | null
     * refreshToken(): Promise<string>
   - services/auth/tokenManager.ts with:
     * storeToken(token: string): void
     * getToken(): string | null
     * removeToken(): void
     * isTokenExpired(): boolean
4. Authentication Hooks:
   - hooks/useAuth.ts with:
     * isAuthenticated boolean
     * user: User | null
     * login(email, password) async function
     * register(data) async function
     * logout() function
     * isLoading state
     * error state
5. State Management:
   - store/authStore.ts (Zustand) with:
     * user state
     * token state
     * setUser and setToken actions
     * logout action
     * hydrate function to restore from localStorage
6. Middleware:
   - middleware.ts that:
     * Checks authentication on protected routes
     * Redirects to login if not authenticated
     * Redirects to dashboard if already logged in (from login/register pages)
7. API Integration:
   - services/api/apiClient.ts (Axios instance) with:
     * Base URL configuration
     * Request interceptor to add token to headers
     * Response interceptor for error handling
     * Automatic token refresh on 401
Generate all files with proper error handling, TypeScript types, and user feedback using DaisyUI components.
```
### Prompt 3: API Services and Data Layer
```
Create comprehensive API service layer for the fitness application:
1. API Client Configuration (services/api/apiClient.ts):
   - Axios instance with:
     * Base URL from environment variable (API_BASE_URL)
     * Request timeout (30 seconds)
     * Request interceptor to attach JWT token
     * Response interceptor for error handling
     * Retry logic for failed requests
     * Type-safe request/response handling
2. User Service (services/api/userService.ts):
   - getUser(id: number): Promise<ApiResponse<User>>
   - createUser(data: UserRegisterRequest): Promise<ApiResponse<string>>
   - updateUser(id: number, data: UserUpdateRequest): Promise<ApiResponse<string>>
   - deleteUser(id: number): Promise<ApiResponse<string>>
   - validateUserById(id: number): Promise<ApiResponse<boolean>>
   - getAllUsers(): Promise<ApiResponse<User[]>>
   - Error handling with proper messages
3. Activity Service (services/api/activityService.ts):
   - trackActivity(data: ActivityRequest): Promise<ApiResponse<string>>
   - getActivity(id: string): Promise<ApiResponse<ActivityResponse>>
   - getUserActivities(userId: number, page?: number, limit?: number): Promise<ApiResponse<Activity[]>>
   - getActivitiesByType(userId: number, type: ActivityType): Promise<ApiResponse<Activity[]>>
   - updateActivity(id: string, data: Partial<ActivityRequest>): Promise<ApiResponse<string>>
   - deleteActivity(id: string): Promise<ApiResponse<string>>
   - getActivityStats(userId: number, days?: number): Promise<ApiResponse<ActivityStats>>
   - Error handling with specific error messages
4. Recommendation Service (services/api/recommendationService.ts):
   - getUserRecommendations(userId: number): Promise<ApiResponse<Recommendation[]>>
   - getActivityRecommendation(activityId: string): Promise<ApiResponse<Recommendation>>
   - getRecommendationsByType(userId: number, type: string): Promise<ApiResponse<Recommendation[]>>
   - generateNewRecommendations(userId: number): Promise<ApiResponse<string>>
   - Error handling with proper messages
5. Custom React Query Hooks (hooks/):
   - hooks/useUser.ts with useGetUser, useUpdateUser, useDeleteUser queries/mutations
   - hooks/useActivities.ts with useGetActivities, useCreateActivity, useUpdateActivity, useDeleteActivity
   - hooks/useRecommendations.ts with useGetRecommendations, useGetActivityRecommendation
   - All hooks should use React Query for caching and synchronization
   - Include error handling and loading states
6. Type Definitions (types/models.ts):
   - Complete TypeScript interfaces for User, Activity, Recommendation
   - ActivityType enum with all activity types
   - ApiResponse generic wrapper
   - Request/Response DTOs
Generate all files with proper error handling, type safety, and React Query integration patterns.
```
### Prompt 4: Core Layout Components
```
Create the main layout components for the fitness application dashboard:
1. Navbar Component (components/layout/Navbar.tsx):
   - Header with logo and brand name
   - Navigation links: Dashboard, Activities, Recommendations, Profile
   - Search bar (optional)
   - User profile dropdown menu
   - Mobile menu toggle button
   - Active route indicator
   - Use DaisyUI navbar, dropdown, menu components
   - Responsive design
2. Sidebar Component (components/layout/Sidebar.tsx):
   - Logo/brand section
   - Main navigation menu with icons
   - Active link highlighting
   - Collapsible submenu items
   - User profile card at bottom with avatar and name
   - Settings and logout links
   - Collapse/expand toggle
   - Mobile: Convert to drawer
   - Use DaisyUI menu, collapse components
3. TopBar Component (components/layout/TopBar.tsx):
   - Breadcrumb navigation showing current page
   - User greeting with current time
   - Notification bell icon (placeholder)
   - Theme toggle button (light/dark)
   - Use DaisyUI breadcrumbs, badge components
4. MobileMenu Component (components/layout/MobileMenu.tsx):
   - Hamburger menu toggle button
   - Drawer/offcanvas navigation menu
   - Same navigation links as sidebar
   - User profile section
   - Close button
   - Use DaisyUI drawer component
5. Footer Component (components/layout/Footer.tsx):
   - Copyright information
   - Quick links
   - Social media links (optional)
   - Contact information
   - Use DaisyUI footer component
6. Dashboard Layout (app/(dashboard)/layout.tsx):
   - Combine Navbar, Sidebar, TopBar, MobileMenu
   - Main content area with padding
   - Footer at bottom
   - Responsive grid layout
   - Mobile: Stack vertically, use drawer for sidebar
7. Landing Page Layout (app/layout.tsx):
   - Simple navbar without dashboard links
   - Simplified footer
   - Main content slot
8. Auth Layout (app/(auth)/layout.tsx):
   - Centered form container
   - Minimal navbar (logo + login/register links)
   - Background gradient or pattern
   - Footer
Generate all components with:
- DaisyUI components for styling
- Streamline icons for icons
- TypeScript types
- Mobile responsiveness
- Active route detection using usePathname()
- Logout functionality
```
### Prompt 5: Dashboard Overview Page
```
Create the main dashboard/home page and its components:
1. Dashboard Page (app/(dashboard)/dashboard/page.tsx):
   - Welcome section with user's name
   - Statistics cards overview
   - Recent activities section
   - Weekly activity chart
   - Quick action buttons
   - Activity breakdown chart
   - Motivational messages/achievements
2. StatCard Component (components/dashboard/StatCard.tsx):
   - Streamline icon display
   - Large stat number
   - Stat label
   - Trend indicator (arrow + percentage)
   - Hover shadow effect
   - Customizable colors
   - DaisyUI card component
3. StatsOverview Component (components/dashboard/StatsOverview.tsx):
   - Grid layout of 4 stat cards:
     * Total Activities
     * Total Calories Burned
     * Current Streak Days
     * Average Activity Duration
   - Responsive grid (1 col mobile, 2 cols tablet, 4 cols desktop)
   - Loading skeleton state
   - Error handling
4. RecentActivities Component (components/dashboard/RecentActivities.tsx):
   - Table of recent user activities (last 10)
   - Columns: Activity Type (with icon), Duration, Calories, Date/Time, Actions
   - View detail button
   - Edit and Delete actions with confirm dialog
   - Empty state message when no activities
   - Loading state with skeleton
   - Pagination (5 items per page)
   - DaisyUI table, button, pagination components
5. HealthChart Component (components/dashboard/HealthChart.tsx):
   - Line chart showing activity trends
   - X-axis: Days of last 7 days
   - Y-axis: Calories burned
   - Display data points and values
   - Interactive tooltip on hover
   - Legend
   - Responsive sizing
   - Use react-chartjs-2 and Chart.js
6. ActivityBreakdownChart Component (components/dashboard/ActivityBreakdownChart.tsx):
   - Pie chart showing activities by type
   - Display activity counts or percentages
   - Legend with colors
   - Interactive tooltip
   - Click slices to filter (optional)
   - Use react-chartjs-2 and Chart.js
7. QuickActions Component (components/dashboard/QuickActions.tsx):
   - "Track New Activity" button
   - "View Recommendations" button
   - "Edit Profile" button
   - Large button cards with icons
   - Navigation on click
8. Dashboard Data Integration:
   - Use useActivities hook to fetch user's activities
   - Use useRecommendations hook for recommendation count
   - Use React Query for caching and automatic refetching
   - Show loading states with skeletons
   - Error handling with retry button
Generate all components with:
- TypeScript types
- React Query integration
- DaisyUI components
- Streamline icons
- Responsive design
- Loading and error states
- Empty states
```
### Prompt 6: Activity Tracking Pages
```
Create the activity tracking and management pages:
1. Activities List Page (app/(dashboard)/activities/page.tsx):
   - Page header with title
   - "Track New Activity" button
   - Filter and sort controls
   - Activities list/table view
   - Empty state when no activities
   - Loading state
2. ActivityTracker Component (components/activity/ActivityTracker.tsx):
   - Modal or inline form for tracking new activity
   - Activity type selector (dropdown or button group)
   - Duration input (minutes) with number input
   - Calories burned input with number input
   - Start time picker (date + time)
   - Additional metrics section (expandable)
   - Submit button with loading state
   - Cancel button
   - Success/error feedback using toast notifications
   - React Hook Form + Zod validation
   - DaisyUI form, input, select, button, modal components
3. ActivityTypeSelector Component (components/activity/ActivityTypeSelector.tsx):
   - Grid or button group of activity types
   - Icons for each type (Streamline icons):
     * Running - person running icon
     * Cycling - bicycle icon
     * Swimming - swimmer icon
     * Yoga - yoga pose icon
     * Walking - walking icon
     * Gym - dumbbell icon
     * Sports - sports icon
     * Hiking - mountain icon
   - Selected state highlight
   - Labels below/beside icons
   - DaisyUI btn-group and button components
4. ActivityList Component (components/activity/ActivityList.tsx):
   - Display user's activities in list/table format
   - Columns: Activity Type (icon + name), Duration (minutes), Calories, Date/Time, Actions
   - Sort controls: By Date, By Calories, By Duration
   - Filter controls: By Activity Type, By Date Range
   - Search input to filter by note/description
   - Pagination (10 items per page)
   - View detail, Edit, Delete actions for each
   - Empty state: "No activities yet. Track your first activity!"
   - Loading state with skeleton rows
   - DaisyUI table, input, select, pagination, button components
5. ActivityForm Component (components/activity/ActivityForm.tsx):
   - Reusable form for creating and editing activities
   - All fields from ActivityRequest DTO
   - Activity type as dropdown with all types
   - Duration as number input (1-1000 minutes)
   - Calories as number input (1-5000)
   - Start time as datetime input
   - Additional metrics as JSON textarea (optional)
   - Form validation with Zod schema
   - Error messages per field
   - Loading state on submit
   - Cancel button to close
   - Integration with useActivities hook
   - DaisyUI form components
6. ActivityStats Component (components/activity/ActivityStats.tsx):
   - Statistics grid showing:
     * Total activities count
     * Total activities this week
     * Total activities this month
     * Average duration per activity
     * Total calories burned (all time)
     * Total calories (this week)
     * Most active day
     * Favorite activity type
   - Use stat cards with icons
   - Calculate stats from activities array
   - Update in real-time
   - DaisyUI stat component
7. Activity Detail Modal (components/activity/ActivityDetailModal.tsx):
   - Show full activity details
   - All activity fields
   - Edit button to open edit form
   - Delete button with confirm dialog
   - Close button
   - Related recommendation if available
   - DaisyUI modal, button, alert components
8. Data Integration:
   - Use useActivities hook for all data
   - Use React Query mutations for create/update/delete
   - Show loading states during operations
   - Show error messages with retry
   - Optimistic updates
   - Refetch activities after operations
Generate all components with:
- TypeScript types
- React Hook Form + Zod validation
- React Query integration
- DaisyUI components
- Streamline icons
- Responsive design
- Loading and error states
- User feedback with notifications
```
### Prompt 7: Recommendations Pages
```
Create the AI recommendations display pages:
1. Recommendations List Page (app/(dashboard)/recommendations/page.tsx):
   - Page header "AI Recommendations"
   - "Generate New Recommendations" button
   - Filter controls (by activity type, by date range)
   - Recommendations list/grid
   - Empty state when no recommendations
   - Loading state
2. RecommendationCard Component (components/recommendation/RecommendationCard.tsx):
   - Compact card showing recommendation summary
   - Activity type icon and name
   - Recommendation type badge (color-coded)
   - Snippet of main recommendation (truncated text)
   - Number of improvements/suggestions/safety tips (as badges)
   - "View Details" button
   - Date created
   - Favorite/bookmark button (optional)
   - DaisyUI card, badge, button components
3. RecommendationList Component (components/recommendation/RecommendationList.tsx):
   - Grid layout of recommendation cards (responsive)
   - Filters:
     * By activity type dropdown
     * By date range (last week, last month, all time)
   - Search input to filter by content
   - Sort options: Newest, Oldest, Activity Type
   - Pagination (6-9 items per page)
   - Empty state: "No recommendations yet. Track activities to get recommendations!"
   - Loading state with skeleton cards
   - DaisyUI components
4. RecommendationDetail Component (components/recommendation/RecommendationDetail.tsx):
   - Full-page or modal view of single recommendation
   - Header with activity type, date, type badge
   - Main recommendation section
   - Improvements section:
     * Bulleted list of improvements
     * Each as separate item
   - Suggestions section:
     * Bulleted list of performance suggestions
   - Safety Tips section:
     * Alert boxes for each safety tip
     * Color-coded by importance
   - Related activity link
   - Back button
   - Share button (email, copy link)
   - Print button
   - DaisyUI components, alert
5. SafetyTips Component (components/recommendation/SafetyTips.tsx):
   - Display list of safety tips
   - Each tip in alert box
   - Color coding:
     * Red alert for critical safety
     * Orange alert for warnings
     * Blue alert for tips
   - Icon + text for each
   - Use alert-error, alert-warning, alert-info
   - DaisyUI alert components
6. RecommendationDetail Page (app/(dashboard)/recommendations/[id]/page.tsx):
   - Fetch single recommendation by ID
   - Display RecommendationDetail component
   - Show loading state
   - Handle not found error
   - Back navigation
7. Generate Recommendations Button:
   - Trigger API call to generate new recommendations
   - Show loading spinner during generation
   - Show success toast when complete
   - Refetch recommendations list
   - Show error toast if failed
   - Confirmation dialog before generation
8. Data Integration:
   - Use useRecommendations hook for fetching
   - Handle different recommendation types
   - Display improvements, suggestions, and safety tips
   - Link recommendations to activities
   - Show activity details inline (optional)
Generate all components with:
- TypeScript types
- React Query integration
- DaisyUI components
- Streamline icons
- Responsive design
- Loading and error states
- Empty states
- User feedback
```
### Prompt 8: User Profile Pages
```
Create the user profile and settings pages:
1. Profile Page (app/(dashboard)/profile/page.tsx):
   - Header with "My Profile"
   - Profile information section
   - Activity statistics section
   - Action buttons (Edit Profile, Change Password)
   - Page layout with sections
2. ProfileCard Component (components/profile/ProfileCard.tsx):
   - Avatar image display
   - User's full name (large)
   - Email address
   - Member since date (formatted)
   - Role badge (USER, ADMIN)
   - Edit profile button
   - DaisyUI card, avatar, badge, button components
3. ProfileEditForm Component (components/profile/ProfileEditForm.tsx):
   - Modal or side panel form for editing profile
   - First name input (required, max 50 chars)
   - Last name input (required, max 50 chars)
   - Email display (read-only, cannot change)
   - Bio/description textarea (optional, max 500 chars)
   - Save button with loading state
   - Cancel button
   - Form validation with Zod
   - Error messages per field
   - Success message on save
   - Optimistic update
   - React Hook Form + Zod validation
   - DaisyUI form components
4. AvatarUpload Component (components/profile/AvatarUpload.tsx):
   - Avatar preview image
   - File input for uploading new avatar
   - Upload button with loading state
   - Current avatar with delete option
   - Image size restrictions (max 5MB)
   - Supported formats: JPG, PNG, WebP
   - Preview before upload
   - Delete button to remove current avatar
   - DaisyUI file-input, button, avatar components
5. UserStats Component (components/profile/UserStats.tsx):
   - Statistics display grid:
     * Total activities count
     * Total calories burned
     * Current activity streak (days)
     * Average activity duration (minutes)
     * Member for (days/months)
   - Use stat cards
   - Display with icons
   - DaisyUI stat component
6. ChangePasswordSection Component (components/profile/ChangePasswordSection.tsx):
   - Current password input (required)
   - New password input (required)
   - Confirm password input (required)
   - Password strength indicator
   - Show/hide password toggles
   - Submit button with loading state
   - Validation:
     * New password different from current
     * Passwords match
     * Min 8 chars, uppercase, lowercase, number, special char
   - Success/error feedback
   - React Hook Form + Zod validation
   - DaisyUI form components
7. Settings Page (app/(dashboard)/settings/page.tsx):
   - Privacy settings section
   - Notification preferences section
   - Theme preferences section
   - Language selection section
   - Data export section
   - Account deletion section
8. PrivacySettings Component (components/settings/PrivacySettings.tsx):
   - Make profile public/private toggle
   - Share activity history toggle
   - Allow recommendations sharing toggle
   - Save button
   - DaisyUI toggle, button components
9. NotificationSettings Component (components/settings/NotificationSettings.tsx):
   - Email notifications toggle
   - Daily summary toggle
   - Activity reminders toggle
   - Recommendation notifications toggle
   - Save button
   - DaisyUI toggle, button components
10. ThemeSettings Component (components/settings/ThemeSettings.tsx):
    - Theme selector: Light, Dark, Auto
    - Preview of each theme
    - Save selection
    - Apply immediately
    - DaisyUI button-group, select components
11. DataExport Component (components/settings/DataExport.tsx):
    - Export activities as CSV button
    - Export activities as JSON button
    - Export all data button
    - Export as PDF button (optional)
    - Show loading state during export
    - Success message
    - DaisyUI button components
12. AccountDeletion Component (components/settings/AccountDeletion.tsx):
    - Warning alert about irreversible action
    - Reason for deletion dropdown (optional)
    - Confirmation checkbox: "I understand this is permanent"
    - Delete account button (red/danger button)
    - Confirm dialog with warning
    - On confirm, logout and redirect to home
    - DaisyUI alert, checkbox, button components
Generate all components with:
- TypeScript types
- React Query mutations for API calls
- React Hook Form + Zod validation
- DaisyUI components
- Streamline icons
- Responsive design
- Loading and error states
- User feedback with notifications
- Confirmation dialogs for destructive actions
```
### Prompt 9: Common UI Components
```
Create reusable common UI components:
1. LoadingSpinner Component (components/common/LoadingSpinner.tsx):
   - Centered animation spinner
   - Optional loading text below spinner
   - Full page overlay option (for navigation)
   - Customizable size and color
   - DaisyUI loading component
2. ErrorBoundary Component (components/common/ErrorBoundary.tsx):
   - React error boundary wrapper
   - Error message display
   - Stack trace in development only
   - Retry button to reset boundary
   - Log error functionality
   - User-friendly error message
   - DaisyUI alert-error component
3. SuccessNotification Component (components/common/SuccessNotification.tsx):
   - Green alert box
   - Success icon (checkmark)
   - Message text
   - Auto-dismiss after 5 seconds
   - Manual close button
   - Toast-style positioning (top-right)
   - DaisyUI alert, alert-success components
4. ErrorNotification Component (components/common/ErrorNotification.tsx):
   - Red alert box
   - Error icon (X or exclamation)
   - Error message text
   - Optional error details/code
   - Manual close button (required)
   - Toast-style positioning (top-right)
   - Persistent by default
   - DaisyUI alert, alert-error components
5. WarningNotification Component (components/common/WarningNotification.tsx):
   - Orange/yellow alert box
   - Warning icon
   - Message text
   - Close button
   - Toast-style positioning
   - DaisyUI alert, alert-warning components
6. InfoNotification Component (components/common/InfoNotification.tsx):
   - Blue alert box
   - Info icon
   - Message text
   - Close button
   - Toast-style positioning
   - DaisyUI alert, alert-info components
7. Modal Component (components/common/Modal.tsx):
   - Reusable modal wrapper
   - Props for title, size (sm, md, lg, xl)
   - Header with title and close button
   - Body content slot
   - Footer with action buttons
   - Backdrop click to close option
   - Keyboard escape to close
   - Focus trap
   - DaisyUI modal component
8. ConfirmDialog Component (components/common/ConfirmDialog.tsx):
   - Modal with confirm/cancel buttons
   - Customizable title and message
   - Optional icon (question, warning, danger)
   - Confirm button text and color
   - Cancel button text
   - Size options
   - Auto-focus to cancel on open
   - DaisyUI modal, button components
9. Badge Component (components/common/Badge.tsx):
   - Status badge display
   - Variants: Active, Inactive, Completed, Pending
   - Color-coded by status
   - Optional icon + text
   - Small, normal, large sizes
   - DaisyUI badge component
10. Tooltip Component (components/common/Tooltip.tsx):
    - Hoverable tooltip
    - Position options: top, bottom, left, right
    - Custom content
    - Delay on hover
    - DaisyUI tooltip component
11. EmptyState Component (components/common/EmptyState.tsx):
    - Large icon/illustration
    - Title text
    - Description text
    - Optional action button
    - Centered layout
    - Customizable per page
12. PageHeader Component (components/common/PageHeader.tsx):
    - Page title
    - Optional breadcrumbs
    - Optional description
    - Optional action buttons on right
    - DaisyUI components
13. Card Component (components/common/Card.tsx):
    - Generic card wrapper
    - Header section (optional)
    - Body content
    - Footer section (optional)
    - Hover effects
    - DaisyUI card component
14. DataTable Component (components/common/DataTable.tsx):
    - Generic reusable table
    - Sortable columns
    - Pagination
    - Row actions
    - Empty state
    - Loading state
    - DaisyUI table, pagination components
Generate all components with:
- TypeScript props interface
- DaisyUI components
- Streamline icons
- Responsive design
- Accessibility features (ARIA labels)
- Customization props
- Proper error handling
```
### Prompt 10: Chart and Visualization Components
```
Create data visualization components for analytics:
1. LineChart Component (components/charts/LineChart.tsx):
   - Generic line chart wrapper
   - Props for:
     * data: array of data points
     * labels: x-axis labels
     * title: chart title
     * options: chart.js options
   - Responsive sizing
   - Interactive legend
   - Tooltip on hover
   - Color customization
   - react-chartjs-2 and Chart.js
2. BarChart Component (components/charts/BarChart.tsx):
   - Generic bar chart wrapper
   - Multi-series support
   - Props for data, labels, title, options
   - Color coordination
   - Responsive sizing
   - Tooltip on hover
   - react-chartjs-2 and Chart.js
3. PieChart Component (components/charts/PieChart.tsx):
   - Generic pie chart wrapper
   - Props for data, labels, title, options
   - Legend display (top, bottom, left, right)
   - Click to filter functionality (optional)
   - Responsive sizing
   - react-chartjs-2 and Chart.js
4. CalorieChart Component (components/charts/CalorieChart.tsx):
   - Specialized chart for calories over time
   - Props for:
     * period: 'daily', 'weekly', 'monthly'
     * days: number of days to show
     * userId: to fetch data
   - Daily or weekly view toggle
   - Goal line indicator (colored)
   - Color coding: green for above goal, orange for below
   - Data labels on bars
   - react-chartjs-2 and Chart.js
5. ProgressChart Component (components/charts/ProgressChart.tsx):
   - Circular progress indicator
   - Props:
     * percentage: 0-100
     * label: text label
     * size: 'sm', 'md', 'lg'
     * color: custom color
   - Percentage text in center
   - Color based on progress level:
     * 0-33%: Red
     * 34-66%: Orange
     * 67-100%: Green
   - Optional subtext
   - DaisyUI radial-progress component
6. ActivityTrendChart Component (components/charts/ActivityTrendChart.tsx):
   - Line chart showing activity trends
   - Props:
     * userId
     * days: 7, 14, 30
   - X-axis: dates
   - Y-axis: activity count or calories
   - Multiple series (optional)
   - Legend
   - Responsive
7. ActivityDistributionChart Component (components/charts/ActivityDistributionChart.tsx):
   - Pie chart of activities by type
   - Props:
     * userId
   - Shows activity count per type
   - Legend with activity type icons
   - Responsive
   - Click to filter
8. StatisticsCard Component (components/charts/StatisticsCard.tsx):
   - Card wrapper for statistics
   - Icon + label + value layout
   - Optional trend indicator
   - Optional small chart inside
   - DaisyUI card component
Generate all components with:
- TypeScript types for props
- react-chartjs-2 and Chart.js integration
- Responsive design
- Custom color configuration
- Loading and error states
- Data validation
- Accessibility features
```
### Prompt 11: Form Components and Validation
```
Create custom form components and validation utilities:
1. Custom Form Hook (hooks/useForm.ts):
   - Wrapper around React Hook Form + Zod
   - Props:
     * schema: Zod schema
     * onSubmit: async callback
     * defaultValues: form defaults
   - Returns:
     * form methods (register, handleSubmit, formState)
     * isSubmitting state
     * onSubmit handler with loading state
     * Reset function
2. TextInput Component (components/forms/TextInput.tsx):
   - Controlled input component
   - Props: label, name, error, type, placeholder, required, disabled
   - Error message display
   - Input type: text, email, password, number
   - Show/hide password toggle for password type
   - DaisyUI input, label components
   - Integration with React Hook Form
3. TextArea Component (components/forms/TextArea.tsx):
   - Textarea input component
   - Props: label, name, error, placeholder, rows, required, disabled
   - Error message display
   - Character count display (optional)
   - DaisyUI textarea, label components
   - Integration with React Hook Form
4. SelectInput Component (components/forms/SelectInput.tsx):
   - Dropdown select component
   - Props: label, name, error, options, required, disabled, multiple
   - Options can be array of strings or {label, value} objects
   - Error message display
   - Placeholder option
   - DaisyUI select, label components
   - Integration with React Hook Form
5. DateInput Component (components/forms/DateInput.tsx):
   - Date picker input
   - Props: label, name, error, minDate, maxDate, required, disabled
   - Browser native date picker
   - Error message display
   - DaisyUI input, label components
   - Integration with React Hook Form
6. DateTimeInput Component (components/forms/DateTimeInput.tsx):
   - DateTime picker input
   - Props: label, name, error, minDateTime, maxDateTime, required, disabled
   - Browser native datetime-local input
   - Error message display
   - DaisyUI input, label components
7. Checkbox Component (components/forms/Checkbox.tsx):
   - Checkbox input component
   - Props: label, name, error, required, disabled, help
   - Error message display
   - Helper text display
   - DaisyUI checkbox, label components
   - Integration with React Hook Form
8. RadioGroup Component (components/forms/RadioGroup.tsx):
   - Radio button group
   - Props: label, name, error, options, required, disabled
   - Options: array of {label, value}
   - Error message display
   - DaisyUI radio, label components
   - Integration with React Hook Form
9. FileInput Component (components/forms/FileInput.tsx):
   - File upload input
   - Props: label, name, error, accept, maxSize, multiple, required, disabled
   - File size validation
   - File type validation
   - Preview for images
   - Clear file button
   - Error message display
   - DaisyUI file-input, label components
10. FormGroup Component (components/forms/FormGroup.tsx):
    - Wrapper for form inputs
    - Props: children, label, error, required, help
    - Consistent styling
    - Error and help text display
    - Label display
    - DaisyUI components
11. FormBuilder Component (components/forms/FormBuilder.tsx):
    - Dynamic form generator from schema
    - Props: schema, onSubmit, submitLabel, cancelLabel
    - Renders form fields based on schema
    - Handles validation
    - Submit and cancel buttons
    - Loading state
12. Validation Utilities (utils/validators.ts):
    - Custom Zod validators:
      * passwordValidator: strong password requirements
      * emailValidator: email format
      * phoneValidator: phone number format
      * urlValidator: URL format
      * fileValidator: file type and size
13. Form Schemas (utils/formSchemas.ts):
    - Zod schemas for:
      * User registration
      * User login
      * Profile update
      * Password change
      * Activity tracking
      * Recommendation filters
Generate all components with:
- React Hook Form integration
- Zod validation
- TypeScript types
- DaisyUI components
- Streamline icons
- Error handling and display
- Loading states
- Accessibility features (ARIA labels)
```
### Prompt 12: API Proxy and Middleware
```
Create API proxy routes and middleware:
1. API Proxy Route (app/api/[...route]/route.ts):
   - Catch-all route to proxy requests to backend
   - Base path: /api/users, /api/activities, /api/recommendation
   - Methods: GET, POST, PUT, DELETE
   - Attach JWT token from cookies to headers
   - Handle CORS
   - Error handling with proper status codes
   - Rate limiting (optional)
   - Logging
2. Auth Middleware (middleware.ts):
   - Check authentication on protected routes
   - Redirect to login if not authenticated
   - Redirect to dashboard if already logged in from login/register
   - Attach user info to request (optional)
   - Token validation
3. Error Handling Middleware:
   - Global error handling
   - Convert API errors to user-friendly messages
   - Log errors to console/service
   - Return appropriate status codes
4. Request Logger Middleware:
   - Log all API requests
   - Log request method, URL, status code
   - Log response time
   - Log errors with stack trace
5. Rate Limiter Middleware (optional):
   - Rate limit API requests
   - Per-user rate limiting
   - Return 429 status on exceed
Generate all middleware with:
- TypeScript types
- Proper error handling
- Security best practices
- Logging
- Environment-based configuration
```
### Prompt 13: Testing and Documentation
```
Create comprehensive testing suite and documentation:
1. Unit Tests:
   - Test authentication functions
   - Test API client functions
   - Test validation functions
   - Test utility functions
   - Using Jest and React Testing Library
2. Component Tests:
   - Test form components with various inputs
   - Test dashboard components with mock data
   - Test error states and loading states
   - Test user interactions
   - Using Jest and React Testing Library
3. Integration Tests:
   - Test complete authentication flow
   - Test activity tracking flow
   - Test recommendation fetching
   - Using Jest and React Testing Library
4. E2E Tests:
   - Test user registration flow
   - Test login and dashboard access
   - Test activity tracking
   - Using Playwright or Cypress
5. API Documentation:
   - Document all API endpoints
   - Request/response examples
   - Error codes and messages
   - Authentication requirements
6. Component Documentation:
   - Storybook setup
   - Component props documentation
   - Component usage examples
   - Component stories
Generate all test files and documentation with:
- Jest configuration
- React Testing Library utilities
- Mock data and fixtures
- Test coverage reports
```
### Prompt 14: Deployment and Production
```
Create production deployment configuration:
1. Environment Configuration:
   - .env.production variables
   - API endpoints
   - Authentication configuration
   - Feature flags
   - Analytics configuration
2. Build Optimization:
   - next.config.ts production settings
   - Image optimization configuration
   - Bundle analysis
   - Code splitting configuration
3. Performance Optimization:
   - Image lazy loading
   - Code splitting by route
   - Dynamic imports
   - Caching strategies
   - Service worker setup
4. Security Configuration:
   - CORS settings
   - CSP headers
   - HTTPS enforcement
   - Secure cookie configuration
   - XSS protection
5. Monitoring and Analytics:
   - Error tracking (Sentry)
   - Analytics setup (Google Analytics)
   - Performance monitoring
   - User behavior tracking
6. CI/CD Pipeline:
   - GitHub Actions workflow
   - Build steps
   - Test steps
   - Deploy steps
   - Environment promotions
Generate all configuration files and scripts with:
- Production best practices
- Security measures
- Performance optimization
- Scalability considerations
```
---
## Implementation Timeline
### Phase 1: Setup (Week 1)
- [ ] Project initialization and configuration
- [ ] Environment setup
- [ ] Theme and styling setup
- [ ] Folder structure creation
### Phase 2: Authentication (Week 2)
- [ ] Auth pages (login, register)
- [ ] Auth components
- [ ] Auth services and hooks
- [ ] State management
- [ ] Middleware
### Phase 3: Core Layout (Week 2-3)
- [ ] Navbar and Sidebar
- [ ] Responsive layout
- [ ] Theme toggle
- [ ] Navigation
### Phase 4: Dashboard (Week 3)
- [ ] Dashboard overview page
- [ ] Statistics cards
- [ ] Charts and analytics
- [ ] Recent activities
### Phase 5: Activity Management (Week 4)
- [ ] Activity tracking form
- [ ] Activity list page
- [ ] Activity details
- [ ] CRUD operations
### Phase 6: Recommendations (Week 4-5)
- [ ] Recommendations list
- [ ] Recommendation details
- [ ] Safety tips display
- [ ] Generate recommendations
### Phase 7: Profile & Settings (Week 5)
- [ ] Profile page
- [ ] Profile edit form
- [ ] Settings pages
- [ ] Account management
### Phase 8: Refinement (Week 6)
- [ ] Testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Accessibility audit
---
## Development Best Practices
### Code Quality
1. **TypeScript**: Use strict mode, avoid `any`
2. **Component Structure**: Keep components small and focused
3. **Naming**: Use descriptive, consistent names
4. **Comments**: Document complex logic
5. **Error Handling**: Handle errors gracefully
6. **Validation**: Validate all user inputs
### Performance
1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Dynamic imports for routes
3. **Memoization**: Use React.memo for expensive components
4. **Caching**: React Query with appropriate stale time
5. **Bundle Size**: Monitor and minimize bundle
### Accessibility
1. **ARIA Labels**: Add for screen readers
2. **Keyboard Navigation**: Support Tab and arrow keys
3. **Color Contrast**: Ensure WCAG AA compliance
4. **Focus Management**: Clear focus indicators
5. **Error Messages**: Announce errors to screen readers
### Security
1. **Authentication**: Use secure token storage
2. **Validation**: Server-side validation always
3. **XSS Protection**: Sanitize user inputs
4. **CSRF Protection**: CSRF tokens for state-changing requests
5. **Secrets**: Never commit secrets to repository
---
## Styling Guidelines
### Color Usage
- **Primary (#0066CC)**: Main CTAs, headers, links
- **Secondary (#00A896)**: Highlights, accents
- **Success (#2DBA4E)**: Positive actions, confirmations
- **Warning (#FF9500)**: Alerts, attention needed
- **Danger (#E63946)**: Errors, destructive actions
- **Gray (#F5F5F5)**: Backgrounds, borders
- **Dark Gray (#2C3E50)**: Text, dark elements
### Spacing
- **xs**: 2px (border-radius, small gaps)
- **sm**: 4px (padding-x on small elements)
- **md**: 8px (standard padding)
- **lg**: 16px (section margins)
- **xl**: 24px (large section gaps)
- **2xl**: 32px (page-level margins)
### Typography
- **Heading 1**: 2.5rem / 40px (page titles)
- **Heading 2**: 2rem / 32px (section titles)
- **Heading 3**: 1.5rem / 24px (subsection titles)
- **Body**: 1rem / 16px (default text)
- **Small**: 0.875rem / 14px (secondary text)
- **Tiny**: 0.75rem / 12px (labels, captions)
### Component Spacing
- **Cards**: 1.5rem (24px) padding
- **Forms**: 1rem (16px) between fields
- **Buttons**: 0.75rem (12px) vertical, 1.5rem (24px) horizontal
- **List items**: 0.75rem (12px) gap
---
## Icon Usage (Streamline Icons)
### Recommended Icons by Category
**Navigation**
- Dashboard: dashboard-icon
- Activities: activity-icon / list-icon
- Recommendations: light-bulb / star-icon
- Profile: user-icon
- Settings: settings-icon / gear-icon
- Logout: logout-icon / door-exit-icon
**Status & Actions**
- Success: checkmark-circle
- Error: x-circle / alert-icon
- Warning: warning-icon / exclamation-mark
- Info: info-icon
- Loading: loader-icon
- Edit: pencil-icon / edit-icon
- Delete: trash-icon / x-icon
- Add: plus-icon
- View: eye-icon
**Activity Types**
- Running: person-running
- Cycling: bicycle-icon
- Swimming: swim-icon / wave-icon
- Yoga: yoga-pose-icon
- Walking: person-walking
- Gym: dumbbell-icon / weight-icon
- Sports: sports-icon / ball-icon
- Hiking: mountain-icon / tree-icon
**Metrics**
- Calories: flame-icon / fire-icon
- Duration: clock-icon / timer-icon
- Distance: location-icon / map-icon
- Heart Rate: heart-icon
- Steps: footsteps-icon
- Streak: lightning-icon / star-icon
**Common**
- Search: search-icon / magnifying-glass
- Filter: filter-icon / sliders-icon
- Sort: sort-icon / arrows-icon
- Download: download-icon
- Upload: upload-icon
- Share: share-icon
- Print: printer-icon
- Save: save-icon / floppy-disk
- Cancel: close-icon / x-icon
- Back: arrow-left
- Next: arrow-right
- External: external-link
---
## Common Issues and Solutions
### Issue: CORS Errors
**Solution**: Ensure API Gateway is configured for CORS, use Next.js API proxy routes
### Issue: Auth Token Expiration
**Solution**: Implement token refresh in axios interceptor, handle 401 responses
### Issue: Form Validation Not Working
**Solution**: Ensure Zod schema is passed to useForm hook, check field names match
### Issue: Charts Not Rendering
**Solution**: Ensure Chart.js is installed, check data format matches chart type
### Issue: Images Not Loading
**Solution**: Use Next.js Image component, check image paths, verify CDN configuration
### Issue: Responsive Design Breaking
**Solution**: Test on actual devices, use Tailwind's responsive prefixes (sm:, md:, lg:)
---
## Next Steps
1. Start with **Prompt 1** to set up the project
2. Follow through **Prompts 2-14** in sequence
3. Use ChatGPT to generate code for each prompt
4. Integrate generated code into your project
5. Test each feature as you implement it
6. Deploy to production when ready
---
## Resources
- **Next.js Docs**: https://nextjs.org/docs
- **DaisyUI Docs**: https://daisyui.com
- **Tailwind CSS**: https://tailwindcss.com
- **React Query**: https://tanstack.com/query
- **React Hook Form**: https://react-hook-form.com
- **Zod Documentation**: https://zod.dev
- **Chart.js**: https://www.chartjs.org
- **Streamline Icons**: https://site.streamlinehq.com
- **Coolors**: https://coolors.co
- **DaisyUI Components**: https://daisyui.com/components
---
## Support & Troubleshooting
For questions or issues:
1. Check the relevant documentation links above
2. Review the code examples in the prompts
3. Consult ChatGPT with specific error messages
4. Check GitHub issues for similar problems
5. Review Next.js and library changelogs for breaking changes
---
**Document Version**: 1.0  
**Last Updated**: February 20, 2026  
**Author**: AI Architecture Designer  
**Status**: Ready for Implementation

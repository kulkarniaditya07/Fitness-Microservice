# Fitness Frontend - Quick Setup Guide
## 🎯 App Name: `fitness-frontend`
This is a **Next.js 15 + React 18 + TypeScript** frontend application for the Fitness Microservice.
## 📁 Project Location
```
/home/aditya-kulkarni/Microservice/fitness-microservice/fitness-frontend
```
## ⚡ Quick Start (Copy & Paste)
### Step 1-6: Complete Project Setup
```bash
# Step 1: Create project folder
cd /home/aditya-kulkarni/Microservice/fitness-microservice
mkdir fitness-frontend
cd fitness-frontend
# Step 2: Initialize Next.js (select YES to all prompts)
npx create-next-app@latest . --typescript --tailwind --eslint
# Step 3: Install all 12 dependencies
npm install daisyui zustand @tanstack/react-query axios react-hook-form zod chart.js react-chartjs-2 next-auth clsx tailwind-merge date-fns
# Step 4: Create folder structure
mkdir -p src/app/{auth,dashboard} src/components/{auth,dashboard,activity,recommendation,profile,layout,common,charts,forms,settings} src/services/{api,auth} src/hooks src/store src/types src/utils src/middleware src/styles src/config public/{icons,images}
# Step 5: Create .env.local file (copy content below)
# Step 6: Start dev server
npm run dev
```
## 🔐 Environment Variables (.env.local)
Create this file in project root:
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
## 📦 All 12 Dependencies
| # | Package | Version | Purpose |
|---|---------|---------|---------|
| 1 | **daisyui** | latest | Tailwind UI Components |
| 2 | **zustand** | latest | State Management |
| 3 | **@tanstack/react-query** | latest | Data Fetching & Caching |
| 4 | **axios** | latest | HTTP Client |
| 5 | **react-hook-form** | latest | Form Management |
| 6 | **zod** | latest | Schema Validation |
| 7 | **chart.js** | latest | Charting Library |
| 8 | **react-chartjs-2** | latest | React Charts Wrapper |
| 9 | **next-auth** | latest | Authentication |
| 10 | **clsx** | latest | Conditional CSS |
| 11 | **tailwind-merge** | latest | Tailwind Utilities |
| 12 | **date-fns** | latest | Date Functions |
## ✅ Verify Installation
```bash
# Check Node (should be 18+)
node --version
# Check npm (should be 8+)
npm --version
# Start dev server
npm run dev
# Visit in browser
http://localhost:3000
```
## 🚀 Next Steps After Setup
1. ✅ Complete steps 1-6 above
2. ✅ Verify dev server running at http://localhost:3000
3. ✅ Open: `FRONTEND_DESIGN.md` (2075 lines)
4. ✅ Copy **Prompt 1** from "ChatGPT Prompts" section
5. ✅ Paste into ChatGPT
6. ✅ Follow ChatGPT to generate files
7. ✅ Continue with Prompts 2-14
## 📋 Implementation Timeline
- **Phase 1 (Week 1)**: Setup & Configuration (Prompt 1) ← You are here
- **Phase 2 (Week 2)**: Authentication (Prompts 2)
- **Phase 3 (Week 2-3)**: Core Layout (Prompt 4)
- **Phase 4 (Week 3)**: Dashboard (Prompt 5)
- **Phase 5 (Week 4)**: Activity Management (Prompt 6)
- **Phase 6 (Week 4-5)**: Recommendations (Prompt 7)
- **Phase 7 (Week 5)**: Profile & Settings (Prompt 8)
- **Phase 8 (Week 6)**: Testing & Deployment (Prompts 13-14)
## 🎨 Design System
**Color Scheme** (from coolors.co):
- Primary Blue: `#0066CC`
- Secondary Teal: `#00A896`
- Success Green: `#2DBA4E`
- Warning Orange: `#FF9500`
- Danger Red: `#E63946`
**UI Components**: DaisyUI  
**Icons**: Streamline Icons  
**Typography**: Tailwind CSS + DaisyUI defaults
## 🔗 Backend Integration
Your frontend connects to:
```
API Gateway: http://localhost:8080
Services:
├── User Service: /api/users
├── Activity Service: /api/activities
└── AI Recommendations: /api/recommendation
```
## 📚 Resources
- **Next.js**: https://nextjs.org/docs
- **DaisyUI**: https://daisyui.com
- **Tailwind**: https://tailwindcss.com
- **React Query**: https://tanstack.com/query
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev
- **Chart.js**: https://www.chartjs.org
## 🐛 Troubleshooting
**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```
**Node modules missing?**
```bash
rm -rf node_modules
npm install
```
**.env.local not loading?**
- Ensure it's in project root (same folder as package.json)
- Restart dev server after creating/modifying
**Module not found errors?**
- Clear `.next` folder: `rm -rf .next`
- Reinstall: `npm install`
---
## 📖 Full Documentation
See **FRONTEND_DESIGN.md** (2075 lines) for:
- Complete architecture design
- Component specifications
- Page layouts
- 14 detailed ChatGPT prompts
- Implementation timeline
- Best practices
- Deployment guide
---
**Ready?** Follow steps 1-6 above, then read FRONTEND_DESIGN.md!

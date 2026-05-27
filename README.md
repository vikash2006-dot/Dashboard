# VIP Management Dashboard

A complete, fully functional, modern, and interactive VIP Management Dashboard built with Next.js, React, Tailwind CSS, Node.js, Express, and MongoDB.

## 🌟 Features

### Core Features
✅ Admin Authentication with JWT  
✅ VIP Management (Add, Edit, Delete, View)  
✅ Powers Management System  
✅ Power Usage Tracking & Logs  
✅ Points System with History  
✅ Real-time Leaderboard  
✅ Notifications Center  
✅ Analytics & Charts  
✅ Activity Logs & Audit Trail  
✅ Dark/Light Theme Toggle  
✅ PDF Export Reports  
✅ Advanced Search & Filtering  

### Design Features
🎨 Futuristic Dark Cyber Theme  
🎨 Glassmorphism Effects  
🎨 Neon Glow Accents  
🎨 Smooth Animations & Transitions  
🎨 Fully Responsive Design  
🎨 Mobile Drawer Navigation  
🎨 Interactive Charts & Graphs  
🎨 Loading Skeletons  
🎨 Toast Notifications  

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **ShadCN UI** - Component library
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Zustand** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **JWT** - Authentication
- **CORS** - Cross-origin requests
- **Mongoose** - ODM

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - Schema validation

## 📁 Project Structure

```
vip-dashboard/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── vips/
│   │   ├── powers/
│   │   ├── usage-logs/
│   │   ├── points/
│   │   ├── leaderboard/
│   │   ├── analytics/
│   │   ├── notifications/
│   │   └── settings/
│   ├── components/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── vips/
│   │   ├── common/
│   │   └── charts/
│   ├── lib/
│   ├── hooks/
│   ├── styles/
│   └── public/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── VIP.js
│   │   ├── Power.js
│   │   ├── PowerUsageLog.js
│   │   ├── PointsHistory.js
│   │   ├── Notification.js
│   │   └── AdminLog.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas or Local MongoDB
- Git

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/vikash2006-dot/Dashboard.git
cd Dashboard
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Setup Frontend**
```bash
cd frontend
npm install
```

4. **Configure Environment**
```bash
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and JWT secret
```

5. **Start Development**

Backend:
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

Frontend (new terminal):
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

## 🔐 Default Admin Credentials
- **Email:** `admin@dashboard.com`
- **Password:** `Admin@123456`

## 📚 API Documentation

### Authentication
```
POST   /api/auth/login          - Admin login
POST   /api/auth/logout         - Logout
POST   /api/auth/refresh        - Refresh token
GET    /api/auth/profile        - Get admin profile
```

### VIP Management
```
GET    /api/vips                - Get all VIPs
POST   /api/vips                - Create VIP
GET    /api/vips/:id            - Get VIP details
PUT    /api/vips/:id            - Update VIP
DELETE /api/vips/:id            - Delete VIP
GET    /api/vips/search/:query  - Search VIPs
```

### Powers Management
```
GET    /api/powers              - Get all powers
POST   /api/powers              - Create power
GET    /api/powers/:id          - Get power details
PUT    /api/powers/:id          - Update power
DELETE /api/powers/:id          - Delete power
POST   /api/powers/:id/assign   - Assign power to VIP
POST   /api/powers/:id/revoke   - Revoke power from VIP
```

### Usage Logs
```
GET    /api/usage-logs          - Get usage logs
POST   /api/usage-logs          - Create usage log
GET    /api/usage-logs/:id      - Get usage log details
GET    /api/usage-logs/vip/:vipId    - Get VIP's usage logs
GET    /api/usage-logs/power/:powerId - Get power usage stats
```

### Points System
```
GET    /api/points              - Get points history
POST   /api/points/add          - Add points
POST   /api/points/deduct       - Deduct points
GET    /api/points/vip/:vipId   - Get VIP points history
```

### Leaderboard
```
GET    /api/leaderboard         - Get top VIPs by points
GET    /api/leaderboard/usage   - Get top VIPs by power usage
```

### Notifications
```
GET    /api/notifications       - Get notifications
POST   /api/notifications       - Create notification
PUT    /api/notifications/:id   - Mark as read
DELETE /api/notifications/:id   - Delete notification
```

### Analytics
```
GET    /api/analytics/overview  - Dashboard overview stats
GET    /api/analytics/power-usage - Power usage analytics
GET    /api/analytics/points    - Points distribution
GET    /api/analytics/activity  - Activity trends
```

## 🎨 UI/UX Features

- **Responsive Grid Layout** - Adapts to all screen sizes
- **Dark/Light Theme** - Toggle theme with smooth transitions
- **Real-time Updates** - WebSocket support for live data
- **Interactive Charts** - Powered by Recharts
- **Smooth Animations** - Framer Motion throughout
- **Loading States** - Skeleton screens during data fetch
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Feedback for actions
- **Mobile Navigation** - Slide-out drawer menu
- **Keyboard Shortcuts** - Quick navigation

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  role: String (admin),
  createdAt: Date,
  updatedAt: Date
}
```

### VIPs Collection
```javascript
{
  _id: ObjectId,
  vipId: String (unique),
  name: String,
  email: String,
  profileImage: String,
  teamName: String,
  rank: Number,
  currentPoints: Number,
  assignedPowers: [ObjectId],
  usedPowers: [ObjectId],
  status: String (active/inactive),
  joinDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Powers Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  category: String,
  powerLevel: Number,
  usageLimit: Number,
  cooldownTime: Number,
  status: String (active/inactive),
  assignedVIPs: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Power Usage Logs Collection
```javascript
{
  _id: ObjectId,
  vipId: ObjectId,
  powerId: ObjectId,
  usedAt: Date,
  remarks: String,
  markedBy: ObjectId,
  usageCount: Number,
  createdAt: Date
}
```

### Points History Collection
```javascript
{
  _id: ObjectId,
  vipId: ObjectId,
  oldPoints: Number,
  newPoints: Number,
  pointsChanged: Number,
  reason: String,
  updatedBy: ObjectId,
  createdAt: Date
}
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation & sanitization
- Rate limiting on API endpoints
- Secure session management
- Role-based access control

## 📦 Dependencies

### Frontend
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "tailwindcss": "^3.3.0",
  "framer-motion": "^10.16.0",
  "@shadcn/ui": "latest",
  "recharts": "^2.10.0",
  "axios": "^1.6.0",
  "zustand": "^4.4.0",
  "lucide-react": "^0.292.0"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "mongoose": "^7.5.0",
  "jsonwebtoken": "^9.1.0",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.0"
}
```

## 🚀 Deployment

### Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Heroku/Railway (Backend)
```bash
# Configure environment variables on platform
git push heroku main
```

### MongoDB Atlas
- Create cluster on MongoDB Atlas
- Get connection string
- Add to .env

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ by Vikash Kumar**

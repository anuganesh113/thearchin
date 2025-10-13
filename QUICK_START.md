# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
The app will automatically open at `http://localhost:3000`

## 🔑 Login Credentials

Use these credentials to test different user roles:

### Admin Access
- **Email**: `admin@school.edu`
- **Password**: `admin123`
- **Features**: Full system access, student/teacher management, reports

### Teacher Access
- **Email**: `teacher@school.edu`
- **Password**: `teacher123`
- **Features**: Class management, grading, attendance, assignments

### Student Access
- **Email**: `student@school.edu`
- **Password**: `student123`
- **Features**: View courses, submit assignments, check grades

### Parent Access
- **Email**: `parent@school.edu`
- **Password**: `parent123`
- **Features**: Monitor child's progress, view grades, attendance

## 📱 Quick Tour

### Admin Dashboard
1. Login as admin
2. View system statistics and analytics
3. Navigate to "Students" to manage student records
4. Go to "Announcements" to create school-wide notifications
5. Use "Messages" for communication

### Teacher Dashboard
1. Login as teacher
2. View your classes and students
3. Create assignments and grade submissions
4. Mark attendance for your classes
5. Track student performance with analytics

### Student Dashboard
1. Login as student
2. View your course schedule
3. Check pending assignments
4. Monitor your grades and performance trends
5. Access course materials

### Parent Dashboard
1. Login as parent
2. View child's profile and statistics
3. Monitor academic performance
4. Check attendance records
5. Review upcoming assignments and events

## 🎯 Key Features to Explore

- ✅ **Responsive Design**: Try resizing the browser or open on mobile
- ✅ **Search & Filter**: Use search bars to find specific records
- ✅ **CRUD Operations**: Add, edit, or delete student records (Admin)
- ✅ **Data Visualization**: Check out the charts on dashboards
- ✅ **Messaging System**: Send messages between users
- ✅ **Role-Based Access**: Try accessing admin pages as student (blocked!)

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📚 Project Structure

```
src/
├── components/      # Reusable UI components
├── contexts/        # State management (Auth, Data)
├── data/           # Mock data
├── pages/          # All application pages
│   ├── admin/      # Admin pages
│   ├── teacher/    # Teacher pages
│   ├── student/    # Student pages
│   ├── parent/     # Parent pages
│   └── shared/     # Shared pages
├── App.jsx         # Main app & routing
└── main.jsx        # Entry point
```

## 💡 Tips

1. **Navigation**: Use the sidebar to access different sections
2. **Logout**: Click your profile at the bottom of the sidebar
3. **Quick Login**: On login page, click role buttons to auto-fill credentials
4. **Mobile**: Click menu icon (☰) to open sidebar on mobile
5. **Modals**: Click outside or press ESC to close modals

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 3001  // Change to any available port
}
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Ensure you're using Node.js v16 or higher
node --version
```

## 🎓 Learning Resources

- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **React Router**: https://reactrouter.com
- **Recharts**: https://recharts.org

## 📞 Need Help?

Check the detailed README.md for comprehensive documentation and code explanations.

---

**Happy Learning! 🎉**

# 🎓 EduManage - School Management System

A comprehensive, production-ready school management system built with React.js and Tailwind CSS. This application provides complete functionality for managing students, teachers, courses, assignments, grades, attendance, and communication in an educational institution.

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-role authentication system** (Admin, Teacher, Student, Parent)
- **Protected routes** with role-based access control
- **Persistent sessions** using localStorage
- **Quick login** demo credentials for testing

### 👨‍💼 Admin Dashboard
- **System overview** with real-time statistics
- **Student enrollment trends** with interactive charts
- **Performance analytics** across grade levels
- **Student management** with full CRUD operations
- **Teacher management** and assignment
- **Announcement system** for school-wide communications
- **Reports and analytics**

### 👨‍🏫 Teacher Dashboard
- **Class management** with course overview
- **Student performance tracking** with visual analytics
- **Assignment creation and grading**
- **Attendance tracking** for all classes
- **Grade management** with automated calculations
- **Schedule management** with daily timetable
- **Messaging system** for student/parent communication

### 👨‍🎓 Student Dashboard
- **Course enrollment** and overview
- **Assignment submission** tracking
- **Grade viewing** with performance trends
- **Attendance records** with percentage tracking
- **Class schedule** with daily timetable
- **Performance analytics** across subjects
- **Messaging** with teachers

### 👨‍👩‍👧 Parent Dashboard
- **Child profile** monitoring
- **Academic performance** tracking
- **Attendance overview** with alerts
- **Assignment monitoring**
- **Grade reports** with trends
- **School events** calendar
- **Communication** with teachers and admin

### 📱 Core Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Real-time Updates** - State management with React Context API
- **Data Visualization** - Interactive charts with Recharts
- **Search & Filter** - Advanced filtering for all data tables
- **Form Validation** - Comprehensive input validation
- **Modal Dialogs** - Smooth user interactions
- **Loading States** - User feedback during operations

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router DOM 6.20
- **Charts**: Recharts 2.10
- **Icons**: Lucide React
- **Build Tool**: Vite 5.0
- **State Management**: React Context API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔑 Demo Credentials

The application includes pre-configured demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.edu | admin123 |
| Teacher | teacher@school.edu | teacher123 |
| Student | student@school.edu | student123 |
| Parent | parent@school.edu | parent123 |

## 📁 Project Structure

```
school-management-system/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Common components (Button, Card, Input, etc.)
│   │   └── layout/          # Layout components (DashboardLayout)
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state management
│   │   └── DataContext.jsx  # Application data management
│   ├── data/                # Mock data
│   │   └── mockData.js      # Sample data for all entities
│   ├── pages/               # Page components
│   │   ├── admin/           # Admin-specific pages
│   │   ├── teacher/         # Teacher-specific pages
│   │   ├── student/         # Student-specific pages
│   │   ├── parent/          # Parent-specific pages
│   │   ├── shared/          # Shared pages across roles
│   │   └── Login.jsx        # Login page
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # Documentation
```

## 🎯 Key Components

### Authentication System
- **AuthContext**: Manages user authentication state, login/logout functionality
- **ProtectedRoute**: Wraps routes to ensure proper authentication and authorization
- **Login**: Beautiful login page with role-based quick access

### Data Management
- **DataContext**: Centralized state management for all entities
- **CRUD Operations**: Complete Create, Read, Update, Delete for students, teachers, courses, etc.
- **Mock Data**: Comprehensive sample data for testing

### Reusable Components
- **Button**: Multiple variants (primary, secondary, success, danger, etc.)
- **Card**: Container component for grouping content
- **Input/Select**: Form inputs with validation and error handling
- **Table**: Responsive data tables with sorting and filtering
- **Modal**: Dialog overlays for forms and content display
- **Badge**: Status indicators and labels
- **StatCard**: Dashboard statistics display
- **LoadingSpinner**: Loading state indicators

### Dashboard Layouts
- **Responsive Sidebar**: Collapsible navigation for all screen sizes
- **Header**: User profile and notifications
- **Main Content Area**: Dynamic content based on selected route

## 🎨 Design Philosophy

### Color Scheme
- **Primary**: Blue (#3b82f6) - Professional and trustworthy
- **Success**: Green (#10b981) - Positive actions and status
- **Warning**: Yellow (#f59e0b) - Attention and alerts
- **Danger**: Red (#ef4444) - Errors and critical actions
- **Info**: Blue (#3b82f6) - Informational content

### Typography
- **Font Family**: Inter - Modern, readable sans-serif
- **Font Weights**: 300-800 for hierarchy and emphasis

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔄 Data Flow

1. **Authentication Flow**:
   - User enters credentials → AuthContext validates → Store user data → Redirect to role-specific dashboard

2. **CRUD Operations**:
   - User action → DataContext method → Update state → Re-render components

3. **Protected Routes**:
   - User navigates → ProtectedRoute checks auth → Verify role → Allow/deny access

## 🚀 Features in Detail

### Student Management
- Add new students with complete profile information
- Edit existing student records
- View detailed student profiles
- Delete student records
- Search and filter by name, ID, grade, class
- Track enrollment status

### Academic Management
- Create and manage courses
- Assign teachers to courses
- Create assignments with due dates
- Grade submissions
- Generate report cards
- Track student progress

### Attendance System
- Mark daily attendance
- View attendance records
- Calculate attendance percentages
- Generate attendance reports

### Communication
- Send messages between users
- Create school-wide announcements
- Priority-based notifications
- Target specific user groups

### Analytics & Reports
- Enrollment trends over time
- Performance distribution charts
- Subject-wise performance analysis
- Attendance statistics
- Grade distribution visualizations

## 🔒 Security Features

- Password-protected authentication
- Role-based access control
- Protected routes preventing unauthorized access
- Session persistence with localStorage
- Input validation and sanitization

## 🎓 Educational Value

This project demonstrates:
- **Modern React patterns**: Hooks, Context API, functional components
- **Routing**: Complex nested routing with protection
- **State Management**: Centralized state with Context API
- **UI/UX Best Practices**: Responsive design, accessibility, user feedback
- **Component Architecture**: Reusable, maintainable components
- **Data Visualization**: Interactive charts and graphs
- **Form Handling**: Validation, error states, user feedback

## 📝 Code Quality

- **Well-commented code**: Detailed explanations of functionality
- **Consistent naming**: Clear, descriptive variable and function names
- **Component organization**: Logical folder structure
- **Reusability**: DRY principles applied throughout
- **Responsive design**: Mobile-first approach
- **Accessibility**: ARIA labels, keyboard navigation

## 🔧 Customization

### Adding New Features
1. Create component in appropriate directory
2. Add route in App.jsx
3. Update navigation in DashboardLayout
4. Add data operations in DataContext if needed

### Styling Customization
- Modify `tailwind.config.js` for colors, fonts, spacing
- Update component styles using Tailwind utilities
- Add custom CSS in `index.css`

### Data Integration
- Replace mock data in DataContext with API calls
- Update CRUD operations to use fetch/axios
- Implement error handling for network requests

## 🌟 Future Enhancements

Potential features to add:
- Real backend API integration
- File upload for assignments
- Real-time notifications with WebSockets
- Export reports to PDF/Excel
- Email notifications
- Calendar integration
- Video conferencing for virtual classes
- Mobile app version
- Multi-language support
- Dark mode theme

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 👨‍💻 Development Notes

### Best Practices Followed
- ✅ Functional components with hooks
- ✅ Context API for state management
- ✅ Protected routes for security
- ✅ Responsive mobile-first design
- ✅ Reusable component architecture
- ✅ Proper error handling
- ✅ Loading states and user feedback
- ✅ Form validation
- ✅ Consistent code formatting
- ✅ Comprehensive commenting

### Performance Optimizations
- Lazy loading for routes
- Memoization where appropriate
- Efficient re-rendering with proper state management
- Optimized images and assets

## 🤝 Contributing

This is a demonstration project, but contributions for improvements are welcome!

## 📧 Support

For questions or issues, please refer to the code comments or create an issue in the repository.

---

**Built with ❤️ using React and Tailwind CSS**

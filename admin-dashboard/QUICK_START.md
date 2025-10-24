# Quick Start Guide

Get your admin dashboard up and running in 5 minutes!

## 🚀 Quick Installation

```bash
# Navigate to the project
cd admin-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

That's it! Open your browser to `http://localhost:3000`

## 🔐 Login

Use **any email and password** to login. This is demo mode!

Example:
- Email: `admin@example.com`
- Password: `password`

## 📱 Features Overview

### Dashboard
- View key metrics and statistics
- Track revenue and orders
- Analyze sales by category
- Monitor top products

### Users
- View all users
- Add new users
- Edit user details
- Delete users
- Filter and search

### Products
- Manage inventory
- Track stock levels
- View sales data
- Add/edit products

### Orders
- Track all orders
- View order details
- Update order status
- Export data

### Analytics
- Revenue trends
- Customer growth
- Category performance
- Traffic sources

### Settings
- Update profile
- Notification preferences
- Security settings
- App preferences

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#YOUR_COLOR',
    600: '#YOUR_COLOR',
  }
}
```

### Change Logo

Update these files:
- `src/components/Sidebar.jsx` (line ~20)
- `src/pages/Login.jsx` (line ~35)

### Add New Page

1. Create page in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add menu item in `src/components/Sidebar.jsx`

Example:

```jsx
// src/pages/Reports.jsx
const Reports = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      {/* Your content */}
    </div>
  )
}

export default Reports
```

```jsx
// Add to App.jsx
<Route path="reports" element={<Reports />} />
```

```jsx
// Add to Sidebar.jsx menuItems
{ to: '/reports', icon: FileText, label: 'Reports' }
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm test -- --coverage
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The build will be in the `dist/` directory.

## 🔧 Common Tasks

### Adding a New Stat Card

```jsx
<StatCard
  title="New Metric"
  value="1,234"
  change="+15.3%"
  icon={YourIcon}
  trend="up"
  color="primary"
/>
```

### Creating a Data Table

```jsx
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: false }
]

<Table columns={columns} data={yourData} />
```

### Showing Notifications

```jsx
import { useNotification } from '../context/NotificationContext'

const YourComponent = () => {
  const { showSuccess, showError } = useNotification()

  const handleAction = () => {
    try {
      // Your logic
      showSuccess('Action completed!')
    } catch (error) {
      showError('Something went wrong')
    }
  }
}
```

### Adding a Modal

```jsx
const [showModal, setShowModal] = useState(false)

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Modal Title"
>
  {/* Your content */}
</Modal>
```

## 🐛 Troubleshooting

### Port already in use
Vite will automatically use the next available port.

### Module not found
```bash
rm -rf node_modules
npm install
```

### Build fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Tests fail
```bash
npm test -- --run
```

## 📚 Next Steps

1. ✅ **Explore the Interface**: Click through all pages
2. ✅ **Read the Documentation**: Check `README.md` for detailed info
3. ✅ **Review Design Decisions**: See `DESIGN_DECISIONS.md`
4. ✅ **Customize**: Make it your own!
5. ✅ **Integrate Backend**: Replace mock data with real APIs

## 💡 Tips

- **Use the search**: Tables have built-in search functionality
- **Check notifications**: Bell icon in header shows system notifications
- **Try responsiveness**: Resize your browser to see mobile view
- **Keyboard shortcuts**: Tab through forms, Escape closes modals
- **Dark mode**: Architecture is ready, just need to implement toggle

## 🎯 Production Checklist

Before deploying:

- [ ] Replace mock data with real API calls
- [ ] Implement real authentication
- [ ] Add proper error boundaries
- [ ] Set up environment variables
- [ ] Configure CORS for your API
- [ ] Add analytics tracking
- [ ] Set up error logging (e.g., Sentry)
- [ ] Optimize images and assets
- [ ] Run security audit
- [ ] Test on real devices
- [ ] Set up CI/CD pipeline

## 🤝 Need Help?

- Check the main `README.md`
- Review component examples in `src/components/`
- Look at test files for usage examples
- Read inline code comments

## 🎉 You're Ready!

Start building something amazing! 🚀

---

**Happy Coding!** 💻

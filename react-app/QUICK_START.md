# Quick Start Guide - The Archin Website

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd /workspace/react-app
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 3: Build for Production
```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🎯 Key Features to Test

### 1. Navigation
- Click the menu icon to open the side menu
- Try smooth scrolling by clicking navigation links
- Test mobile responsiveness (resize browser)

### 2. Hero Section
- Click "Explore Apartments" button
- Click "Video Promotion" card to see modal
- Test the scroll-down button

### 3. Apartments Section
- Click on apartment rows to expand details
- View floor plans and pricing information
- Test the "Schedule a Visit" buttons

### 4. Location Section
- Use arrow buttons to navigate locations
- Click the dots to jump to specific slides
- Check the timing information display

### 5. Contact Form
- Fill out the form and submit
- Test form validation (empty fields)
- Check loading state during submission

### 6. Responsive Design
Test on different screen sizes:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Customization Quick Tips

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  brown: {
    500: '#YOUR_COLOR', // Change this
  }
}
```

### Modify Content
Edit files in `src/data/mockData.ts`:
- `apartments` - Apartment listings
- `locations` - Location information
- `testimonials` - Customer reviews
- `stats` - Statistics numbers

### Add New Section
1. Create component in `src/components/sections/`
2. Import in `src/App.tsx`
3. Add to the main component

## 📱 Testing on Mobile

### Using Browser DevTools
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device or responsive mode
4. Test all interactions

### Using Network Throttling
1. Open DevTools Network tab
2. Select "Slow 3G" or "Fast 3G"
3. Test loading performance

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Then run dev server again
npm run dev
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Images Not Loading
Make sure image paths in `src/data/mockData.ts` are correct:
```typescript
image: '/src/assets/images/your-image.jpg'
```

## 📊 Performance Testing

### Check Bundle Size
```bash
npm run build
# Check dist/ folder size
```

### Test Lighthouse Score
1. Build the app: `npm run build`
2. Preview it: `npm run preview`
3. Open Chrome DevTools
4. Run Lighthouse audit

## 🎓 Learning Resources

### React + TypeScript
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

### Framer Motion
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Examples](https://www.framer.com/motion/examples/)

## 💻 Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Edit component files
- Test in browser
- Check responsiveness

### 3. Test Build
```bash
npm run build
```

### 4. Commit Changes
```bash
git add .
git commit -m "Description of changes"
```

## 🐛 Common Issues & Solutions

### Issue: Tailwind styles not applying
**Solution**: Make sure `index.css` is imported in `main.tsx`

### Issue: TypeScript errors in editor
**Solution**: Restart TypeScript server in VS Code:
- Cmd/Ctrl + Shift + P
- "TypeScript: Restart TS Server"

### Issue: Framer Motion animations not working
**Solution**: Check that motion components are imported:
```typescript
import { motion } from 'framer-motion';
```

### Issue: Images showing broken
**Solution**: Use correct path format:
```typescript
// Correct
src="/src/assets/images/image.jpg"

// Incorrect
src="./assets/images/image.jpg"
```

## 📞 Getting Help

### Check Documentation
1. README.md - Full project documentation
2. DESIGN_DECISIONS.md - Design rationale
3. PROJECT_SUMMARY.md - Project overview

### Debug Mode
Enable React DevTools:
1. Install React DevTools browser extension
2. Open browser DevTools
3. Go to "Components" tab

### Console Logging
Add console logs to debug:
```typescript
console.log('Debug info:', yourVariable);
```

## 🎉 You're Ready!

Start building amazing features on top of this solid foundation. The codebase is well-structured, documented, and ready for expansion.

**Happy coding! 🚀**

---

For more detailed information, see:
- [README.md](./README.md) - Complete documentation
- [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) - Design choices explained
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Project overview

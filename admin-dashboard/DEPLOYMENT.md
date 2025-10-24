# Deployment Guide

Complete guide for deploying your admin dashboard to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] All features tested and working
- [ ] Tests passing (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Error tracking configured
- [ ] Analytics set up
- [ ] Security audit completed

## 🚀 Deployment Options

### 1. Vercel (Recommended)

Easiest and fastest deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel GitHub integration:
1. Push code to GitHub
2. Import project on vercel.com
3. Vercel auto-detects Vite and deploys

**Advantages:**
- Automatic HTTPS
- Global CDN
- Zero configuration
- Automatic deployments on push

### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Or use Netlify UI:
1. Drag and drop `dist/` folder to netlify.com

**Advantages:**
- Simple drag-and-drop
- Form handling
- Serverless functions support

### 3. GitHub Pages

Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/admin-dashboard"
}
```

Update `vite.config.js`:
```js
export default defineConfig({
  base: '/admin-dashboard/',
  // ... rest of config
})
```

Deploy:
```bash
npm run build
npx gh-pages -d dist
```

### 4. AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**Advantages:**
- Full control
- Scalable
- Cost-effective for high traffic

### 5. Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Build and run:
```bash
docker build -t admin-dashboard .
docker run -p 80:80 admin-dashboard
```

### 6. Traditional Server (Apache/Nginx)

Build locally:
```bash
npm run build
```

Upload `dist/` contents to your server.

**Apache** - Create `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx** - Update config:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 🔒 Environment Variables

Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Admin Dashboard
VITE_ANALYTICS_ID=your-analytics-id
```

Update code to use:
```js
const API_URL = import.meta.env.VITE_API_URL
```

## 🔧 Build Optimization

### 1. Analyze Bundle Size
```bash
npm run build -- --mode analyze
```

### 2. Enable Compression

Update `vite.config.js`:
```js
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' })
  ]
})
```

Install plugin:
```bash
npm i -D vite-plugin-compression
```

### 3. Optimize Images

Use image optimization service or pre-optimize:
```bash
npm i -D vite-plugin-imagemin
```

## 🔍 Monitoring

### Error Tracking with Sentry

```bash
npm i @sentry/react
```

Update `src/main.jsx`:
```jsx
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
})
```

### Analytics with Google Analytics

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚦 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔐 Security Hardening

### 1. Content Security Policy

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;">
```

### 2. Security Headers

For Netlify, create `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 3. HTTPS Only
Ensure all platforms force HTTPS (most do by default).

## 📊 Performance Checklist

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Total bundle size < 500KB
- [ ] Images optimized
- [ ] Gzip/Brotli compression enabled
- [ ] CDN configured
- [ ] Caching headers set

## 🧪 Post-Deployment Testing

Test on:
- [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Mobile (iOS Safari, Android Chrome)
- [ ] Tablet
- [ ] Slow 3G network
- [ ] Different screen sizes

## 🆘 Rollback Plan

If deployment fails:

**Vercel:**
```bash
vercel rollback
```

**Netlify:**
1. Go to Deploys
2. Find previous deploy
3. Click "Publish deploy"

**Manual:**
Keep previous build:
```bash
cp -r dist dist-backup
```

## 📝 Deployment Logs

Maintain a deployment log:
```
2024-10-24: v1.0.0 - Initial deployment
- Features: Dashboard, Users, Products, Orders, Analytics
- Deploy time: 2min 34s
- Status: Success
```

## 🎯 Post-Launch

1. **Monitor Performance**
   - Check analytics
   - Review error reports
   - Monitor server resources

2. **Gather Feedback**
   - User surveys
   - Support tickets
   - Usage patterns

3. **Iterate**
   - Fix bugs quickly
   - Add requested features
   - Optimize based on data

## 🔗 Useful Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [AWS Documentation](https://docs.aws.amazon.com)

---

**Happy Deploying! 🚀**

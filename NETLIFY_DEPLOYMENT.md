# Deploy Ramadanly to Netlify

## Prerequisites
- A Netlify account (free at https://netlify.com)
- Git installed on your computer
- Your project pushed to GitHub, GitLab, or Bitbucket

## Method 1: Deploy via Netlify UI (Recommended)

### Step 1: Push to Git Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ramadanly app"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/ramadanly.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Node version:** 18 (set in Environment variables if needed)
6. Click "Deploy site"

### Step 3: Wait for Deployment
- Netlify will automatically build and deploy your site
- You'll get a random URL like `https://random-name-123.netlify.app`
- You can customize this in Site settings → Domain management

## Method 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Initialize and Deploy
```bash
# Initialize Netlify in your project
netlify init

# Build your project
npm run build

# Deploy to production
netlify deploy --prod
```

## Method 3: Drag and Drop (Quick Test)

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Deploy
1. Go to https://app.netlify.com/drop
2. Drag and drop the `build` folder
3. Your site will be live instantly!

## Post-Deployment Configuration

### Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure DNS

### Environment Variables (If Needed)
1. Go to Site settings → Environment variables
2. Add any required variables
3. Redeploy the site

### Enable HTTPS
- HTTPS is automatically enabled by Netlify
- Free SSL certificate is provisioned

## Continuous Deployment

Once connected to Git:
- Every push to your main branch automatically triggers a new deployment
- Pull requests create preview deployments
- Rollback to previous deployments anytime

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure `package.json` has correct dependencies
- Verify Node version compatibility

### 404 Errors on Refresh
- Already handled by `netlify.toml` and `public/_redirects`
- Ensures SPA routing works correctly

### API Issues
- Quran.com API is external and should work fine
- Check browser console for CORS or network errors

## Your Site is Live! 🎉

Your Ramadanly app is now deployed and accessible worldwide!

**Features Working:**
- ✅ Quran viewer with Arabic text
- ✅ English translations
- ✅ Audio playback
- ✅ Progress tracking
- ✅ Daily checklists
- ✅ Calendar view
- ✅ Achievements
- ✅ Analytics

**Performance:**
- Fast global CDN
- Automatic HTTPS
- Optimized caching
- Mobile responsive

## Support

For issues or questions:
- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://answers.netlify.com

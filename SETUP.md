# Quick Setup Guide

## 🚀 Running Your Portfolio Locally

The portfolio won't display CSS styling when opened directly as `file://`. You need to run it through a local server.

### Option 1: Python (Recommended - Easiest)

**Windows:**
```bash
python -m http.server 8000
```

**Mac/Linux:**
```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

---

### Option 2: Node.js (if you have it installed)

```bash
npx http-server
```

Then open: `http://localhost:8080`

---

### Option 3: Live Server (VS Code Extension)

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Click "Open with Live Server"
4. Browser opens automatically with proper styling!

---

### Option 4: Using PHP

```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

---

## ✅ When Everything Works

You should see:
- ✨ Dark theme with cyan, magenta, and orange accents
- 🎨 Smooth animations and hover effects
- 📱 Responsive design
- 🌟 Glowing effects on cards
- ⚡ Fast, smooth interactions

## 🌐 Deploying Online

### GitHub Pages (Free)

1. Create a GitHub account (if you don't have one)
2. Create a new repository named `portfolio`
3. Upload these files to the repository
4. Go to Settings → Pages → Select "main" branch
5. Your site will be live at: `https://yourusername.github.io/portfolio`

### Netlify (Free & Easy)

1. Go to netlify.com
2. Drag and drop this entire folder
3. Your site is live in seconds!
4. Get a free domain name

### Vercel (Free)

1. Go to vercel.com
2. Import from GitHub
3. Deploy with one click

---

## 📝 File Structure

```
portfolio/
├── index.html          ← Main file (open this in browser)
├── css/
│   ├── styles.css     ← Dark theme styling
│   └── animations.css ← Animations & effects
├── js/
│   ├── main.js        ← Navigation & forms
│   └── animations.js  ← Scroll animations
├── README.md          ← Full documentation
├── SETUP.md           ← This file
└── .gitignore         ← Git configuration
```

---

## 🎨 Customizing

### Colors
Edit `css/styles.css` and change the color variables at the top:
```css
:root {
    --color-primary: #00d4ff;      /* Cyan - change this */
    --color-secondary: #ff006e;    /* Magenta - change this */
    --color-accent: #ffb703;       /* Orange - change this */
}
```

### Personal Info
Edit `index.html` and search for:
- Your name and job title
- Your email address
- Your phone number
- Your GitHub and LinkedIn URLs
- Project descriptions

### Skills & Experience
Update the skill cards, project descriptions, and certifications directly in `index.html`.

---

## ✨ Features Already Included

✅ Dark theme with neon accents
✅ Fully responsive (mobile, tablet, desktop)
✅ Smooth scroll animations
✅ Contact form with validation
✅ No external dependencies
✅ SEO optimized
✅ Accessibility compliant
✅ Production-ready code

---

## 🐛 Troubleshooting

**CSS not loading?**
- Make sure you're using a local server (not `file://`)
- Check that `css/` folder exists with both CSS files

**Form not working?**
- Open browser console (F12) to see messages
- Currently logs to console - connect to email service if needed

**Mobile menu not appearing?**
- Test on mobile browser or use DevTools (F12 → Toggle device toolbar)
- Works automatically at 768px and below

**Colors look different?**
- Clear browser cache (Ctrl+Shift+Delete)
- Try in a different browser

---

## 📞 Need Help?

1. Check the README.md for detailed documentation
2. Review the HTML comments in index.html
3. Check browser console for errors (F12)
4. Verify folder structure matches the guide above

---

**Happy building!** 🚀

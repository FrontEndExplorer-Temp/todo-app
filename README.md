# To-Do App

## Production Build & Deployment

### Build for Production

1. Install dependencies (if not already):
   ```sh
   npm install
   ```
2. Build the app:
   ```sh
   npm run build
   ```
   This will generate optimized files in the `dist/` folder (`bundle.js`, `styles.css`).

### Serve the Production Build

You can use any static server to serve the `dist/` folder. For example, with `serve`:

```sh
npm install -g serve
serve dist
```

Or deploy the `dist/` folder to any static hosting (Vercel, Netlify, GitHub Pages, etc).

### Notes
- The app is fully client-side and requires no backend.
- Make sure to include `favicon.png` and `manifest.json` in the `dist/` folder for PWA/SEO support.
- For best results, use HTTPS and a modern browser. 
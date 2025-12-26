const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const storyRoutes = require("./routes/storyRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// --- DYNAMIC CORS CONFIGURATION ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://love-unfolds-mern.vercel.app", // Your actual Vercel URL
  process.env.ALLOWED_ORIGINS             // Automatically reads the variable you added to Render
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in our allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // This will now log exactly WHICH URL is being blocked in your Render logs
      console.error(`CORS Blocked Origin: ${origin}`);
      callback(new Error('The CORS policy for this site does not allow access.'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// ----------------------------------

app.use(express.json());
app.use("/api/stories", storyRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Love Unfolds backend is running ❤️");
});

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend Connected 🎯" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

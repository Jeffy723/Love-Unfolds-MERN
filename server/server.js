const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const storyRoutes = require("./routes/storyRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// --- UPDATED CORS FOR DEPLOYMENT ---
const allowedOrigins = [
  "http://localhost:5173", // Local Development
  "https://your-frontend-name.vercel.app" // Your future live Vercel URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
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

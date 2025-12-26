const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Import all controllers in one clean block
const { 
  registerUser, 
  loginUser, 
  getMe 
} = require("../controllers/authController");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (Requires a valid JWT token)
router.get("/me", protect, getMe);

module.exports = router;

// storyRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); //
const {
  getMyStories,
  createStory,
  deleteStory, // Import your new controller
  getStories,
  getStoryById,
  updateStory
} = require("../controllers/storyController");

// IMPORTANT: Place "/mine" before "/:id" so "mine" isn't treated as an ID
router.get("/mine", protect, getMyStories); 
router.post("/", protect, createStory);

// DELETE route for a specific story ID
router.delete("/:id", protect, deleteStory); 

// Other routes...
router.get("/", getStories);
router.get("/:id", getStoryById);
router.put("/:id", protect, updateStory);

module.exports = router;

const Story = require("../models/storyModel");

// 1. Create a new story (Linked to logged-in user)
exports.createStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Validation: Ensure required fields are present
    if (!title || !content) {
      return res.status(400).json({ message: "Please provide both title and content" });
    }

    // Link the story to the authenticated user from the protect middleware
    const story = await Story.create({
      title,
      content,
      author: req.user._id 
    });
    
    return res.status(201).json(story);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// 2. Get all stories (Pagination + Search)
exports.getStories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6; // Adjusted limit for cleaner grid layout
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const total = await Story.countDocuments(query);
    const stories = await Story.find(query)
      .populate("author", "name email") 
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      stories,
      hasMore: page * limit < total
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 3. Get story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate("author", "name");
    if (!story) return res.status(404).json({ message: "Story not found" });
    return res.status(200).json(story);
  } catch (error) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
};

// 4. Update story (Owner only)
exports.updateStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    // Ownership check: story.author must match the logged-in user's ID
    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to edit this story" });
    }

    story.title = req.body.title || story.title;
    story.content = req.body.content || story.content;
    
    const updated = await story.save();
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ message: "Update failed" });
  }
};

// 5. Delete story (Owner only) - CRITICAL FOR PROFILE PAGE
exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    // Ownership check
    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete this" });
    }

    await story.deleteOne();
    return res.status(200).json({ success: true, message: "Story deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 6. Get My Stories (Filtered by logged-in user)
exports.getMyStories = async (req, res) => {
  try {
    // Fetches only stories where the author matches the req.user set by middleware
    const stories = await Story.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ stories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

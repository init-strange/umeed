import express from "express";
import User from "../models/schema.js";
import saveUserToDB from "../functions/saveuser.js";

const router = express.Router();

// Save user/message
router.post("/", async (req, res) => {
  try {
    const result = await saveUserToDB(req.body);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Check if user exists
router.post("/check", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        exists: false,
        message: "User does not exist",
      });
    }

    res.status(200).json({
      exists: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("❌ Error checking user:", error.message);

    res.status(500).json({
      exists: false,
      message: "Server error",
    });
  }
});

export default router;

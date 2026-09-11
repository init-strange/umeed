import express from "express";
import questions from "../data/questions.json" with { type: "json" };

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const questionList = Array.isArray(questions)
      ? questions
      : questions.questions;

    if (!Array.isArray(questionList)) {
      throw new Error("Questions JSON is not an array");
    }

    res.json(questionList);
  } catch (error) {
    console.error("Questions error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
    });
  }
});

export default router;

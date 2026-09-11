import express from "express";
import askGemini from "../functions/askgemini.js";

const router = express.Router();

const SYSTEM_INSTRUCTION = `
You are a supportive mental-health wellbeing analysis assistant.

Your job is to summarize questionnaire results.

You MUST NOT:
- diagnose mental illnesses
- claim that the user has a disorder
- replace a doctor, psychologist, counselor, or emergency service
- make definitive medical conclusions

You MAY:
- identify concerning symptom patterns
- explain what questionnaire scores may indicate
- identify areas that may deserve attention
- suggest general wellbeing strategies
- recommend speaking with an appropriate human professional

Use cautious language such as:
"may indicate", "could suggest", "is worth discussing with a professional".

Return your answer as valid JSON with exactly these fields:

{
  "potential_problems": [],
  "patterns": [],
  "suggestions": [],
  "emergency": {
    "level": "none",
    "reason": "",
    "action": ""
  }
}
`;

router.post("/assessment", async (req, res) => {
  try {
    const { scores, answers } = req.body;

    if (!scores || !answers) {
      return res.status(400).json({
        error: "Scores and answers are required",
      });
    }

    // Build prompt
    const prompt = `
${SYSTEM_INSTRUCTION}

QUESTIONNAIRE SCORES:

${JSON.stringify(scores, null, 2)}

INDIVIDUAL ANSWERS:

${JSON.stringify(answers, null, 2)}

Analyze these results.

Focus on:

1. Potential problems
   Identify areas that appear concerning.

2. Patterns / trends
   Look for patterns across the different questionnaires
   and individual answers.

3. Suggestions
   Give practical, low-risk wellbeing suggestions and
   recommend appropriate human support where relevant.

4. Emergency
   Identify whether the answers contain signs requiring
   immediate human assistance.

Do not diagnose the user.

Return ONLY valid JSON.
`;

    const result = await askGemini(prompt);

    if (!result.success) {
      return res.status(500).json({
        error: result.error,
      });
    }

    res.json({
      success: true,
      analysis: result.text,
    });

  } catch (error) {
    console.error("Assessment error:", error);

    res.status(500).json({
      error: "Failed to analyze assessment",
    });
  }
});

export default router;

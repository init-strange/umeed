const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const { calculateScores } = require('../utils/scoring');

router.post('/assessment', async (req, res) => {
  try {
    const { answers, userId } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Answers JSON is required' });
    }

    const { scores, severity, needsImmediateSupport } = calculateScores(answers);
    let aiAnalysis = '';

    if (needsImmediateSupport) {
      aiAnalysis =
        'Aapne bataya hai ki aapke man mein khud ko nuksaan pahunchane wale vichaar aaye hain. ' +
        'Aap akele nahi hain. Kripya turant kisi vishwasneeya vyakti ya helpline se sampark karein.';
    } else {
      const prompt = `You are a warm, supportive wellness assistant for an Indian mental-health app.
Based on these screening scores, write a short (under 150 words) summary in Hinglish.
Do NOT diagnose. Be encouraging. If severity is "Moderate" or above, gently suggest talking to a counsellor.

Scores: ${JSON.stringify(scores)}
Severity: ${JSON.stringify(severity)}`;

      const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const aiData = await aiResponse.json();
      aiAnalysis = aiData?.content?.[0]?.text || 'Abhi analysis generate nahi ho paaya.';
    }

    const assessment = await Assessment.create({
      userId: userId || undefined,
      answers,
      scores,
      severity,
      needsImmediateSupport,
      aiAnalysis,
    });

    res.json({ id: assessment._id, scores, severity, needsImmediateSupport, aiAnalysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/assessment/:userId', async (req, res) => {
  try {
    const history = await Assessment.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

module.exports = router;
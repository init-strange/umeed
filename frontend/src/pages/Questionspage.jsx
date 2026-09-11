import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const categoryOrder = ['PHQ-4', 'WHO-5', 'GAD-7', 'PHQ-9', 'PCL-5'];
const categoryLabels = {
  'PHQ-4': 'Quick Check-in',
  'WHO-5': 'Overall Well-being',
  'GAD-7': 'Anxiety Screening',
  'PHQ-9': 'Mood Screening',
  'PCL-5': 'Stressful Experience Screening',
};

const Questionspage = () => {
  const navigate = useNavigate();

  const [allQuestions, setAllQuestions] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/questions`)
      .then((res) => res.json())
      .then((data) => setAllQuestions(data))
      .catch((err) => console.error('Failed to load questions:', err));
  }, []);

  const getOptions = (setId) => {
    if (setId === 'WHO-5') {
      return [
        { label: 'At no time', value: 0 },
        { label: 'Some of the time', value: 1 },
        { label: 'Less than half of the time', value: 2 },
        { label: 'More than half of the time', value: 3 },
        { label: 'Most of the time', value: 4 },
        { label: 'All of the time', value: 5 },
      ];
    }
    if (setId === 'PCL-5') {
      return [
        { label: 'Not at all', value: 0 },
        { label: 'A little bit', value: 1 },
        { label: 'Moderately', value: 2 },
        { label: 'Quite a bit', value: 3 },
        { label: 'Extremely', value: 4 },
      ];
    }
    return [
      { label: 'Not at all', value: 0 },
      { label: 'Several days', value: 1 },
      { label: 'More than half the days', value: 2 },
      { label: 'Nearly every day', value: 3 },
    ];
  };

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handleNext = async () => {
    if (stepIndex < categoryOrder.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    // Last category — submit everything to the backend
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          userId: localStorage.getItem('userId'),
        }),
      });

      const result = await res.json();
      navigate('/analysis', { state: { result } });
    } catch (error) {
      console.error(error);
      alert('Kuch gadbad ho gayi, dobara try karein.');
    } finally {
      setSubmitting(false);
    }
  };

  if (allQuestions.length === 0) {
    return (
      <div className="page question-page">
        <p>Loading questions...</p>
      </div>
    );
  }

  const currentCategory = categoryOrder[stepIndex];
  const currentQuestions = allQuestions.filter((q) => q.set_id === currentCategory);
  const allCurrentAnswered = currentQuestions.every(
    (q) => answers[q.question_id] !== undefined
  );

  return (
    <div className="page question-page">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="question-card">
        {/* Progress Bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${((stepIndex + 1) / categoryOrder.length) * 100}%` }}
          ></div>
        </div>
        <span className="step-count">
          Kadam {stepIndex + 1} of {categoryOrder.length} — {categoryLabels[currentCategory]}
        </span>

        <div className="step-content">
          {currentQuestions.map((q) => (
            <div className="question-block" key={q.question_id}>
              <h2 className="question-title">{q.question_text}</h2>
              <div className="chip-group">
                {getOptions(q.set_id).map((opt) => (
                  <button
                    key={opt.value}
                    className={`chip-btn ${
                      answers[q.question_id] === opt.value ? 'selected' : ''
                    }`}
                    onClick={() => handleSelect(q.question_id, opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="action-row">
          {stepIndex > 0 && (
            <button className="back-btn" onClick={handleBack}>
              ← Peeche
            </button>
          )}
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={!allCurrentAnswered || submitting}
          >
            {submitting
              ? 'Analysis ban rahi hai...'
              : stepIndex === categoryOrder.length - 1
              ? 'Analysis Dekhein ✨'
              : 'Aage Badhein →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionspage

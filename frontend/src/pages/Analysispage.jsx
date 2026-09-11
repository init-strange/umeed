import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Analysispage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="page analysis-page">
        <div className="analysis-container">
          <h1 className="analysis-title">Koi result nahi mila</h1>
          <p className="analysis-subtitle">Pehle check-in poora karein.</p>
          <button className="restart-btn" onClick={() => navigate('/questions')}>
            Check-in Shuru Karein
          </button>
        </div>
      </div>
    );
  }

  const { scores, severity, needsImmediateSupport, aiAnalysis } = result;

  return (
    <div className="page analysis-page">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="analysis-container">
        {needsImmediateSupport && (
          <div className="crisis-banner">
            <h2>Aap akele nahi hain 💛</h2>
            <p>
              Agar aapke man mein khud ko nuksaan pahunchane ke vichaar aa rahe hain,
              kripya abhi kisi se baat karein:
            </p>
            <ul>
              <li>KIRAN Mental Health Helpline: <strong>1800-599-0019</strong> (24x7)</li>
              <li>iCall: <strong>9152987821</strong></li>
              <li>Vandrevala Foundation: <strong>1860-2662-345</strong></li>
            </ul>
          </div>
        )}

        <div className="analysis-badge">🌿 Sukoon Analysis</div>
        <h1 className="analysis-title">Aapki Emotional Health</h1>
        <p className="analysis-subtitle">
          Aapke check-in ke aadhar par ek chhota sa report
        </p>

        <div className="score-grid">
          <ScoreCard label="Anxiety (PHQ-4)" score={scores.phq4} severity={severity.phq4} />
          <ScoreCard label="Well-being (WHO-5)" score={scores.who5} severity={severity.who5} />
          <ScoreCard label="Anxiety (GAD-7)" score={scores.gad7} severity={severity.gad7} />
          <ScoreCard label="Mood (PHQ-9)" score={scores.phq9} severity={severity.phq9} />
          <ScoreCard label="Stress Response (PCL-5)" score={scores.pcl5} severity={severity.pcl5} />
        </div>

        <h3 className="section-label">Aapke Liye Sujhav</h3>
        <div className="ai-analysis-card">
          <p>{aiAnalysis}</p>
        </div>

        <button className="restart-btn" onClick={() => navigate('/')}>
          Home Par Wapas Jaayein 🔄
        </button>
      </div>
    </div>
  );
};

const ScoreCard = ({ label, score, severity }) => {
  return (
    <div className="mini-score-card">
      <span className="mini-score-label">{label}</span>
      <span className="mini-score-value">{score}</span>
      <span className="mini-score-severity">{severity}</span>
    </div>
  );
};

export default Analysispage

import React from 'react'
import './Homepage.css'

const Homepage = ({ onStart }) => {
  return (
    <div className="page home-page">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="home-content">
        <div className="logo-wrap">
          <span className="logo-icon">🌿</span>
          <h1 className="app-logo">Umeed</h1>
        </div>
        <p className="app-tagline">Ek kadam sukoon ki taraf</p>

        <div className="quote-card">
          <span className="quote-icon">"</span>
          <p className="quote-text">
            Har mushkil ke baad aasaani hai. Apne man ko thoda waqt dein.
          </p>
        </div>

        <button className="start-btn" onClick={onStart}>
          Check-in Shuru Karein <span className="btn-arrow">→</span>
        </button>

        <p className="trust-note">🔒 Aapki privacy hamari 100% priority hai</p>
      </div>
    </div>
  )
}

export default Homepage
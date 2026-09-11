const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: { type: mongoose.Schema.Types.Mixed, required: true },
  scores: { type: mongoose.Schema.Types.Mixed },
  severity: { type: mongoose.Schema.Types.Mixed },
  needsImmediateSupport: { type: Boolean, default: false },
  aiAnalysis: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
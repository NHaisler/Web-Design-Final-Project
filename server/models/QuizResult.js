const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema({
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
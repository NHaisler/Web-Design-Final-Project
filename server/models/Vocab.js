const mongoose = require('mongoose');

const VocabSchema = new mongoose.Schema({
  kanji: { type: String, required: true },
  hiragana: { type: String, required: true },
  english: { type: String, required: true },
  level: { type: String, enum: ['N1', 'N2', 'N3', 'N4', 'N5'], default: 'N5' },
  tags: [{ type: String }] // New: Array of strings (e.g. ["verb", "food"])
});

module.exports = mongoose.model('Vocab', VocabSchema);
const express = require('express');
const router = express.Router();
const Vocab = require('../models/Vocab');
const QuizResult = require('../models/QuizResult');

// 1. GET RANDOM QUIZ (With Filters)
// Usage: GET /api/quiz?count=5&level=N5&tag=food
router.get('/quiz', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;
    const level = req.query.level;
    const tag = req.query.tag;

    // Build Filter Object
    let matchStage = {};
    if (level && level !== 'All') matchStage.level = level;
    if (tag) matchStage.tags = tag;

    // Aggregation Pipeline: Filter first -> Then Randomize
    const pipeline = [
      { $match: matchStage },
      { $sample: { size: count * 4 } } // Fetch extra for wrong answers
    ];

    const randomVocab = await Vocab.aggregate(pipeline);
    res.json(randomVocab);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. SAVE RESULT
router.post('/results', async (req, res) => {
  try {
    const newResult = new QuizResult(req.body);
    await newResult.save();
    res.json(newResult);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. GET STATS
router.get('/results', async (req, res) => {
  try {
    const results = await QuizResult.find().sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. GET ALL VOCAB
router.get('/vocab', async (req, res) => {
  try {
    const vocab = await Vocab.find();
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. ADD VOCAB (With Tags)
router.post('/vocab', async (req, res) => {
  try {
    const newWord = new Vocab(req.body);
    await newWord.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 6. DELETE VOCAB
router.delete('/vocab/:id', async (req, res) => {
  try {
    await Vocab.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
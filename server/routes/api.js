const express = require('express');
const router = express.Router();
const Vocab = require('../models/Vocab');
const QuizResult = require('../models/QuizResult');

router.get('/quiz', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;
    const level = req.query.level;
    const tag = req.query.tag;

    
    let matchStage = {};
    if (level && level !== 'All') matchStage.level = level;
    if (tag) matchStage.tags = tag;

    const pipeline = [
      { $match: matchStage },
      { $sample: { size: count * 4 } }
    ];

    const randomVocab = await Vocab.aggregate(pipeline);
    res.json(randomVocab);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/results', async (req, res) => {
  try {
    const newResult = new QuizResult(req.body);
    await newResult.save();
    res.json(newResult);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/results', async (req, res) => {
  try {
    const results = await QuizResult.find().sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/vocab', async (req, res) => {
  try {
    const vocab = await Vocab.find();
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/vocab', async (req, res) => {
  try {
    const newWord = new Vocab(req.body);
    await newWord.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/vocab/:id', async (req, res) => {
  try {
    await Vocab.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
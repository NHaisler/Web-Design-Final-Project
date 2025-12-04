require('dotenv').config();
const mongoose = require('mongoose');
const Vocab = require('./models/Vocab');

const sampleData = [
  { kanji: '猫', hiragana: 'ねこ', english: 'Cat' },
  { kanji: '犬', hiragana: 'いぬ', english: 'Dog' },
  { kanji: '本', hiragana: 'ほん', english: 'Book' },
  { kanji: '学生', hiragana: 'がくせい', english: 'Student' },
  { kanji: '先生', hiragana: 'せんせい', english: 'Teacher' },
  { kanji: '水', hiragana: 'みず', english: 'Water' },
  { kanji: '食べる', hiragana: 'たべる', english: 'To Eat' },
  { kanji: '見る', hiragana: 'みる', english: 'To See' },
  { kanji: '行く', hiragana: 'いく', english: 'To Go' },
  { kanji: '私', hiragana: 'わたし', english: 'I / Me' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB...');
    // Clear existing data
    await Vocab.deleteMany({});
    console.log('Cleared old vocab.');
    
    // Insert new data
    await Vocab.insertMany(sampleData);
    console.log('✅ Added sample vocab!');
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
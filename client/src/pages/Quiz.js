import React, { useState, useEffect} from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const TAG_OPTIONS = [
  "Abstract", "Adjective", "Adverb", "Business", "Communication", 
  "Culture", "Daily Life", "Economics", "Education", "Feeling", 
  "Food", "Health", "Nature", "Objects", "People", 
  "Places", "Politics", "School", "Science", "Society", 
  "Sports", "Technology", "Time", "Transport", "Travel", 
  "Verb", "Work"
];

const Quiz = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const [settings, setSettings] = useState({
    count: 10,
    level: 'All',
    tag: 'All'
  });

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
      const fetchTags = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/tags`);
          setAvailableTags(res.data);
        } catch (err) {
          console.error("Error fetching tags:", err);
        }
      };
      fetchTags();
}, []);


  const startQuiz = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/api/quiz?count=${settings.count}`;
      if (settings.level !== 'All') url += `&level=${settings.level}`;
      if (settings.tag !== 'All') url += `&tag=${settings.tag}`;

      const res = await axios.get(url);
      const allVocab = res.data;

      if (allVocab.length < 4) {
        alert(`Not enough words found! Found ${allVocab.length}. Need at least 4. Try changing filters.`);
        setLoading(false);
        return;
      }

      const selectedQuestions = allVocab.slice(0, settings.count);
      const quizData = selectedQuestions.map((q) => {
        const distractors = allVocab
          .filter(w => w._id !== q._id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        
        const options = [...distractors, q].sort(() => 0.5 - Math.random());
        return { ...q, options };
      });

      setQuestions(quizData);
      setGameStarted(true);
      setCurrentIndex(0);
      setScore(0);
      setShowScore(false);
    } catch (err) {
      console.error(err);
      alert("Error starting quiz");
    }
    setLoading(false);
  };

  const handleAnswerClick = (option) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setSelectedAnswer(option);

    const currentQ = questions[currentIndex];
    const isCorrect = option._id === currentQ._id;
    const newScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      setScore(newScore);
      setSelectedAnswer(null);
      setIsProcessing(false);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowScore(true);
        saveScore(newScore);
      }
    }, 500);
  };

  const saveScore = async (finalScore) => {
    const total = questions.length;
    const percentage = Math.round((finalScore / total) * 100);
    try {
      await axios.post(`${API_BASE_URL}/api/results`, {
        score: finalScore,
        total: total,
        percentage: percentage
      });
    } catch (err) { console.error(err); }
  };

  const getButtonColor = (option) => {
    if (!selectedAnswer) return '#007bff';
    if (option._id === questions[currentIndex]._id) return '#28a745';
    if (option._id === selectedAnswer._id) return '#dc3545';
    return '#6c757d';
  };

  if (loading) return <h2 style={{textAlign:'center', marginTop:'50px'}}>Loading Quiz...</h2>;

if (showScore) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Quiz Complete!</h1>
        <h2>Score: {score} / {questions.length} ({percentage}%)</h2>
        <button onClick={() => setGameStarted(false)} style={{ padding: '10px 20px', fontSize: '1.2rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        New Quiz
        </button>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{textAlign:'center'}}>Quiz Setup</h1>
        
        <div style={{ marginBottom: '30px' }}>
          <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>Category (Tag):</label>
          <select 
            value={settings.tag} 
            onChange={(e) => setSettings({...settings, tag: e.target.value})}
            style={{ width:'100%', padding:'10px', boxSizing:'border-box'}}
          >
            <option value="All">All Categories</option>
            {availableTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>Difficulty Level:</label>
          <select 
            value={settings.level} 
            onChange={(e) => setSettings({...settings, level: e.target.value})}
            style={{ width:'100%', padding:'10px', boxSizing:'border-box'}}
          >
            <option value="All">Mix (All Levels)</option>
            <option value="N5">N5 (Beginner)</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1 (Advanced)</option>
          </select>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>Category (Tag):</label>
          <select 
            value={settings.tag} 
            onChange={(e) => setSettings({...settings, tag: e.target.value})}
            style={{ width:'100%', padding:'10px', boxSizing:'border-box'}}
          >
            <option value="All">All Categories</option>
            {TAG_OPTIONS.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={startQuiz} 
          style={{ width:'100%', padding:'15px', fontSize:'1.2rem', background:'#007bff', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' }}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <span>Question {currentIndex + 1} / {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div style={{ border: '2px solid #333', padding: '40px', borderRadius: '15px', marginBottom: '30px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '4rem', margin: '10px 0' }}>{currentQ.kanji}</h1>
        <p style={{ color: '#666', fontSize: '1.5rem', marginTop: '0' }}>({currentQ.hiragana})</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {currentQ.options.map((opt) => (
          <button
            key={opt._id}
            onClick={() => handleAnswerClick(opt)}
            disabled={isProcessing}
            style={{
              padding: '20px',
              fontSize: '1.2rem',
              cursor: isProcessing ? 'default' : 'pointer',
              backgroundColor: getButtonColor(opt),
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s',
              opacity: (isProcessing && opt._id !== selectedAnswer?._id && opt._id !== currentQ._id) ? 0.6 : 1
            }}
          >
            {opt.english}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
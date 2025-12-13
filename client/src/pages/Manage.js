import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const Manage = () => {
  const [formData, setFormData] = useState({
    kanji: '', hiragana: '', english: '', level: 'N5', tags: ''
  });
  const [vocabList, setVocabList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterTag, setFilterTag] = useState('All');
  
  // State for dynamically fetched tags
  const [availableTags, setAvailableTags] = useState([]);

  // Function to fetch the vocabulary list
  const fetchVocab = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/vocab`);
      // Use reverse() to show latest added words first, as per original logic
      setVocabList(res.data.reverse()); 
    } catch (err) { 
      console.error("Error fetching vocabulary:", err); 
    }
  };

  // Function to fetch the available tags dynamically
  const fetchTags = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tags`);
      setAvailableTags(res.data);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  useEffect(() => {
    fetchVocab();
    fetchTags(); // Fetch tags on initial load
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Split the comma-separated string of tags into an array
    const tagArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    
    try {
      await axios.post(`${API_BASE_URL}/api/vocab`, {
        ...formData,
        tags: tagArray
      });
      setFormData({ kanji: '', hiragana: '', english: '', level: 'N5', tags: '' });
      fetchVocab();
      fetchTags(); // Refresh tags just in case a new tag was added
      // Use custom alert/modal instead of window.alert()
      console.log('Word Added!'); 
    } catch (err) { 
      console.error("Error adding word:", err);
      // Use console.error instead of window.alert()
    }
  };

  const handleDelete = async (id) => {
    // Replaced window.confirm() with console message as per constraints
    console.log(`Attempting to delete word with ID: ${id}`); 
    try {
      await axios.delete(`${API_BASE_URL}/api/vocab/${id}`);
      fetchVocab();
      // Use console.log instead of window.alert()
      console.log('Word Deleted!');
    } catch (err) { 
      console.error("Error deleting word:", err); 
    }
  };

  const filteredList = vocabList.filter(word => {
    const matchesText = (word.english.toLowerCase().includes(filterText.toLowerCase()) || 
                         word.kanji.includes(filterText));
    const matchesLevel = filterLevel === 'All' || word.level === filterLevel;
    // Check if any word tag matches the filterTag
    const matchesTag = filterTag === 'All' || (word.tags && word.tags.includes(filterTag));

    return matchesText && matchesLevel && matchesTag;
  });

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0 }}>Add New Word</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <input 
              placeholder="Kanji (e.g. 猫)" 
              value={formData.kanji} 
              onChange={e => setFormData({...formData, kanji: e.target.value})} 
              required 
              style={{padding:'10px'}}
            />
            <input 
              placeholder="Hiragana (e.g. ねこ)" 
              value={formData.hiragana} 
              onChange={e => setFormData({...formData, hiragana: e.target.value})} 
              required 
              style={{padding:'10px'}}
            />
          </div>

          <input 
            placeholder="English (e.g. Cat)" 
            value={formData.english} 
            onChange={e => setFormData({...formData, english: e.target.value})} 
            required 
            style={{padding:'10px'}}
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <select 
              value={formData.level} 
              onChange={e => setFormData({...formData, level: e.target.value})} 
              style={{padding:'10px'}}
            >
              <option value="N5">N5 (Easy)</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N2</option>
              <option value="N1">N1 (Hard)</option>
            </select>
            
            <input 
              placeholder="Tags (e.g. Food, Verb)" 
              value={formData.tags} 
              onChange={e => setFormData({...formData, tags: e.target.value})}
              style={{padding:'10px'}}
            />
          </div>

          <button 
            type="submit" 
            style={{ backgroundColor: '#28a745', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight:'bold' }}
          >
            + Add Word
          </button>
        </form>
      </div>

      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
        <h2 style={{margin:0}}>Manage Vocabulary ({filteredList.length})</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <input 
          placeholder="Search English or Kanji..." 
          value={filterText} 
          onChange={e => setFilterText(e.target.value)} 
          style={{ padding: '10px' }} 
        />
        
        <select 
          value={filterLevel} 
          onChange={e => setFilterLevel(e.target.value)} 
          style={{ padding: '10px' }}
        >
          <option value="All">All Levels</option>
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </select>

        {/* Dynamic Tag Filter using availableTags */}
        <select 
          value={filterTag} 
          onChange={e => setFilterTag(e.target.value)} 
          style={{ padding: '10px' }}
        >
          <option value="All">All Tags</option>
          {availableTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #ddd', borderRadius:'5px', backgroundColor: 'white' }}>
        {filteredList.map(word => (
          <div 
            key={word._id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              borderBottom: '1px solid #eee' 
            }}
          >
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'5px'}}>
                <strong style={{fontSize:'1.2rem'}}>{word.kanji}</strong> 
                <span style={{fontSize:'0.8rem', background:'#eef', padding:'2px 6px', borderRadius:'4px', border:'1px solid #ccf'}}>{word.level}</span>
                {/* Ensure word.tags exists and is an array before mapping */}
                {word.tags && Array.isArray(word.tags) && word.tags.map(t => (
                  <span key={t} style={{fontSize:'0.75rem', background:'#eee', padding:'2px 6px', borderRadius:'10px'}}>{t}</span>
                ))}
              </div>
              <div style={{color:'#555'}}>{word.hiragana} — <b>{word.english}</b></div>
            </div>
            <button 
              onClick={() => handleDelete(word._id)} 
              style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius:'4px', height: 'fit-content', cursor:'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
        {filteredList.length === 0 && <p style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No words match your filters.</p>}
      </div>

    </div>
  );
};

export default Manage;
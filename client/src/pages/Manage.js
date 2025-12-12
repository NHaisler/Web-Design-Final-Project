import React, { useState, useEffect } from 'react';
import axios from 'axios';

// The common tags from your dataset
const TAG_OPTIONS = [
  "Abstract", "Adjective", "Adverb", "Business", "Communication", 
  "Culture", "Daily Life", "Economics", "Education", "Feeling", 
  "Food", "Health", "Nature", "Objects", "People", 
  "Places", "Politics", "School", "Science", "Society", 
  "Sports", "Technology", "Time", "Transport", "Travel", 
  "Verb", "Work"
];

const Manage = () => {
  // Form State
  const [formData, setFormData] = useState({
    kanji: '', hiragana: '', english: '', level: 'N5', tags: ''
  });

  // Data State
  const [vocabList, setVocabList] = useState([]);
  
  // Filter State
  const [filterText, setFilterText] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterTag, setFilterTag] = useState('All');

  useEffect(() => {
    fetchVocab();
  }, []);

  const fetchVocab = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vocab');
      setVocabList(res.data.reverse()); // Newest first
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Allow user to select a tag from a dropdown, OR type one manually if they want
    const tagArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    
    try {
      await axios.post('http://localhost:5000/api/vocab', {
        ...formData,
        tags: tagArray
      });
      setFormData({ kanji: '', hiragana: '', english: '', level: 'N5', tags: '' });
      fetchVocab();
      alert('✅ Word Added!');
    } catch (err) { alert('Error adding word'); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this word?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/vocab/${id}`);
      fetchVocab();
    } catch (err) { console.error(err); }
  };

  // --- FILTER LOGIC ---
  const filteredList = vocabList.filter(word => {
    const matchesText = (word.english.toLowerCase().includes(filterText.toLowerCase()) || 
                         word.kanji.includes(filterText));
    const matchesLevel = filterLevel === 'All' || word.level === filterLevel;
    const matchesTag = filterTag === 'All' || (word.tags && word.tags.includes(filterTag));

    return matchesText && matchesLevel && matchesTag;
  });

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      
      {/* ADD NEW WORD SECTION */}
      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0 }}>Add New Word</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <input placeholder="Kanji (e.g. 猫)" value={formData.kanji} onChange={e => setFormData({...formData, kanji: e.target.value})} required style={{padding:'10px'}}/>
            <input placeholder="Hiragana (e.g. ねこ)" value={formData.hiragana} onChange={e => setFormData({...formData, hiragana: e.target.value})} required style={{padding:'10px'}}/>
          </div>

          <input placeholder="English (e.g. Cat)" value={formData.english} onChange={e => setFormData({...formData, english: e.target.value})} required style={{padding:'10px'}}/>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} style={{padding:'10px'}}>
              <option value="N5">N5 (Easy)</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N2</option>
              <option value="N1">N1 (Hard)</option>
            </select>
            
            {/* Simple text input for tags for now, or you could make this a multi-select */}
            <input 
              placeholder="Tags (e.g. Food, Verb)" 
              value={formData.tags} 
              onChange={e => setFormData({...formData, tags: e.target.value})}
              style={{padding:'10px'}}
            />
          </div>

          <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight:'bold' }}>+ Add Word</button>
        </form>
      </div>

      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

      {/* MANAGE / SEARCH SECTION */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
        <h2 style={{margin:0}}>Manage Vocabulary ({filteredList.length})</h2>
      </div>

      {/* FILTER BAR */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <input 
          placeholder="🔍 Search English or Kanji..." 
          value={filterText} 
          onChange={e => setFilterText(e.target.value)} 
          style={{ padding: '10px' }} 
        />
        
        <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} style={{ padding: '10px' }}>
          <option value="All">All Levels</option>
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </select>

        <select value={filterTag} onChange={e => setFilterTag(e.target.value)} style={{ padding: '10px' }}>
          <option value="All">All Tags</option>
          {TAG_OPTIONS.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* LIST */}
      <div style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #ddd', borderRadius:'5px', backgroundColor: 'white' }}>
        {filteredList.map(word => (
          <div key={word._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee' }}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'5px'}}>
                <strong style={{fontSize:'1.2rem'}}>{word.kanji}</strong> 
                <span style={{fontSize:'0.8rem', background:'#eef', padding:'2px 6px', borderRadius:'4px', border:'1px solid #ccf'}}>{word.level}</span>
                {word.tags && word.tags.map(t => (
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
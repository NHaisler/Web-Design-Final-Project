import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Add = () => {
  const [formData, setFormData] = useState({
    kanji: '', hiragana: '', english: '', level: 'N5', tags: ''
  });
  const [vocabList, setVocabList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchVocab(); }, []);

  const fetchVocab = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vocab');
      setVocabList(res.data.reverse());
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert comma string "food, verb" -> Array ["food", "verb"]
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

  const filteredList = vocabList.filter(word =>
    word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.kanji.includes(searchTerm)
  );

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2>Add New Word</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            <input placeholder="Kanji (e.g. 猫)" value={formData.kanji} onChange={e => setFormData({...formData, kanji: e.target.value})} required />
            <input placeholder="Hiragana (e.g. ねこ)" value={formData.hiragana} onChange={e => setFormData({...formData, hiragana: e.target.value})} required />
          </div>

          <input placeholder="English (e.g. Cat)" value={formData.english} onChange={e => setFormData({...formData, english: e.target.value})} required />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px'}}>
            <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}>
              <option value="N5">N5 (Easy)</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N2</option>
              <option value="N1">N1 (Hard)</option>
            </select>
            <input placeholder="Tags (comma separated: food, verb...)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
          </div>

          <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ Add Word</button>
        </form>
      </div>

      <hr style={{ margin: '30px 0', borderTop: '1px solid #ccc' }} />

      <h3>Manage ({vocabList.length})</h3>
      <input placeholder="🔍 Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' }} />
      
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', backgroundColor: 'white' }}>
        {filteredList.map(word => (
          <div key={word._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
            <div>
              <strong>{word.kanji}</strong> <span style={{fontSize:'0.8rem', background:'#eee', padding:'2px 5px', borderRadius:'4px'}}>{word.level}</span>
              <div style={{color:'#666'}}>{word.english}</div>
              <div style={{fontSize:'0.8rem', color:'#888'}}>{word.tags?.join(', ')}</div>
            </div>
            <button onClick={() => handleDelete(word._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', height: 'fit-content' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Add;
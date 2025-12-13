import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Stats from './pages/Stats';
import Manage from './pages/Manage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/manage" element={<Manage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    background: '#282c34',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    color: 'white'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  };

  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to="/">🏠 Home</Link>
      <Link style={linkStyle} to="/quiz">📝 Quiz</Link>
      <Link style={linkStyle} to="/stats">📊 Stats</Link>
      <Link style={linkStyle} to="/manage">⚙️ Manage</Link>
    </nav>
  );
};

export default Navbar;
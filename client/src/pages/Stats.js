import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import API_BASE_URL from '../config'; // <--- NEW IMPORT

const Stats = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use API_BASE_URL
      const res = await axios.get(`${API_BASE_URL}/api/results`);
      // Format date for the chart
      const formattedData = res.data.map((item, index) => ({
        name: `Quiz ${index + 1}`,
        score: item.score,
        date: new Date(item.date).toLocaleDateString()
      }));
      setResults(formattedData);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>📊 Your Progress</h1>
      {results.length === 0 ? (
        <p>No quizzes taken yet. Go take a quiz!</p>
      ) : (
        <div style={{ width: '100%', height: 400, marginTop: '30px' }}>
          <ResponsiveContainer>
            <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Stats;
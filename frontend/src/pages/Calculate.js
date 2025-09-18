import React, { useState } from 'react';
import { calorieAPI } from '../services/api';

const Calculate = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activity_level: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await calorieAPI.calculateCalories(formData);
      setResults(response.data);
    } catch (err) {
      setError('Error calculating calories. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-split">
      <div className="card-left">
        <h2>Calculate Your Calories</h2>
        
        {error && (
          <div style={{ 
            background: '#ff6b6b', 
            color: 'white', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem' 
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="1"
              step="0.1"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              min="1"
              step="0.1"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="activity_level">Activity Level</label>
            <select
              id="activity_level"
              name="activity_level"
              value={formData.activity_level}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity Level</option>
              <option value="1.2">Sedentary (little/no exercise)</option>
              <option value="1.375">Light (light exercise 1-3 days/week)</option>
              <option value="1.55">Moderate (moderate exercise 3-5 days/week)</option>
              <option value="1.725">Active (hard exercise 6-7 days/week)</option>
              <option value="1.9">Very Active (very hard exercise, physical job)</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
        </form>
      </div>
      
      <div className="card-right">
        <h3>Your Results</h3>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          {results ? (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <div className="result-label">BMR (Basal Metabolic Rate)</div>
                <div className="result-value">{Math.round(results.bmr)}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>calories/day at rest</div>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <div className="result-label">TDEE (Total Daily Energy)</div>
                <div className="result-value">{Math.round(results.tdee)}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>calories/day with activity</div>
              </div>
              
              <button className="btn" style={{ 
                background: 'var(--bright-teal)', 
                color: 'white', 
                width: '100%' 
              }}>
                Start Tracking Food
              </button>
            </>
          ) : (
            <>
              <div style={{ opacity: 0.7, marginBottom: '2rem' }}>
                Fill out the form to see your personalized calorie calculations
              </div>
              
              <div style={{ 
                border: '2px dashed rgba(255,255,255,0.3)', 
                borderRadius: '12px', 
                padding: '2rem', 
                margin: '1rem 0' 
              }}>
                <div className="result-label">BMR</div>
                <div className="result-value">---</div>
              </div>
              
              <div style={{ 
                border: '2px dashed rgba(255,255,255,0.3)', 
                borderRadius: '12px', 
                padding: '2rem', 
                margin: '1rem 0' 
              }}>
                <div className="result-label">TDEE</div>
                <div className="result-value">---</div>
              </div>
              
              <button className="btn" style={{ 
                background: 'var(--bright-teal)', 
                color: 'white', 
                width: '100%',
                opacity: 0.5
              }} disabled>
                Calculate First
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculate;

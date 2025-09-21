import React, { useState } from 'react';
import { Calculator, BarChart } from 'lucide-react';
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
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="card-split">
        <div className="card-left">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 className="gradient-text-primary">Calculate Your Calories</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Enter your information to calculate your daily calorie needs
            </p>
          </div>
          
          {error && (
            <div className="error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Age (years)</label>
              <input
                type="number"
                name="age"
                placeholder="25"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
                  <label htmlFor="male" style={{ marginBottom: 0, cursor: 'pointer' }}>Male</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                  <label htmlFor="female" style={{ marginBottom: 0, cursor: 'pointer' }}>Female</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                placeholder="70"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                placeholder="175"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Activity Level</label>
              <select
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
              disabled={loading}
              className="btn-modern"
              style={{ background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {loading ? (
                <>
                  <div className="loading-spinner" style={{ width: '1.25rem', height: '1.25rem' }}></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator size={20} />
                  Calculate My Calories
                </>
              )}
            </button>
          </form>
        </div>

        <div className="card-right">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'white' }}>Your Results</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Your calculated daily calorie needs
            </p>
          </div>
          
          {results ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                  Basal Metabolic Rate (BMR)
                </div>
                <div className="result-value">
                  {Math.round(results.bmr)}
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>calories/day</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem' }}>
                  Calories burned at rest
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                  Total Daily Energy Expenditure (TDEE)
                </div>
                <div className="result-value">
                  {Math.round(results.tdee)}
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>calories/day</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem' }}>
                  Total calories needed to maintain weight
                </div>
              </div>

              <button 
                className="btn-modern"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: 'var(--blue-primary)',
                  marginBottom: '1.5rem'
                }}
              >
                Start Tracking Food
              </button>

              <div style={{ fontSize: '0.75rem', opacity: 0.7, lineHeight: '1.5' }}>
                <div>• To lose weight: eat 300-500 calories below TDEE</div>
                <div>• To gain weight: eat 300-500 calories above TDEE</div>
                <div>• To maintain weight: eat close to your TDEE</div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <BarChart style={{ width: '3rem', height: '3rem', opacity: 0.2, margin: '0 auto 1rem auto', color: 'white' }} />
              <div style={{ fontSize: '1.125rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                Fill out the form to see your results
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.6, lineHeight: '1.5' }}>
                We'll calculate your BMR and TDEE based on the Mifflin-St Jeor equation
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculate;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calorieAPI } from '../services/api';

const AddFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food_name: '',
    calories_per_100g: '',
    quantity: '',
    meal_type: '',
    date: '',
    time: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Search food database when typing food name
    if (name === 'food_name' && value.length >= 2) {
      searchFood(value);
    } else if (name === 'food_name' && value.length < 2) {
      setShowResults(false);
    }
  };

  const searchFood = async (query) => {
    try {
      const response = await calorieAPI.searchFood(query);
      setSearchResults(response.data);
      setShowResults(response.data.length > 0);
    } catch (error) {
      console.error('Error searching food:', error);
    }
  };

  const selectFood = (food) => {
    setFormData({
      ...formData,
      food_name: food.name,
      calories_per_100g: food.calories_per_100g
    });
    setShowResults(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = { ...formData };
      
      // Create timestamp if date and time provided
      if (formData.date && formData.time) {
        submitData.timestamp = `${formData.date}T${formData.time}:00`;
      }

      await calorieAPI.addFoodEntry(submitData);
      navigate('/tracker');
    } catch (err) {
      setError('Error adding food entry. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add Food Entry</h2>
      
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
          <label htmlFor="food_name">Food Name</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id="food_name"
              name="food_name"
              value={formData.food_name}
              onChange={handleChange}
              placeholder="Search for food or enter custom name"
              required
            />
            {showResults && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #ddd',
                borderTop: 'none',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000,
                borderRadius: '0 0 8px 8px'
              }}>
                {searchResults.map((food, index) => (
                  <div
                    key={index}
                    onClick={() => selectFood(food)}
                    style={{
                      padding: '0.75rem',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    <strong>{food.name}</strong> - {food.calories_per_100g} cal/100g
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="calories_per_100g">Calories per 100g</label>
          <input
            type="number"
            id="calories_per_100g"
            name="calories_per_100g"
            value={formData.calories_per_100g}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity (grams)</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="meal_type">Meal Type</label>
          <select
            id="meal_type"
            name="meal_type"
            value={formData.meal_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Meal Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="date">Date (optional)</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Time (optional)</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Food Entry'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/tracker')}
            className="btn btn-secondary"
          >
            View Tracker
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;

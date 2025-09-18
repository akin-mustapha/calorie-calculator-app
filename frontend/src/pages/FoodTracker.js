import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { calorieAPI } from '../services/api';

const FoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFoodEntries();
  }, [selectedDate]);

  const fetchFoodEntries = async () => {
    setLoading(true);
    try {
      const response = await calorieAPI.getFoodEntries(selectedDate);
      setFoodData(response.data);
    } catch (error) {
      console.error('Error fetching food entries:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h2>Food Tracker</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '2px solid var(--bright-teal)',
            borderRadius: '8px'
          }}
        />
      </div>
      
      {foodData && foodData.entries.length > 0 ? (
        <div className="card-split" style={{ marginBottom: '2rem' }}>
          <div className="card-left">
            <h3>Today's Meals</h3>
            
            {foodData.entries.map((entry, index) => (
              <div key={index} className="food-entry">
                <div>
                  <strong>{entry.food_name}</strong>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {entry.quantity_grams}g
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="meal-type">{entry.meal_type}</span>
                  <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>
                    {Math.round(entry.calories)} cal
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="card-right">
            <h3>Daily Summary</h3>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <div className="result-label">Total Calories</div>
              <div className="result-value">{Math.round(foodData.total_calories)}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '2rem' }}>
                consumed today
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div className="result-label">Meals Logged</div>
                <div style={{ 
                  fontSize: '2rem', 
                  color: 'var(--bright-teal)', 
                  fontWeight: 600 
                }}>
                  {foodData.entries.length}
                </div>
              </div>
              
              <Link to="/add-food" className="btn" style={{
                background: 'var(--bright-teal)',
                color: 'white',
                width: '100%',
                textDecoration: 'none'
              }}>
                Add More Food
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: 'var(--text-secondary)' 
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
          <h3>No meals logged for {selectedDate}</h3>
          <p>Start tracking your food intake to see your daily summary</p>
          <Link 
            to="/add-food" 
            className="btn btn-primary" 
            style={{ marginTop: '1rem', textDecoration: 'none' }}
          >
            Add Your First Meal
          </Link>
        </div>
      )}
    </div>
  );
};

export default FoodTracker;

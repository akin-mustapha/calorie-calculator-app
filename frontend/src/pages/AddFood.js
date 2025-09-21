import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Sunrise, Sun, Moon, Apple } from 'lucide-react';
import { calorieAPI } from '../services/api';

const AddFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food_name: '',
    quantity: '',
    meal_type: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFoodSearch = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await calorieAPI.searchFood(query);
      setSearchResults(response.data.foods || []);
    } catch (error) {
      console.error('Error searching food:', error);
    }
  };

  const selectFood = (food) => {
    setFormData({
      ...formData,
      food_name: food.name
    });
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await calorieAPI.addFoodEntry(formData);
      setSuccess('Food entry added successfully!');
      setTimeout(() => {
        navigate('/tracker');
      }, 1500);
    } catch (err) {
      setError('Error adding food entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="card-split">
        <div className="card-left">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 className="gradient-text-primary" style={{ fontSize: '1.5rem' }}>Add Food Entry</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Add a new food item to your daily tracker
            </p>
          </div>

          {error && <div className="error">{error}</div>}
          {success && (
            <div style={{ 
              background: 'var(--gradient-success)', 
              color: 'white', 
              padding: '1rem', 
              borderRadius: '0.75rem', 
              marginBottom: '1.5rem' 
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Food Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="food_name"
                  placeholder="Search for food..."
                  value={formData.food_name}
                  onChange={(e) => {
                    handleChange(e);
                    handleFoodSearch(e.target.value);
                  }}
                  required
                />
                <Search style={{ 
                  position: 'absolute', 
                  right: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  width: '1.25rem', 
                  height: '1.25rem', 
                  color: 'var(--text-secondary)' 
                }} />
              </div>
              
              {searchResults.length > 0 && (
                <div style={{ 
                  position: 'absolute', 
                  zIndex: 10, 
                  width: '100%', 
                  background: 'white', 
                  border: '1px solid var(--border)', 
                  borderRadius: '0.75rem', 
                  marginTop: '0.25rem',
                  boxShadow: 'var(--card-shadow)'
                }}>
                  {searchResults.slice(0, 5).map((food, index) => (
                    <div
                      key={index}
                      onClick={() => selectFood(food)}
                      style={{ 
                        padding: '0.75rem 1rem', 
                        cursor: 'pointer', 
                        borderBottom: index < 4 ? '1px solid var(--border)' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--muted)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                        {food.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {food.calories} cal per 100g
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Quantity (grams)</label>
              <input
                type="number"
                name="quantity"
                placeholder="100"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Meal Type</label>
              <select
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

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
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
                  Adding Food...
                </>
              ) : (
                <>
                  <PlusCircle size={20} />
                  Add Food Entry
                </>
              )}
            </button>
          </form>
        </div>

        <div className="card-right">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem' }}>Food Database</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Search from our comprehensive food database
            </p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <Search style={{ width: '4rem', height: '4rem', opacity: 0.3, margin: '0 auto 1rem auto', color: 'white' }} />
            <div style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '1rem' }}>
              26+ Foods Available
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7, lineHeight: '1.5' }}>
              <div>• Fresh fruits and vegetables</div>
              <div>• Grains and cereals</div>
              <div>• Proteins and dairy</div>
              <div>• Snacks and beverages</div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '1rem', 
            borderRadius: '0.75rem', 
            fontSize: '0.875rem', 
            opacity: 0.8 
          }}>
            <strong>💡 Tip:</strong> Start typing to search for foods. Select from the dropdown to auto-fill the form with accurate nutritional data.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;

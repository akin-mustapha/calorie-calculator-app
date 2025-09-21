import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Calendar, Plus, TrendingUp, Clock, Sunrise, Sun, Moon, Apple } from 'lucide-react';
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

  const getMealTypeColor = (mealType) => {
    const colors = {
      breakfast: 'var(--gradient-primary)',
      lunch: 'var(--gradient-secondary)',
      dinner: 'var(--gradient-accent)',
      snack: 'var(--gradient-success)'
    };
    return colors[mealType] || 'var(--gradient-primary)';
  };

  const getMealTypeIcon = (mealType) => {
    const iconProps = { size: 16, style: { color: 'var(--blue-primary)' } };
    const icons = {
      breakfast: <Sunrise {...iconProps} />,
      lunch: <Sun {...iconProps} />,
      dinner: <Moon {...iconProps} />,
      snack: <Apple {...iconProps} />
    };
    return icons[mealType] || <Target {...iconProps} />;
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Target style={{ width: '1.5rem', height: '1.5rem', color: 'var(--blue-primary)' }} />
          <h1 className="gradient-text-primary">Food Tracker</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Track your daily food intake and monitor your nutritional goals
        </p>
      </div>

      {/* Date Selector */}
      <div className="card">
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar style={{ width: '1.25rem', height: '1.25rem', color: 'var(--blue-primary)' }} />
          Select Date
        </h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ 
            width: '100%', 
            maxWidth: '200px',
            padding: '0.75rem 1rem',
            border: '2px solid var(--border)',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            background: 'var(--input-background)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      {/* Summary Cards */}
      {foodData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: 'var(--blue-primary)', margin: '0 auto 0.5rem auto' }} />
            <div className="gradient-text-primary" style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              {foodData.total_calories || 0}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Total Calories</div>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <Clock style={{ width: '1.5rem', height: '1.5rem', color: 'var(--orange-primary)', margin: '0 auto 0.5rem auto' }} />
            <div className="gradient-text-secondary" style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              {foodData.entries ? foodData.entries.length : 0}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Food Entries</div>
          </div>
        </div>
      )}

      {/* Food Entries */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: 'var(--text-primary)' }}>Today's Food</h2>
          <Link to="/add-food" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus style={{ width: '1rem', height: '1rem' }} />
            Add Food
          </Link>
        </div>

        {foodData && foodData.entries && foodData.entries.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {foodData.entries.map((entry, index) => (
              <div key={index} className="food-entry">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.5rem', height: '1.5rem' }}>
                    {getMealTypeIcon(entry.meal_type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {entry.food_name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {entry.quantity}g • {entry.meal_type}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '1rem' }}>
                      {entry.calories} cal
                    </div>
                    <div className="meal-type" style={{ background: getMealTypeColor(entry.meal_type) }}>
                      {entry.meal_type}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <Target style={{ width: '3rem', height: '3rem', opacity: 0.2, margin: '0 auto 1rem auto', color: 'var(--text-secondary)' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No food entries yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Start tracking your meals by adding your first food entry
            </p>
            <Link to="/add-food" className="btn btn-primary">
              Add Your First Food
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodTracker;

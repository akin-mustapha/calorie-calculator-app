import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="card">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--dark-teal)' }}>
        CALORIE CALCULATOR
      </h1>
      <p style={{ 
        textAlign: 'center', 
        color: 'var(--text-secondary)', 
        fontSize: '1.1rem', 
        marginBottom: '3rem' 
      }}>
        Track your daily calorie intake and calculate your nutritional needs
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '2rem' 
      }}>
        <Link to="/calculate" className="card feature-card">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3>Calculate Calories</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Calculate your BMR and daily calorie needs based on your profile
            </p>
          </div>
        </Link>
        
        <Link to="/tracker" className="card feature-card">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3>Food Tracker</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              View your daily food intake and calorie consumption
            </p>
          </div>
        </Link>
        
        <Link to="/add-food" className="card feature-card">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>➕</div>
            <h3>Add Food</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Log your meals and track your calorie intake
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

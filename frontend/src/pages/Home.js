import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Target, PlusCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      to: '/calculate',
      icon: Calculator,
      title: 'Calculate Calories',
      description: 'Calculate your daily calorie needs based on your age, weight, height, and activity level',
      buttonText: 'Calculate Now'
    },
    {
      to: '/tracker',
      icon: Target,
      title: 'Food Tracker',
      description: 'Track your daily food intake and monitor your nutritional goals',
      buttonText: 'Start Tracking'
    },
    {
      to: '/add-food',
      icon: PlusCircle,
      title: 'Add Food',
      description: 'Add new foods to your meals and build your personal food database',
      buttonText: 'Add Food'
    }
  ];

  const gradients = [
    'var(--gradient-primary)',
    'var(--gradient-secondary)', 
    'var(--gradient-accent)'
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      {/* <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="gradient-text-primary">CALORIE CALCULATOR</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Track your daily calorie intake and calculate your nutritional needs with our comprehensive food database
        </p>
      </div> */}

      {/* Feature Cards */}
      <div className="feature-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <Link key={index} to={feature.to} className="feature-card-modern">
              <div 
                style={{ 
                  background: gradients[index % 3],
                  width: '80px',
                  height: '80px',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}
              >
                <Icon style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {feature.description}
              </p>
              <button 
                className="btn-modern"
                style={{ background: gradients[index % 3] }}
              >
                {feature.buttonText}
              </button>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="card" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>
          Why Choose Our Calculator?
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem' 
        }}>
          <div>
            <div className="gradient-text-primary" style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              26+
            </div>
            <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Foods in Database</div>
          </div>
          <div>
            <div className="gradient-text-secondary" style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              4
            </div>
            <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Meal Categories</div>
          </div>
          <div>
            <div className="gradient-text-accent" style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              100%
            </div>
            <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Accurate Calculations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

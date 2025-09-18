import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { CalculateOutlined, RestaurantMenuOutlined, AddCircleOutlineOutlined } from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      to: '/calculate',
      icon: <CalculateOutlined sx={{ fontSize: '4rem', mb: 2, color: 'var(--bright-teal)' }} />,
      title: 'Calculate Calories',
      description: 'Calculate your BMR and daily calorie needs based on your profile'
    },
    {
      to: '/tracker',
      icon: <RestaurantMenuOutlined sx={{ fontSize: '4rem', mb: 2, color: 'var(--bright-teal)' }} />,
      title: 'Food Tracker',
      description: 'View your daily food intake and calorie consumption'
    },
    {
      to: '/add-food',
      icon: <AddCircleOutlineOutlined sx={{ fontSize: '4rem', mb: 2, color: 'var(--bright-teal)' }} />,
      title: 'Add Food',
      description: 'Log your meals and track your calorie intake'
    }
  ];

  return (
    <Card sx={{ 
      backgroundColor: 'var(--card-bg)',
      borderRadius: 'var(--border-radius)',
      boxShadow: 'var(--shadow)',
      padding: '2rem'
    }}>
      <CardContent>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            textAlign: 'center', 
            mb: 2, 
            color: 'var(--dark-teal)',
            fontWeight: 600
          }}
        >
          CALORIE CALCULATOR
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)', 
            mb: 6 
          }}
        >
          Track your daily calorie intake and calculate your nutritional needs
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                component={Link}
                to={feature.to}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  {feature.icon}
                  <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Home;

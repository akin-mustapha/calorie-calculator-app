import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { HomeOutlined, CalculateOutlined, RestaurantMenuOutlined, AddCircleOutlineOutlined } from '@mui/icons-material';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeOutlined /> },
    { path: '/calculate', label: 'Calculate', icon: <CalculateOutlined /> },
    { path: '/tracker', label: 'Tracker', icon: <RestaurantMenuOutlined /> },
    { path: '/add-food', label: 'Add Food', icon: <AddCircleOutlineOutlined /> },
  ];

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'var(--card-bg)',
        boxShadow: 'var(--shadow)',
        borderRadius: 'var(--border-radius)',
        marginBottom: '2rem'
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
        {navItems.map((item) => (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            startIcon={item.icon}
            sx={{
              color: location.pathname === item.path ? 'white' : 'var(--text-primary)',
              backgroundColor: location.pathname === item.path ? 'var(--bright-teal)' : 'transparent',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              '&:hover': {
                backgroundColor: 'var(--bright-teal)',
                color: 'white'
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

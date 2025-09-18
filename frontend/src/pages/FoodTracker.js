import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, CardContent, Typography, TextField, Button, Grid, Box, 
  List, ListItem, ListItemText, Chip, CircularProgress 
} from '@mui/material';
import { 
  RestaurantMenuOutlined, 
  AddCircleOutlineOutlined, 
  LocalDiningOutlined,
  AssessmentOutlined 
} from '@mui/icons-material';
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
      <Card sx={{ 
        backgroundColor: 'var(--card-bg)',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--shadow)',
        p: 4
      }}>
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress size={60} sx={{ color: 'var(--bright-teal)', mb: 2 }} />
          <Typography variant="h5">Loading...</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      backgroundColor: 'var(--card-bg)',
      borderRadius: 'var(--border-radius)',
      boxShadow: 'var(--shadow)',
      overflow: 'hidden'
    }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Typography variant="h4" sx={{ color: 'var(--dark-teal)', display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantMenuOutlined />
            Food Tracker
          </Typography>
          <TextField
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: 'var(--bright-teal)'
              }
            }}
          />
        </Box>
        
        {foodData && foodData.entries.length > 0 ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalDiningOutlined />
                Today's Meals
              </Typography>
              
              <List>
                {foodData.entries.map((entry, index) => (
                  <ListItem 
                    key={index}
                    sx={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      mb: 1,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6">{entry.food_name}</Typography>
                          <Typography variant="h6" sx={{ color: 'var(--bright-teal)', fontWeight: 600 }}>
                            {Math.round(entry.calories)} cal
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {entry.quantity_grams}g
                          </Typography>
                          <Chip 
                            label={entry.meal_type} 
                            size="small"
                            sx={{ 
                              backgroundColor: 'var(--bright-teal)', 
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                backgroundColor: 'var(--dark-teal)', 
                color: 'white', 
                p: 3, 
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
              }}>
                <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <AssessmentOutlined />
                  Daily Summary
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                    Total Calories
                  </Typography>
                  <Typography variant="h2" sx={{ color: 'var(--bright-teal)', fontWeight: 700 }}>
                    {Math.round(foodData.total_calories)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    consumed today
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                    Meals Logged
                  </Typography>
                  <Typography variant="h3" sx={{ color: 'var(--bright-teal)', fontWeight: 600 }}>
                    {foodData.entries.length}
                  </Typography>
                </Box>
                
                <Button
                  component={Link}
                  to="/add-food"
                  variant="contained"
                  fullWidth
                  startIcon={<AddCircleOutlineOutlined />}
                  sx={{
                    backgroundColor: 'var(--bright-teal)',
                    '&:hover': { backgroundColor: '#45B7B8' }
                  }}
                >
                  Add More Food
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            color: 'var(--text-secondary)' 
          }}>
            <LocalDiningOutlined sx={{ fontSize: '5rem', mb: 2, color: 'var(--bright-teal)' }} />
            <Typography variant="h4" sx={{ mb: 2 }}>
              No meals logged for {selectedDate}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Start tracking your food intake to see your daily summary
            </Typography>
            <Button 
              component={Link}
              to="/add-food" 
              variant="contained"
              size="large"
              startIcon={<AddCircleOutlineOutlined />}
              sx={{
                backgroundColor: 'var(--bright-teal)',
                '&:hover': { backgroundColor: '#45B7B8' }
              }}
            >
              Add Your First Meal
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodTracker;

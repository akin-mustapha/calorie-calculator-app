import React, { useState } from 'react';
import { 
  Card, CardContent, Typography, TextField, MenuItem, 
  Button, Grid, Box, Alert, CircularProgress 
} from '@mui/material';
import { CalculateOutlined, TrendingUpOutlined } from '@mui/icons-material';
import { calorieAPI } from '../services/api';
import { formFieldStyles, buttonStyles } from '../styles/formStyles';

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
    <Card sx={{ 
      backgroundColor: 'var(--card-bg)',
      borderRadius: 'var(--border-radius)',
      boxShadow: 'var(--shadow)',
      overflow: 'hidden'
    }}>
      <Grid container>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, color: 'var(--dark-teal)', fontWeight: 600 }}>
              Calculate Your Calories
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                inputProps={{ min: 1, max: 120 }}
                sx={formFieldStyles}
              />
              
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                sx={formFieldStyles}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
              
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                required
                inputProps={{ min: 1, step: 0.1 }}
                sx={formFieldStyles}
              />
              
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                required
                inputProps={{ min: 1, step: 0.1 }}
                sx={formFieldStyles}
              />
              
              <TextField
                fullWidth
                select
                label="Activity Level"
                name="activity_level"
                value={formData.activity_level}
                onChange={handleChange}
                required
                sx={formFieldStyles}
              >
                <MenuItem value="">Select Activity Level</MenuItem>
                <MenuItem value="1.2">Sedentary (little/no exercise)</MenuItem>
                <MenuItem value="1.375">Light (light exercise 1-3 days/week)</MenuItem>
                <MenuItem value="1.55">Moderate (moderate exercise 3-5 days/week)</MenuItem>
                <MenuItem value="1.725">Active (hard exercise 6-7 days/week)</MenuItem>
                <MenuItem value="1.9">Very Active (very hard exercise, physical job)</MenuItem>
              </TextField>
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CalculateOutlined />}
                sx={{ ...buttonStyles.primary, mt: 2 }}
              >
                {loading ? 'Calculating...' : 'Calculate Calories'}
              </Button>
            </Box>
          </CardContent>
        </Grid>
        
        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            backgroundColor: 'var(--dark-teal)', 
            color: 'white', 
            p: 4, 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography variant="h4" component="h3" sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}>
              Your Results
            </Typography>
            
            {results ? (
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 1, fontSize: '1rem' }}>
                    BMR (Basal Metabolic Rate)
                  </Typography>
                  <Typography variant="h2" sx={{ color: 'var(--bright-teal)', fontWeight: 700, mb: 1 }}>
                    {Math.round(results.bmr)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.9rem' }}>
                    calories/day at rest
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 1, fontSize: '1rem' }}>
                    TDEE (Total Daily Energy)
                  </Typography>
                  <Typography variant="h2" sx={{ color: 'var(--bright-teal)', fontWeight: 700, mb: 1 }}>
                    {Math.round(results.tdee)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.9rem' }}>
                    calories/day with activity
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<TrendingUpOutlined />}
                  sx={{
                    backgroundColor: 'var(--bright-teal)',
                    borderRadius: '12px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#45B7B8' }
                  }}
                >
                  Start Tracking Food
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', opacity: 0.7 }}>
                <Typography variant="h6" sx={{ mb: 4 }}>
                  Fill out the form to see your personalized calorie calculations
                </Typography>
                
                <Box sx={{ 
                  border: '2px dashed rgba(255,255,255,0.3)', 
                  borderRadius: '12px', 
                  p: 3, 
                  mb: 2 
                }}>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '1rem' }}>BMR</Typography>
                  <Typography variant="h2" sx={{ color: 'var(--bright-teal)' }}>---</Typography>
                </Box>
                
                <Box sx={{ 
                  border: '2px dashed rgba(255,255,255,0.3)', 
                  borderRadius: '12px', 
                  p: 3, 
                  mb: 3 
                }}>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '1rem' }}>TDEE</Typography>
                  <Typography variant="h2" sx={{ color: 'var(--bright-teal)' }}>---</Typography>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled
                  sx={{ 
                    opacity: 0.5,
                    borderRadius: '12px',
                    padding: '12px 24px',
                    fontSize: '1rem'
                  }}
                >
                  Calculate First
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Calculate;

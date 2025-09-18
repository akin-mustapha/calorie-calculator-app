import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const calorieAPI = {
  // Calculate calories
  calculateCalories: (userData) => 
    api.post('/calculate', userData),

  // Food tracking
  getFoodEntries: (date) => 
    api.get(`/food-entries?date=${date}`),

  addFoodEntry: (foodEntry) => 
    api.post('/food-entries', foodEntry),

  // Food search
  searchFood: (query) => 
    api.get(`/search-food?q=${query}`),
};

export default api;

// Food database with nutritional information per 100g
export interface FoodItem {
  id: string;
  name: string;
  calories: number; // per 100g
  protein: number; // per 100g
  carbs: number; // per 100g
  fat: number; // per 100g
  category: string;
}

export const foodDatabase: FoodItem[] = [
  // Proteins
  { id: '1', name: 'Chicken Breast (cooked)', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'Protein' },
  { id: '2', name: 'Salmon (cooked)', calories: 206, protein: 22, carbs: 0, fat: 12, category: 'Protein' },
  { id: '3', name: 'Eggs (whole)', calories: 155, protein: 13, carbs: 1.1, fat: 11, category: 'Protein' },
  { id: '4', name: 'Greek Yogurt (plain)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, category: 'Protein' },
  { id: '5', name: 'Tuna (canned in water)', calories: 116, protein: 26, carbs: 0, fat: 0.8, category: 'Protein' },

  // Carbohydrates
  { id: '6', name: 'Brown Rice (cooked)', calories: 123, protein: 2.6, carbs: 25, fat: 1, category: 'Carbs' },
  { id: '7', name: 'White Rice (cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, category: 'Carbs' },
  { id: '8', name: 'Oats (dry)', calories: 389, protein: 16.9, carbs: 66, fat: 6.9, category: 'Carbs' },
  { id: '9', name: 'Sweet Potato (baked)', calories: 90, protein: 2, carbs: 21, fat: 0.1, category: 'Carbs' },
  { id: '10', name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, category: 'Carbs' },

  // Vegetables
  { id: '11', name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, category: 'Vegetables' },
  { id: '12', name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: 'Vegetables' },
  { id: '13', name: 'Bell Pepper', calories: 31, protein: 1, carbs: 7, fat: 0.3, category: 'Vegetables' },
  { id: '14', name: 'Cucumber', calories: 16, protein: 0.7, carbs: 4, fat: 0.1, category: 'Vegetables' },
  { id: '15', name: 'Tomato', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, category: 'Vegetables' },

  // Fats
  { id: '16', name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, category: 'Fats' },
  { id: '17', name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100, category: 'Fats' },
  { id: '18', name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50, category: 'Fats' },
  { id: '19', name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fat: 50, category: 'Fats' },

  // Dairy
  { id: '20', name: 'Milk (whole)', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, category: 'Dairy' },
  { id: '21', name: 'Cheddar Cheese', calories: 403, protein: 25, carbs: 1.3, fat: 33, category: 'Dairy' },

  // Fruits
  { id: '22', name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, category: 'Fruits' },
  { id: '23', name: 'Orange', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, category: 'Fruits' },
  { id: '24', name: 'Blueberries', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, category: 'Fruits' },

  // Grains
  { id: '25', name: 'Whole Wheat Bread', calories: 247, protein: 13, carbs: 41, fat: 4.2, category: 'Grains' },
  { id: '26', name: 'Pasta (cooked)', calories: 131, protein: 5, carbs: 25, fat: 1.1, category: 'Grains' },
];

export const searchFoods = (query: string): FoodItem[] => {
  if (!query.trim()) return foodDatabase;
  
  const lowerQuery = query.toLowerCase();
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(lowerQuery) ||
    food.category.toLowerCase().includes(lowerQuery)
  );
};

export const getFoodById = (id: string): FoodItem | undefined => {
  return foodDatabase.find(food => food.id === id);
};
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { FoodItem, searchFoods, getFoodById } from './FoodDatabase';
import { Search, Plus, Trash2, Calculator } from 'lucide-react';

export interface FoodEntry {
  id: string;
  foodId: string;
  quantity: number; // in grams
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

export default function CalorieCalculator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState<string>('100');
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [activeTab, setActiveTab] = useState('breakfast');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchFoods(query);
    setSearchResults(results);
  };

  const calculateNutrition = (food: FoodItem, grams: number) => {
    const multiplier = grams / 100;
    return {
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
    };
  };

  const addFoodEntry = () => {
    if (selectedFood && quantity) {
      const newEntry: FoodEntry = {
        id: Date.now().toString(),
        foodId: selectedFood.id,
        quantity: parseFloat(quantity),
        meal: activeTab as 'breakfast' | 'lunch' | 'dinner' | 'snacks',
      };
      setFoodEntries([...foodEntries, newEntry]);
      setSelectedFood(null);
      setQuantity('100');
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const removeFoodEntry = (entryId: string) => {
    setFoodEntries(foodEntries.filter(entry => entry.id !== entryId));
  };

  const getMealEntries = (meal: string) => {
    return foodEntries.filter(entry => entry.meal === meal);
  };

  const calculateMealTotals = (meal: string) => {
    const entries = getMealEntries(meal);
    return entries.reduce(
      (totals, entry) => {
        const food = getFoodById(entry.foodId);
        if (food) {
          const nutrition = calculateNutrition(food, entry.quantity);
          totals.calories += nutrition.calories;
          totals.protein += nutrition.protein;
          totals.carbs += nutrition.carbs;
          totals.fat += nutrition.fat;
        }
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const calculateDayTotals = () => {
    const meals = ['breakfast', 'lunch', 'dinner', 'snacks'];
    return meals.reduce(
      (dayTotals, meal) => {
        const mealTotals = calculateMealTotals(meal);
        dayTotals.calories += mealTotals.calories;
        dayTotals.protein += mealTotals.protein;
        dayTotals.carbs += mealTotals.carbs;
        dayTotals.fat += mealTotals.fat;
        return dayTotals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const dayTotals = calculateDayTotals();

  const renderMealContent = (meal: string) => {
    const entries = getMealEntries(meal);
    const mealTotals = calculateMealTotals(meal);

    return (
      <div className="space-y-4">
        {/* Add Food Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Food to {meal.charAt(0).toUpperCase() + meal.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="space-y-2">
              <Label>Search Foods</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for foods..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="grid gap-2 max-h-40 overflow-y-auto">
                {searchResults.map((food) => (
                  <div
                    key={food.id}
                    className={`p-2 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                      selectedFood?.id === food.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedFood(food)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div>{food.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {food.calories} cal/100g
                        </div>
                      </div>
                      <Badge variant="secondary">{food.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Food & Quantity */}
            {selectedFood && (
              <div className="space-y-3 p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div>{selectedFood.name}</div>
                    <Badge variant="outline">{selectedFood.category}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Quantity (grams)</Label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="0"
                      step="1"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Nutrition Preview</Label>
                    <div className="text-sm text-muted-foreground">
                      {calculateNutrition(selectedFood, parseFloat(quantity) || 0).calories} calories
                    </div>
                  </div>
                </div>

                <Button onClick={addFoodEntry} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Food Entries Table */}
        {entries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Foods Added</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Food</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Protein</TableHead>
                    <TableHead>Carbs</TableHead>
                    <TableHead>Fat</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => {
                    const food = getFoodById(entry.foodId);
                    if (!food) return null;
                    
                    const nutrition = calculateNutrition(food, entry.quantity);
                    return (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div>
                            <div>{food.name}</div>
                            <Badge variant="outline" className="text-xs">{food.category}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>{entry.quantity}g</TableCell>
                        <TableCell>{nutrition.calories}</TableCell>
                        <TableCell>{nutrition.protein}g</TableCell>
                        <TableCell>{nutrition.carbs}g</TableCell>
                        <TableCell>{nutrition.fat}g</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFoodEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Meal Totals */}
              <Separator className="my-4" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                  <div className="text-lg font-medium">{Math.round(mealTotals.calories)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                  <div className="text-lg font-medium">{Math.round(mealTotals.protein * 10) / 10}g</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                  <div className="text-lg font-medium">{Math.round(mealTotals.carbs * 10) / 10}g</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                  <div className="text-lg font-medium">{Math.round(mealTotals.fat * 10) / 10}g</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Calculator className="h-6 w-6" />
            Calorie Calculator
          </CardTitle>
          <CardDescription>
            Track your daily nutrition by adding foods to your meals
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-medium text-primary">{Math.round(dayTotals.calories)}</div>
              <div className="text-sm text-muted-foreground">Total Calories</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-medium text-blue-600">{Math.round(dayTotals.protein * 10) / 10}g</div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-medium text-green-600">{Math.round(dayTotals.carbs * 10) / 10}g</div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-medium text-yellow-600">{Math.round(dayTotals.fat * 10) / 10}g</div>
              <div className="text-sm text-muted-foreground">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakfast" className="space-y-4">
          {renderMealContent('breakfast')}
        </TabsContent>
        
        <TabsContent value="lunch" className="space-y-4">
          {renderMealContent('lunch')}
        </TabsContent>
        
        <TabsContent value="dinner" className="space-y-4">
          {renderMealContent('dinner')}
        </TabsContent>
        
        <TabsContent value="snacks" className="space-y-4">
          {renderMealContent('snacks')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
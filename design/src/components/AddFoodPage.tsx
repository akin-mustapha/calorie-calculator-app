import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PlusCircle, Search } from 'lucide-react';
import { FoodItem, searchFoods, FoodEntry } from './FoodDatabase';

interface AddFoodPageProps {
  onAddFood: (entry: Omit<FoodEntry, 'id'>) => void;
  onNavigate: (tab: string) => void;
}

export default function AddFoodPage({ onAddFood, onNavigate }: AddFoodPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState('100');
  const [mealType, setMealType] = useState('');
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [entryTime, setEntryTime] = useState(new Date().toTimeString().slice(0, 5));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchFoods(query);
    setSearchResults(results.slice(0, 8)); // Limit to 8 results
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

  const handleAddFood = () => {
    if (selectedFood && quantity && mealType) {
      const newEntry: Omit<FoodEntry, 'id'> = {
        foodId: selectedFood.id,
        quantity: parseFloat(quantity),
        meal: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snacks',
      };
      
      onAddFood(newEntry);
      
      // Reset form
      setSelectedFood(null);
      setQuantity('100');
      setMealType('');
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const mealOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snacks', label: 'Snacks' }
  ];

  const nutrition = selectedFood ? calculateNutrition(selectedFood, parseFloat(quantity) || 0) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle 
            className="text-xl sm:text-2xl flex items-center gap-2"
            style={{ color: 'var(--teal-dark)' }}
          >
            <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            Add Food Entry
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Search for foods and add them to your daily tracker
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          {/* Search Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Search Foods</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--teal-bright)' }} />
                <Input
                  placeholder="Search for foods (e.g., chicken, apple, rice)..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 rounded-lg border-2 focus:border-primary min-h-[44px] text-sm sm:text-base"
                  style={{ backgroundColor: 'var(--input-background)' }}
                />
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card 
                className="border-2"
                style={{ backgroundColor: 'var(--input-background)', borderColor: 'var(--border)' }}
              >
                <CardContent className="p-4">
                  <div className="grid gap-2 max-h-64 overflow-y-auto">
                    {searchResults.map((food) => (
                      <div
                        key={food.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedFood?.id === food.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedFood(food)}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm sm:text-base truncate">{food.name}</div>
                            <div className="text-xs sm:text-sm opacity-60">
                              {food.calories} cal/100g
                            </div>
                          </div>
                          <Badge 
                            variant="secondary"
                            className="flex-shrink-0 text-xs"
                            style={{ backgroundColor: 'var(--teal-bright)', color: 'white' }}
                          >
                            {food.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Selected Food Details */}
          {selectedFood && (
            <Card 
              className="border-2"
              style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--teal-bright)' }}
            >
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg" style={{ color: 'var(--teal-dark)' }}>
                  {selectedFood.name}
                </CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">{selectedFood.category}</Badge>
                  <Badge 
                    className="text-xs"
                    style={{ backgroundColor: 'var(--teal-bright)', color: 'white' }}
                  >
                    {selectedFood.calories} cal/100g
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-4 sm:px-6">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quantity (grams)</Label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="0"
                      step="1"
                      className="rounded-lg border-2 focus:border-primary"
                      style={{ backgroundColor: 'var(--input-background)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meal Type</Label>
                    <Select value={mealType} onValueChange={setMealType}>
                      <SelectTrigger className="rounded-lg border-2 focus:border-primary" style={{ backgroundColor: 'var(--input-background)' }}>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        {mealOptions.map((meal) => (
                          <SelectItem key={meal.value} value={meal.value}>
                            {meal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={entryDate}
                      onChange={(e) => setEntryDate(e.target.value)}
                      className="rounded-lg border-2 focus:border-primary"
                      style={{ backgroundColor: 'var(--input-background)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={entryTime}
                      onChange={(e) => setEntryTime(e.target.value)}
                      className="rounded-lg border-2 focus:border-primary"
                      style={{ backgroundColor: 'var(--input-background)' }}
                    />
                  </div>
                </div>

                {/* Nutrition Preview */}
                {nutrition && (
                  <Card style={{ backgroundColor: 'var(--teal-dark)', color: 'white' }}>
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Nutrition Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div 
                            className="text-2xl"
                            style={{ color: 'var(--teal-bright)' }}
                          >
                            {nutrition.calories}
                          </div>
                          <div className="text-sm opacity-80">Calories</div>
                        </div>
                        <div>
                          <div 
                            className="text-2xl"
                            style={{ color: 'var(--teal-bright)' }}
                          >
                            {nutrition.protein}g
                          </div>
                          <div className="text-sm opacity-80">Protein</div>
                        </div>
                        <div>
                          <div 
                            className="text-2xl"
                            style={{ color: 'var(--teal-bright)' }}
                          >
                            {nutrition.carbs}g
                          </div>
                          <div className="text-sm opacity-80">Carbs</div>
                        </div>
                        <div>
                          <div 
                            className="text-2xl"
                            style={{ color: 'var(--teal-bright)' }}
                          >
                            {nutrition.fat}g
                          </div>
                          <div className="text-sm opacity-80">Fat</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAddFood}
                    disabled={!selectedFood || !quantity || !mealType}
                    className="flex-1 rounded-lg py-3 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Food Entry
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('tracker')}
                    className="flex-1 rounded-lg py-3 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--teal-bright)', color: 'var(--teal-dark)' }}
                  >
                    View Tracker
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!selectedFood && searchQuery === '' && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="space-y-4">
                  <div className="text-6xl opacity-20">🔍</div>
                  <div className="text-lg opacity-60">Start by searching for a food</div>
                  <div className="text-sm opacity-40">
                    Try searching for common foods like "chicken", "apple", or "rice"
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
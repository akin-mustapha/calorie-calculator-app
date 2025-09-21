import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Calendar, UtensilsCrossed } from 'lucide-react';
import { FoodEntry, getFoodById } from './FoodDatabase';

interface FoodTrackerPageProps {
  foodEntries: FoodEntry[];
  onNavigate: (tab: string) => void;
}

export default function FoodTrackerPage({ foodEntries, onNavigate }: FoodTrackerPageProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Filter entries by selected date (for demo, we'll show all entries)
  const todayEntries = foodEntries;

  const calculateNutrition = (foodId: string, quantity: number) => {
    const food = getFoodById(foodId);
    if (!food) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    const multiplier = quantity / 100;
    return {
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
    };
  };

  const calculateTotals = () => {
    return todayEntries.reduce(
      (totals, entry) => {
        const nutrition = calculateNutrition(entry.foodId, entry.quantity);
        totals.calories += nutrition.calories;
        totals.protein += nutrition.protein;
        totals.carbs += nutrition.carbs;
        totals.fat += nutrition.fat;
        totals.meals += 1;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, meals: 0 }
    );
  };

  const groupedEntries = todayEntries.reduce((groups, entry) => {
    if (!groups[entry.meal]) groups[entry.meal] = [];
    groups[entry.meal].push(entry);
    return groups;
  }, {} as Record<string, FoodEntry[]>);

  const totals = calculateTotals();

  const mealTypeColors = {
    breakfast: 'bg-orange-100 text-orange-800',
    lunch: 'bg-green-100 text-green-800',
    dinner: 'bg-blue-100 text-blue-800',
    snacks: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <Card className="shadow-lg">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <CardTitle 
                className="text-xl sm:text-2xl flex items-center gap-2"
                style={{ color: 'var(--teal-dark)' }}
              >
                <UtensilsCrossed className="h-5 w-5 sm:h-6 sm:w-6" />
                Food Tracker
              </CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">Track your daily food intake and nutrition</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Calendar className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--teal-bright)' }} />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-lg border-2 focus:border-primary min-h-[44px] text-sm sm:text-base"
                style={{ backgroundColor: 'var(--input-background)' }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Today's Meals */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl" style={{ color: 'var(--teal-dark)' }}>Today's Meals</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              {todayEntries.length === 0 ? (
                <div className="text-center py-8 sm:py-12 space-y-4">
                  <div className="text-4xl sm:text-6xl opacity-20">🍽️</div>
                  <div className="text-base sm:text-lg opacity-60">No meals logged yet</div>
                  <div className="text-sm opacity-40 leading-relaxed">
                    Start tracking your food to see your daily nutrition
                  </div>
                  <Button 
                    onClick={() => onNavigate('add-food')}
                    className="rounded-lg min-h-[44px] text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Add Your First Meal
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(groupedEntries).map(([meal, entries]) => (
                    <div key={meal} className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 
                          className="capitalize text-sm sm:text-base font-medium"
                          style={{ color: 'var(--teal-dark)' }}
                        >
                          {meal}
                        </h4>
                        <Badge className={`${mealTypeColors[meal as keyof typeof mealTypeColors]} text-xs`}>
                          {entries.length} item{entries.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {entries.map((entry) => {
                          const food = getFoodById(entry.foodId);
                          if (!food) return null;
                          
                          const nutrition = calculateNutrition(entry.foodId, entry.quantity);
                          return (
                            <div 
                              key={entry.id} 
                              className="p-3 sm:p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md"
                              style={{ 
                                borderLeftColor: 'var(--teal-bright)',
                                backgroundColor: 'var(--input-background)'
                              }}
                            >
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm sm:text-base font-medium truncate">{food.name}</div>
                                  <div className="text-xs sm:text-sm opacity-60">{entry.quantity}g</div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-sm sm:text-base font-medium" style={{ color: 'var(--teal-bright)' }}>
                                    {nutrition.calories} cal
                                  </div>
                                  <div className="text-xs opacity-60 whitespace-nowrap">
                                    P: {nutrition.protein}g | C: {nutrition.carbs}g | F: {nutrition.fat}g
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Card */}
        <div className="space-y-4">
          <Card 
            className="shadow-xl"
            style={{ backgroundColor: 'var(--teal-dark)', color: 'white' }}
          >
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl text-white">Daily Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              {/* Total Calories */}
              <div className="text-center">
                <div className="text-xs sm:text-sm opacity-80">Total Calories</div>
                <div 
                  className="text-3xl sm:text-4xl"
                  style={{ color: 'var(--teal-bright)' }}
                >
                  {totals.calories}
                </div>
                <div className="text-xs opacity-60">calories consumed</div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="text-xs sm:text-sm opacity-80">Protein</div>
                  <div 
                    className="text-lg sm:text-xl"
                    style={{ color: 'var(--teal-bright)' }}
                  >
                    {Math.round(totals.protein * 10) / 10}g
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm opacity-80">Carbs</div>
                  <div 
                    className="text-lg sm:text-xl"
                    style={{ color: 'var(--teal-bright)' }}
                  >
                    {Math.round(totals.carbs * 10) / 10}g
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm opacity-80">Fat</div>
                  <div 
                    className="text-lg sm:text-xl"
                    style={{ color: 'var(--teal-bright)' }}
                  >
                    {Math.round(totals.fat * 10) / 10}g
                  </div>
                </div>
              </div>

              {/* Meals Logged */}
              <div className="text-center">
                <div className="text-xs sm:text-sm opacity-80">Meals Logged</div>
                <div 
                  className="text-xl sm:text-2xl"
                  style={{ color: 'var(--teal-bright)' }}
                >
                  {totals.meals}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => onNavigate('add-food')}
                className="w-full bg-white text-teal-dark hover:bg-gray-100 rounded-lg py-3 min-h-[44px] text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5"
                style={{ color: 'var(--teal-dark)' }}
              >
                Add More Food
              </Button>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="shadow-lg">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle 
                className="text-base sm:text-lg"
                style={{ color: 'var(--teal-dark)' }}
              >
                💡 Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-sm px-4 sm:px-6 leading-relaxed">
              <div>• Log meals as you eat them for accuracy</div>
              <div>• Weigh your food for precise tracking</div>
              <div>• Don't forget to log drinks and snacks</div>
              <div>• Review your daily totals regularly</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
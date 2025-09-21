import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface CalorieCalculatorPageProps {
  onNavigate: (tab: string) => void;
}

interface FormData {
  age: string;
  gender: 'male' | 'female' | '';
  weight: string;
  height: string;
  activityLevel: string;
}

export default function CalorieCalculatorPage({ onNavigate }: CalorieCalculatorPageProps) {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: ''
  });
  const [results, setResults] = useState<{ bmr: number; tdee: number } | null>(null);

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (little/no exercise)' },
    { value: '1.375', label: 'Light (light exercise 1-3 days/week)' },
    { value: '1.55', label: 'Moderate (moderate exercise 3-5 days/week)' },
    { value: '1.725', label: 'Active (hard exercise 6-7 days/week)' },
    { value: '1.9', label: 'Very Active (very hard exercise/physical job)' }
  ];

  const calculateCalories = () => {
    const { age, gender, weight, height, activityLevel } = formData;
    
    if (!age || !gender || !weight || !height || !activityLevel) {
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityNum = parseFloat(activityLevel);

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const tdee = bmr * activityNum;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Form Section */}
        <div 
          className="p-6 sm:p-8 rounded-3xl backdrop-blur-sm border border-white/20"
          style={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <CardHeader className="px-0 pb-6">
            <CardTitle 
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              Calculate Your Calories
            </CardTitle>
            <CardDescription className="text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
              Enter your information to calculate your daily calorie needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 px-0">
            {/* Age */}
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Age (years)</Label>
              <Input
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="rounded-2xl border-0 min-h-[52px] text-sm sm:text-base backdrop-blur-sm focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label className="text-sm sm:text-base">Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                className="flex flex-row space-x-4 sm:space-x-6"
              >
                <div className="flex items-center space-x-2 min-h-[44px]">
                  <RadioGroupItem value="male" id="male" className="min-h-[20px] min-w-[20px]" />
                  <Label htmlFor="male" className="text-sm sm:text-base cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2 min-h-[44px]">
                  <RadioGroupItem value="female" id="female" className="min-h-[20px] min-w-[20px]" />
                  <Label htmlFor="female" className="text-sm sm:text-base cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Weight (kg)</Label>
              <Input
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="rounded-2xl border-0 min-h-[52px] text-sm sm:text-base backdrop-blur-sm focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Height (cm)</Label>
              <Input
                type="number"
                placeholder="175"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="rounded-2xl border-0 min-h-[52px] text-sm sm:text-base backdrop-blur-sm focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                <SelectTrigger 
                  className="rounded-2xl border-0 min-h-[52px] text-sm sm:text-base backdrop-blur-sm focus:ring-2 focus:ring-purple-500/30 transition-all duration-300" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  {activityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value} className="text-sm sm:text-base">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={calculateCalories}
              className="w-full py-4 sm:py-6 min-h-[56px] text-sm sm:text-base font-semibold rounded-2xl border-0 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
              style={{ background: 'var(--gradient-primary)' }}
              disabled={!formData.age || !formData.gender || !formData.weight || !formData.height || !formData.activityLevel}
            >
              Calculate My Calories
            </Button>
          </CardContent>
        </div>

        {/* Results Section */}
        <div 
          className="p-6 sm:p-8 rounded-3xl backdrop-blur-sm border border-white/20 text-white relative overflow-hidden"
          style={{ 
            background: 'var(--gradient-primary)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <CardHeader className="px-0 pb-6">
            <CardTitle className="text-2xl sm:text-3xl text-white font-bold">
              Your Results
            </CardTitle>
            <CardDescription className="text-white/80 text-base sm:text-lg">
              Your calculated daily calorie needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 px-0">
            {results ? (
              <>
                {/* BMR */}
                <div className="text-center space-y-2">
                  <div className="text-xs sm:text-sm opacity-80">Basal Metabolic Rate (BMR)</div>
                  <div 
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent"
                  >
                    {results.bmr}
                  </div>
                  <div className="text-xs sm:text-sm opacity-80">calories/day</div>
                  <div className="text-xs opacity-70 mt-2">
                    Calories burned at rest
                  </div>
                </div>

                {/* TDEE */}
                <div className="text-center space-y-2">
                  <div className="text-xs sm:text-sm opacity-80">Total Daily Energy Expenditure (TDEE)</div>
                  <div 
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent"
                  >
                    {results.tdee}
                  </div>
                  <div className="text-xs sm:text-sm opacity-80">calories/day</div>
                  <div className="text-xs opacity-70 mt-2">
                    Total calories needed to maintain weight
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => onNavigate('tracker')}
                  className="w-full bg-white py-3 sm:py-4 min-h-[56px] text-sm sm:text-base font-semibold rounded-2xl border-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ 
                    color: 'var(--blue-primary)',
                    background: 'rgba(255, 255, 255, 0.95)'
                  }}
                >
                  Start Tracking Food
                </Button>

                {/* Additional Info */}
                <div className="text-xs opacity-70 space-y-1 leading-relaxed">
                  <div>• To lose weight: eat 300-500 calories below TDEE</div>
                  <div>• To gain weight: eat 300-500 calories above TDEE</div>
                  <div>• To maintain weight: eat close to your TDEE</div>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 py-6 sm:py-8">
                <div className="text-4xl sm:text-6xl opacity-20">📊</div>
                <div className="text-base sm:text-lg opacity-80">
                  Fill out the form to see your results
                </div>
                <div className="text-xs sm:text-sm opacity-60 leading-relaxed">
                  We'll calculate your BMR and TDEE based on the Mifflin-St Jeor equation
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
}
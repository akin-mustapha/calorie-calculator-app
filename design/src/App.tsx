import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import CalorieCalculatorPage from './components/CalorieCalculatorPage';
import FoodTrackerPage from './components/FoodTrackerPage';
import AddFoodPage from './components/AddFoodPage';
import { FoodEntry } from './components/FoodDatabase';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);

  const handleAddFood = (entry: Omit<FoodEntry, 'id'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setFoodEntries(prev => [...prev, newEntry]);
    setActiveTab('tracker'); // Navigate to tracker after adding food
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'calculate':
        return <CalorieCalculatorPage onNavigate={setActiveTab} />;
      case 'tracker':
        return <FoodTrackerPage foodEntries={foodEntries} onNavigate={setActiveTab} />;
      case 'add-food':
        return <AddFoodPage onAddFood={handleAddFood} onNavigate={setActiveTab} />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: 'var(--background)',
        backgroundColor: 'var(--background-solid)'
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6 sm:mt-8">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
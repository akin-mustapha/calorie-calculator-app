import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calculator, Target, PlusCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Calculator,
      title: 'Calculate Calories',
      description: 'Calculate your daily calorie needs based on your age, weight, height, and activity level',
      action: () => onNavigate('calculate'),
      buttonText: 'Calculate Now'
    },
    {
      icon: Target,
      title: 'Food Tracker',
      description: 'Track your daily food intake and monitor your nutritional goals',
      action: () => onNavigate('tracker'),
      buttonText: 'Start Tracking'
    },
    {
      icon: PlusCircle,
      title: 'Add Food',
      description: 'Add new foods to your meals and build your personal food database',
      action: () => onNavigate('add-food'),
      buttonText: 'Add Food'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <div 
        className="text-center p-8 sm:p-12 rounded-3xl backdrop-blur-sm border border-white/20"
        style={{ 
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <CardTitle 
          className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          CALORIE CALCULATOR
        </CardTitle>
        <CardDescription 
          className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Track your daily calorie intake and calculate your nutritional needs with our comprehensive food database
        </CardDescription>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const gradients = [
            'var(--gradient-primary)',
            'var(--gradient-secondary)', 
            'var(--gradient-accent)'
          ];
          const iconColors = ['#667eea', '#fcb69f', '#a8edea'];
          
          return (
            <div
              key={index} 
              className="group cursor-pointer"
              onClick={feature.action}
            >
              <div 
                className="p-6 sm:p-8 rounded-3xl backdrop-blur-sm border border-white/20 text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: 'var(--card-shadow)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
              >
                <div 
                  className="mx-auto mb-6 p-4 rounded-2xl w-fit relative overflow-hidden"
                  style={{ background: gradients[index % 3] }}
                >
                  <Icon 
                    className="h-8 w-8 sm:h-10 sm:w-10 text-white relative z-10" 
                  />
                </div>
                <CardTitle 
                  className="text-lg sm:text-xl mb-3 font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </CardDescription>
                <Button 
                  className="w-full py-3 text-sm sm:text-base min-h-[48px] rounded-2xl font-medium text-white border-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: gradients[index % 3] }}
                  onClick={feature.action}
                >
                  {feature.buttonText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div 
        className="p-6 sm:p-8 rounded-3xl backdrop-blur-sm border border-white/20"
        style={{ 
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <CardTitle className="text-xl sm:text-2xl mb-8 text-center font-bold" style={{ color: 'var(--text-primary)' }}>
          Why Choose Our Calculator?
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
          <div className="relative">
            <div 
              className="text-4xl sm:text-5xl mb-3 font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              26+
            </div>
            <div className="text-sm sm:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>Foods in Database</div>
          </div>
          <div className="relative">
            <div 
              className="text-4xl sm:text-5xl mb-3 font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
            >
              4
            </div>
            <div className="text-sm sm:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>Meal Categories</div>
          </div>
          <div className="relative">
            <div 
              className="text-4xl sm:text-5xl mb-3 font-bold bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent"
            >
              100%
            </div>
            <div className="text-sm sm:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>Accurate Calculations</div>
          </div>
        </div>
      </div>
    </div>
  );
}
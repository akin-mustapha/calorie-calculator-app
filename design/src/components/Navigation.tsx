import { Button } from './ui/button';
import { Card } from './ui/card';
import { Home, Calculator, Target, PlusCircle } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'calculate', label: 'Calculate', icon: Calculator },
    { id: 'tracker', label: 'Tracker', icon: Target },
    { id: 'add-food', label: 'Add Food', icon: PlusCircle },
  ];

  return (
    <div 
      className="mx-auto p-2 sm:p-3 rounded-2xl backdrop-blur-sm border border-white/20"
      style={{ 
        maxWidth: '1200px',
        background: 'rgba(255, 255, 255, 0.85)',
        boxShadow: 'var(--card-shadow)'
      }}
    >
      <nav className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl transition-all duration-300 text-sm sm:text-base min-h-[48px] font-medium ${
                isActive 
                  ? 'text-white shadow-lg transform -translate-y-0.5' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:-translate-y-0.5'
              }`}
              style={{
                background: isActive ? 'var(--gradient-primary)' : 'transparent'
              }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
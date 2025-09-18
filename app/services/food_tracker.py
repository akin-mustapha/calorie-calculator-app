from datetime import datetime, date
from typing import List, Dict
from ..models.food import FoodEntry, MealType
from ..database.models import DatabaseManager

class FoodTrackingService:
    def __init__(self, db_manager: DatabaseManager = None):
        self.db_manager = db_manager or DatabaseManager()
    
    def add_food_entry(self, entry: FoodEntry) -> int:
        return self.db_manager.save_food_entry(entry)
    
    def get_daily_intake(self, target_date: date = None) -> Dict[str, float]:
        if target_date is None:
            target_date = date.today()
        
        daily_entries = self.db_manager.get_daily_entries(target_date.isoformat())
        total_calories = sum(entry.calories for entry in daily_entries)
        
        meal_breakdown = {}
        for meal_type in MealType:
            meal_calories = sum(
                entry.calories for entry in daily_entries 
                if entry.meal_type == meal_type
            )
            meal_breakdown[meal_type.value] = round(meal_calories, 1)
        
        return {
            'total_calories': round(total_calories, 1),
            'meal_breakdown': meal_breakdown,
            'entry_count': len(daily_entries)
        }

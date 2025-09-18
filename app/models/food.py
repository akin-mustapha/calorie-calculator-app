from dataclasses import dataclass
from enum import Enum
from datetime import datetime
from typing import List

class MealType(Enum):
    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    DINNER = "dinner"
    SNACK = "snack"

@dataclass
class FoodItem:
    name: str
    calories_per_100g: float
    quantity_grams: float
    
    def __post_init__(self):
        if self.calories_per_100g <= 0:
            raise ValueError("Calories per 100g must be positive")
        if self.quantity_grams <= 0:
            raise ValueError("Quantity must be positive")
    
    @property
    def total_calories(self) -> float:
        return (self.calories_per_100g * self.quantity_grams) / 100

@dataclass
class FoodEntry:
    meal_type: MealType
    food_item: FoodItem
    timestamp: datetime
    
    @property
    def calories(self) -> float:
        return self.food_item.total_calories

from abc import ABC, abstractmethod
from ..models.user import User, Gender

class BMRCalculator(ABC):
    @abstractmethod
    def calculate_bmr(self, user: User) -> float:
        pass

class MifflinStJeorCalculator(BMRCalculator):
    def calculate_bmr(self, user: User) -> float:
        if user.gender == Gender.MALE:
            return 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
        else:
            return 10 * user.weight + 6.25 * user.height - 5 * user.age - 161

class CalorieCalculatorService:
    def __init__(self, bmr_calculator: BMRCalculator = None):
        self.bmr_calculator = bmr_calculator or MifflinStJeorCalculator()
    
    def calculate_daily_calories(self, user: User) -> dict:
        bmr = self.bmr_calculator.calculate_bmr(user)
        tdee = bmr * user.activity_level.value
        
        return {
            'bmr': round(bmr, 1),
            'tdee': round(tdee, 1),
            'weight_loss': round(tdee - 500, 1),
            'weight_gain': round(tdee + 500, 1)
        }

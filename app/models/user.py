from dataclasses import dataclass
from enum import Enum
from typing import Optional

class Gender(Enum):
    MALE = "male"
    FEMALE = "female"

class ActivityLevel(Enum):
    SEDENTARY = 1.2
    LIGHTLY_ACTIVE = 1.375
    MODERATELY_ACTIVE = 1.55
    VERY_ACTIVE = 1.725
    EXTREMELY_ACTIVE = 1.9

@dataclass
class User:
    age: int
    gender: Gender
    weight: float  # kg
    height: float  # cm
    activity_level: ActivityLevel
    
    def __post_init__(self):
        if self.age <= 0 or self.age > 120:
            raise ValueError("Age must be between 1 and 120")
        if self.weight <= 0 or self.weight > 500:
            raise ValueError("Weight must be between 1 and 500 kg")
        if self.height <= 0 or self.height > 300:
            raise ValueError("Height must be between 1 and 300 cm")

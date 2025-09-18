# Design Document - Calorie Calculator Application

## 1. System Architecture

### 1.1 High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLI Layer     │    │  Service Layer  │    │  Data Layer     │
│                 │    │                 │    │                 │
│ - Interface     │───▶│ - Calculator    │───▶│ - Models        │
│ - Input/Output  │    │ - Food Tracker  │    │ - Database      │
│ - Menu System   │    │ - Validation    │    │ - Persistence   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.2 Component Overview
- **CLI Layer**: User interface and interaction management
- **Service Layer**: Business logic and data processing
- **Data Layer**: Data models and persistence

## 2. Design Patterns

### 2.1 Strategy Pattern
- **Context**: `CalorieCalculatorService`
- **Strategy Interface**: `BMRCalculator`
- **Concrete Strategy**: `MifflinStJeorCalculator`
- **Benefit**: Extensible BMR calculation algorithms

### 2.2 Dependency Injection
- Services accept dependencies via constructor
- Enables testing and flexibility
- Example: `FoodTrackingService(db_manager)`

### 2.3 Data Transfer Objects
- `User`, `FoodItem`, `FoodEntry` as data containers
- Encapsulate validation logic
- Immutable data structures using `@dataclass`

## 3. SOLID Principles Implementation

### 3.1 Single Responsibility Principle (SRP)
- **User**: Data validation and storage
- **CalorieCalculatorService**: BMR/TDEE calculations
- **FoodTrackingService**: Food intake management
- **DatabaseManager**: Data persistence operations
- **CalorieCalculatorCLI**: User interface management

### 3.2 Open/Closed Principle (OCP)
- `BMRCalculator` interface allows new calculation methods
- Service classes can be extended without modification
- New meal types can be added to `MealType` enum

### 3.3 Liskov Substitution Principle (LSP)
- Any `BMRCalculator` implementation can replace another
- Database manager can be substituted for testing

### 3.4 Interface Segregation Principle (ISP)
- `BMRCalculator` has single method responsibility
- Services expose only necessary methods

### 3.5 Dependency Inversion Principle (DIP)
- Services depend on abstractions (`BMRCalculator`)
- High-level modules don't depend on low-level modules

## 4. Data Model Design

### 4.1 Core Models
```python
User:
├── age: int (1-120)
├── gender: Gender (MALE/FEMALE)
├── weight: float (1-500 kg)
├── height: float (1-300 cm)
└── activity_level: ActivityLevel

FoodItem:
├── name: str
├── calories_per_100g: float
└── quantity_grams: float

FoodEntry:
├── meal_type: MealType
├── food_item: FoodItem
└── timestamp: datetime
```

### 4.2 Database Schema
```sql
food_entries:
├── id: INTEGER PRIMARY KEY
├── food_name: TEXT NOT NULL
├── calories_per_100g: REAL NOT NULL
├── quantity_grams: REAL NOT NULL
├── meal_type: TEXT NOT NULL
└── timestamp: TEXT NOT NULL
```

## 5. Service Layer Design

### 5.1 CalorieCalculatorService
- **Purpose**: Calculate daily calorie requirements
- **Dependencies**: `BMRCalculator`
- **Methods**: `calculate_daily_calories(user: User) -> dict`

### 5.2 FoodTrackingService
- **Purpose**: Manage food intake tracking
- **Dependencies**: `DatabaseManager`
- **Methods**: 
  - `add_food_entry(entry: FoodEntry) -> int`
  - `get_daily_intake(date: date) -> dict`

### 5.3 DatabaseManager
- **Purpose**: Handle data persistence
- **Dependencies**: SQLite
- **Methods**:
  - `save_food_entry(entry: FoodEntry) -> int`
  - `get_daily_entries(date_str: str) -> List[FoodEntry]`

## 6. User Interface Design

### 6.1 Menu Structure
```
Main Menu:
├── 1. Calculate daily calorie requirements
├── 2. Add food intake
├── 3. View today's food intake
└── 4. Exit
```

### 6.2 Input Validation Strategy
- Type validation (int, float)
- Range validation (min/max values)
- Format validation (gender, meal type)
- Error handling with retry prompts

## 7. Error Handling Strategy

### 7.1 Input Validation Errors
- Catch `ValueError` for type conversions
- Display user-friendly error messages
- Retry input until valid

### 7.2 Database Errors
- Handle SQLite connection issues
- Graceful degradation if database unavailable
- Transaction rollback on errors

### 7.3 Application Errors
- Catch `KeyboardInterrupt` for graceful shutdown
- Generic exception handling with error logging

## 8. Extension Points

### 8.1 New BMR Algorithms
- Implement `BMRCalculator` interface
- Examples: Harris-Benedict, Katch-McArdle

### 8.2 Additional Meal Types
- Extend `MealType` enum
- No code changes required in services

### 8.3 Enhanced Database Support
- Replace `DatabaseManager` with ORM
- Add user profile persistence
- Multi-user support

### 8.4 Web Interface
- Replace CLI with web framework
- Maintain service layer unchanged
- Add REST API endpoints

## 9. Testing Strategy

### 9.1 Unit Testing
- Test each service independently
- Mock database dependencies
- Validate calculation accuracy

### 9.2 Integration Testing
- Test CLI with services
- Database operations
- End-to-end workflows

### 9.3 Data Validation Testing
- Boundary value testing
- Invalid input handling
- Edge case scenarios

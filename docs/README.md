# Documentation

This directory contains the complete documentation for the Calorie Calculator Application.

## Documents

### [Requirements](requirements.md)
- Functional requirements
- Non-functional requirements
- User stories and acceptance criteria
- System requirements

### [Design](design.md)
- System architecture
- Design patterns implementation
- SOLID principles application
- Data model design
- Extension points

## Quick Reference

### Architecture Overview
```
CLI Layer → Service Layer → Data Layer
```

### Key Design Patterns
- **Strategy Pattern**: BMR calculation algorithms
- **Dependency Injection**: Service dependencies
- **Data Transfer Objects**: Model validation

### Core Components
- **Models**: `User`, `FoodItem`, `FoodEntry`
- **Services**: `CalorieCalculatorService`, `FoodTrackingService`
- **Database**: `DatabaseManager` with SQLite
- **CLI**: `CalorieCalculatorCLI` interface

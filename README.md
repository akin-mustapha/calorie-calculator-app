# Calorie Calculator

A Python web application that calculates daily calorie requirements based on user profile and activity level, with food intake tracking and database persistence.

## Features

- BMR calculation using Mifflin-St Jeor equation
- TDEE calculation with activity level multipliers
- Weight loss/gain calorie recommendations
- Food intake tracking with meal categorization
- PostgreSQL database for persistent storage
- Food database with 75+ common foods
- Input validation and error handling
- Modular design following SOLID principles

## Usage

### Web Interface
```bash
python run.py
# Visit http://localhost:5000
```

### Docker (Recommended)
```bash
docker-compose up --build
# Visit http://localhost:8000
```

## Web Interface Features

- **Home Page**: Overview and quick actions
- **Calculate Calories**: Interactive form for BMR/TDEE calculation
- **Food Tracker**: View daily intake summary
- **Add Food**: Search food database or add custom foods
- **Real-time Search**: Live food database search with autocomplete

## Architecture

- **Models**: Data structures with validation (`User`, `Gender`, `ActivityLevel`, `FoodItem`, `FoodEntry`)
- **Services**: Business logic with strategy pattern (`CalorieCalculatorService`, `FoodTrackingService`)
- **Database**: Persistent storage with PostgreSQL (`DatabaseManager`, `FoodDatabase`)
- **Views**: Flask Blueprint-based web routes

## Design Principles Applied

- **Single Responsibility**: Each class has one clear purpose
- **Open/Closed**: BMR calculation can be extended with new algorithms
- **Dependency Inversion**: Services depend on abstractions, not concrete implementations
- **Strategy Pattern**: Pluggable BMR calculation algorithms
- **Data Validation**: Input validation at model and interface levels
- **Application Factory**: Flask app factory pattern for better testing

## Documentation

- [Requirements](docs/requirements.md) - Functional and non-functional requirements
- [Design](docs/design.md) - System architecture and design patterns
- [API Documentation](docs/README.md) - Quick reference guide

## Project Structure

```
calorie-calculator/
├── app/
│   ├── models/          # Data models and validation
│   ├── services/        # Business logic services
│   ├── database/        # Data persistence layer
│   └── views/           # Web routes and controllers
├── templates/          # HTML templates for web interface
├── config/             # Configuration management
├── tests/              # Test suite
├── run.py              # Application entry point
└── docker-compose.yml  # Docker orchestration
```

## Dependencies

- Python 3.7+
- Flask (for web interface)
- PostgreSQL (via Docker)
- psycopg2-binary (PostgreSQL adapter)

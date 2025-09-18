# Calorie Calculator

A Python application that calculates daily calorie requirements based on user profile and activity level, with food intake tracking and database persistence. Available with both CLI and Web interfaces.

## Features

- BMR calculation using Mifflin-St Jeor equation
- TDEE calculation with activity level multipliers
- Weight loss/gain calorie recommendations
- Food intake tracking with meal categorization
- SQLite database for persistent storage
- Food database with 75+ common foods
- Input validation and error handling
- Modular design following SOLID principles
- **Dual Interface**: CLI and Web UI

## Usage

### Web Interface
```bash
python web_app.py
# Visit http://localhost:5000
```

### CLI Interface
```bash
python main.py
```

### Unified Launcher
```bash
python start.py          # Choose interface interactively
python start.py web      # Start web interface directly
python start.py cli      # Start CLI interface directly
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
- **Database**: Persistent storage with SQLite (`DatabaseManager`, `FoodDatabase`)
- **CLI**: Command-line interface (`CalorieCalculatorCLI`)
- **Web**: Flask web application with HTML templates

## Design Principles Applied

- **Single Responsibility**: Each class has one clear purpose
- **Open/Closed**: BMR calculation can be extended with new algorithms
- **Dependency Inversion**: Services depend on abstractions, not concrete implementations
- **Strategy Pattern**: Pluggable BMR calculation algorithms
- **Data Validation**: Input validation at model and interface levels
- **Interface Segregation**: Separate CLI and Web interfaces using same services

## Documentation

- [Requirements](docs/requirements.md) - Functional and non-functional requirements
- [Design](docs/design.md) - System architecture and design patterns
- [API Documentation](docs/README.md) - Quick reference guide

## Project Structure

```
calorie-calculator/
├── src/
│   ├── models/          # Data models and validation
│   ├── services/        # Business logic services
│   ├── database/        # Data persistence layer
│   └── cli/            # Command-line interface
├── templates/          # HTML templates for web interface
├── docs/               # Documentation
├── main.py            # CLI application entry point
├── web_app.py         # Web application entry point
├── start.py           # Unified launcher
└── calorie_tracker.db # SQLite database (created on first run)
```

## Dependencies

- Python 3.7+
- Flask (for web interface)
- SQLite (built-in)
# calorie-calculator-app

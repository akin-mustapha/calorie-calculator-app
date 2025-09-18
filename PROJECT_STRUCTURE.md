# Project Structure - Industry Standard

## Application Structure (MVC Pattern)
```
├── run.py                  # Application entry point (WSGI)
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
└── .gitignore            # Git ignore patterns
```

## Application Package
```
app/
├── __init__.py           # Flask application factory
├── models/               # Data models (Model layer)
│   ├── __init__.py
│   ├── user.py          # User profile with BMR/TDEE
│   └── food.py          # Food items and meal entries
├── views/               # Route handlers (Controller layer)
│   ├── __init__.py
│   └── routes.py        # Main application routes
├── services/            # Business logic layer
│   ├── __init__.py
│   ├── calorie_calculator.py  # BMR/TDEE calculations
│   └── food_tracker.py  # Food intake tracking
└── database/            # Data access layer
    ├── __init__.py
    ├── models.py        # PostgreSQL database manager
    └── food_data.py     # Food database operations
```

## Configuration Management
```
config/
├── __init__.py
└── settings.py          # Environment-based configuration
```

## Templates (View layer)
```
templates/               # HTML templates for Flask
├── base.html           # Base template with navigation
├── index.html          # Home page
├── calculate.html      # Calorie calculation form
├── results.html        # Calculation results
├── food_tracker.html   # Daily intake summary
└── add_food.html       # Food entry form
```

## Static Assets
```
static/
├── css/                # Stylesheets
├── js/                 # JavaScript files
└── images/             # Image assets
```

## Testing
```
tests/
├── __init__.py
└── test_app.py         # Application tests
```

## Infrastructure
```
├── Dockerfile          # Container definition
├── docker-compose.yml  # Multi-service orchestration
├── gunicorn.conf.py    # Production server config
└── migrations/         # Database migrations (future)
```

## Documentation
```
docs/
├── requirements.md     # Functional requirements
├── design.md          # Architecture patterns
└── README.md          # API documentation
```

## Key Design Patterns

### Application Factory Pattern
- `app/__init__.py`: Creates Flask app with configuration
- `run.py`: Entry point using factory pattern
- `config/settings.py`: Environment-based configuration

### Blueprint Pattern
- `app/views/routes.py`: Organized routes using Flask Blueprints
- Modular route organization for scalability

### Service Layer Pattern
- `app/services/`: Business logic separated from routes
- Clean separation of concerns

### Repository Pattern
- `app/database/`: Data access abstraction
- Database operations isolated from business logic

This structure follows Flask best practices and is suitable for production deployment.

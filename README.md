# Calorie Calculator - React + Flask

A modern web application with React frontend and Flask API backend for calculating daily calorie requirements and tracking food intake.

## 🚀 Quick Start

```bash
./start-dev.sh
```

**Access:**
- **Frontend**: http://localhost:3000 (React App)
- **API**: http://localhost:8000 (Flask API)
- **Database**: localhost:5432 (PostgreSQL)

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 18 with Material-UI
- **Routing**: React Router v6
- **Styling**: Material-UI with custom teal theme
- **API Client**: Axios for HTTP requests
- **Port**: 3000

### Backend (Flask API)
- **Framework**: Flask with CORS
- **Database**: PostgreSQL with psycopg2
- **API**: RESTful endpoints under `/api`
- **Port**: 8000

### Database (PostgreSQL)
- **Container**: postgres:15
- **Port**: 5432
- **Database**: calorie_tracker

## 🎨 Features

- **Modern Design**: Clean Material-UI components with teal theme
- **Responsive Layout**: Works on desktop and mobile
- **Real-time Search**: Food database autocomplete
- **Split-card UI**: Form and results side-by-side
- **Date Tracking**: Calendar-based food logging
- **API Integration**: Seamless frontend-backend communication

## 📡 API Endpoints

- `POST /api/calculate` - Calculate BMR/TDEE
- `GET /api/food-entries?date=YYYY-MM-DD` - Get food entries
- `POST /api/food-entries` - Add food entry
- `GET /api/search-food?q=query` - Search food database

## 🛠️ Development

### Project Structure
```
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route components
│   │   ├── services/   # API client
│   │   └── styles/     # CSS files
│   └── public/         # Static assets
├── app/               # Flask API application
│   ├── models/        # Data models
│   ├── services/      # Business logic
│   ├── database/      # Data access
│   └── views/         # API routes
├── config/            # Configuration
├── docs/              # Documentation
├── tests/             # Test suite
└── docker-compose.yml # Container orchestration
```

### Key Technologies
- **React 18** - Modern frontend framework
- **Material-UI** - Professional UI components
- **Flask** - Python web framework
- **PostgreSQL** - Relational database
- **Docker** - Containerization

## 🔧 Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build

# Development mode
./start-dev.sh
```

## 📚 Documentation

- [Requirements](docs/requirements.md) - Functional requirements
- [Design](docs/design.md) - Architecture and design patterns
- [API Documentation](docs/README.md) - API reference

# Calorie Calculator - React + Flask

A modern web application with React frontend and Flask API backend for calculating daily calorie requirements and tracking food intake.

## 🚀 Quick Start

### Production (Docker)
```bash
./start-dev.sh
# or
docker-compose up --build
```

**Access:**
- **Frontend**: http://localhost:3000 (React App)
- **API**: http://localhost:8000 (Flask API)
- **Database**: localhost:5432 (PostgreSQL)

### Development Mode
```bash
# Terminal 1 - Backend API
python run.py

# Terminal 2 - Frontend React App  
cd frontend && npm install && npm start
```

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 18 with hooks
- **Routing**: React Router v6
- **Styling**: CSS with design system variables
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

- **Modern Design**: Clean teal theme matching design template
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
├── app/               # Flask application
│   ├── models/        # Data models
│   ├── services/      # Business logic
│   ├── database/      # Data access
│   └── views/         # API routes
├── config/            # Configuration
└── templates/         # Flask templates (legacy)
```

### Key Technologies
- **React 18** - Modern frontend framework
- **Flask** - Python web framework
- **PostgreSQL** - Relational database
- **Docker** - Containerization
- **Nginx** - Production web server

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

## 🎯 Next Steps

- Add user authentication
- Implement data visualization
- Add meal planning features
- Mobile app development
- Advanced nutrition tracking

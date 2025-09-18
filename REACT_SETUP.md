# React Frontend Setup

## Development Setup

### 1. Install Node.js Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Servers

**Backend API (Terminal 1):**
```bash
# From project root
python run.py
# API will run on http://localhost:5000
```

**Frontend React App (Terminal 2):**
```bash
cd frontend
npm start
# React app will run on http://localhost:3000
```

### 3. Production with Docker
```bash
# From project root
docker-compose up --build
# Frontend: http://localhost:3000
# API: http://localhost:8000
```

## Architecture

### Frontend (React)
- **Port**: 3000
- **Framework**: React 18 with React Router
- **Styling**: CSS with design system variables
- **API Client**: Axios for HTTP requests

### Backend (Flask API)
- **Port**: 8000
- **Framework**: Flask with CORS enabled
- **Routes**: RESTful API endpoints under `/api`
- **Database**: PostgreSQL

### API Endpoints
- `POST /api/calculate` - Calculate BMR/TDEE
- `GET /api/food-entries?date=YYYY-MM-DD` - Get food entries
- `POST /api/food-entries` - Add food entry
- `GET /api/search-food?q=query` - Search food database

## Features Implemented
- ✅ Modern React architecture with hooks
- ✅ Component-based design
- ✅ React Router for navigation
- ✅ API integration with Axios
- ✅ Responsive design matching original template
- ✅ CORS-enabled Flask API
- ✅ Docker containerization

## Next Steps
- Complete Food Tracker and Add Food components
- Add form validation and error handling
- Implement loading states and animations
- Add unit tests for React components

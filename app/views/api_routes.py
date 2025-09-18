"""
API Routes for React Frontend

RESTful API endpoints that serve JSON data to the React application.
Handles CORS and provides clean API responses.
"""

from flask import Blueprint, request, jsonify
from flask_cors import CORS
from datetime import datetime, date

from app.models.user import User, Gender, ActivityLevel
from app.models.food import FoodItem, FoodEntry, MealType
from app.services.calorie_calculator import CalorieCalculatorService
from app.services.food_tracker import FoodTrackingService
from app.database.food_data import FoodDatabase

# Create API Blueprint
api_bp = Blueprint('api', __name__, url_prefix='/api')
CORS(api_bp)  # Enable CORS for React frontend

# Initialize services
calculator = CalorieCalculatorService()
food_tracker = FoodTrackingService()
food_db = FoodDatabase()


@api_bp.route('/calculate', methods=['POST'])
def calculate_calories():
    """Calculate BMR and TDEE from user data"""
    try:
        data = request.get_json()
        
        # Create user object
        age = int(data['age'])
        gender = Gender.MALE if data['gender'] == 'male' else Gender.FEMALE
        weight = float(data['weight'])
        height = float(data['height'])
        activity_level = ActivityLevel(float(data['activity_level']))
        
        user = User(age, gender, weight, height, activity_level)
        results = calculator.calculate_daily_calories(user)
        
        return jsonify({
            'bmr': results.bmr,
            'tdee': results.tdee,
            'weight_loss': getattr(results, 'weight_loss', None),
            'weight_gain': getattr(results, 'weight_gain', None)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_bp.route('/food-entries', methods=['GET'])
def get_food_entries():
    """Get food entries for a specific date"""
    try:
        date_str = request.args.get('date', date.today().isoformat())
        intake = food_tracker.get_daily_intake(date_str)
        
        entries_data = []
        for entry in intake.entries if intake else []:
            entries_data.append({
                'food_name': entry.food_item.name,
                'calories_per_100g': entry.food_item.calories_per_100g,
                'quantity_grams': entry.food_item.quantity_grams,
                'meal_type': entry.meal_type.value,
                'calories': entry.calculate_calories(),
                'timestamp': entry.timestamp.isoformat()
            })
        
        return jsonify({
            'entries': entries_data,
            'total_calories': intake.total_calories if intake else 0,
            'date': date_str
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_bp.route('/food-entries', methods=['POST'])
def add_food_entry():
    """Add a new food entry"""
    try:
        data = request.get_json()
        
        # Create food entry
        food_item = FoodItem(
            data['food_name'],
            float(data['calories_per_100g']),
            float(data['quantity'])
        )
        
        meal_type = MealType(data['meal_type'])
        
        # Handle timestamp
        if 'timestamp' in data:
            timestamp = datetime.fromisoformat(data['timestamp'])
        else:
            timestamp = datetime.now()
        
        entry = FoodEntry(meal_type, food_item, timestamp)
        food_tracker.add_food_entry(entry)
        
        return jsonify({
            'message': 'Food entry added successfully',
            'calories': entry.calculate_calories()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api_bp.route('/search-food', methods=['GET'])
def search_food():
    """Search food database"""
    try:
        query = request.args.get('q', '').strip()
        if len(query) < 2:
            return jsonify([])
        
        foods = food_db.search_food(query)
        return jsonify(foods[:10])  # Limit to 10 results
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

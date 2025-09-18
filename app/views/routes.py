"""
Main Application Routes

Flask Blueprint containing all web application routes.
Organized by functionality: home, calculations, food tracking.
"""

from flask import Blueprint, render_template, request, jsonify, redirect, url_for
from datetime import datetime, date

from app.models.user import User, Gender, ActivityLevel
from app.models.food import FoodItem, FoodEntry, MealType
from app.services.calorie_calculator import CalorieCalculatorService
from app.services.food_tracker import FoodTrackingService
from app.database.food_data import FoodDatabase

# Create Blueprint
main_bp = Blueprint('main', __name__)

# Initialize services
calculator = CalorieCalculatorService()
food_tracker = FoodTrackingService()
food_db = FoodDatabase()


@main_bp.route('/')
def index():
    """Home page with navigation and overview"""
    return render_template('index.html')


@main_bp.route('/calculate', methods=['GET', 'POST'])
def calculate_calories():
    """Handle calorie calculation form and results"""
    if request.method == 'POST':
        try:
            # Extract user data from form
            age = int(request.form['age'])
            gender = Gender.MALE if request.form['gender'] == 'male' else Gender.FEMALE
            weight = float(request.form['weight'])
            height = float(request.form['height'])
            activity_level = ActivityLevel(float(request.form['activity_level']))
            
            # Create user object and calculate calories
            user = User(age, gender, weight, height, activity_level)
            results = calculator.calculate_daily_calories(user)
            
            return render_template('results.html', results=results, user=user)
        except Exception as e:
            return render_template('calculate.html', error=str(e))
    
    return render_template('calculate.html')


@main_bp.route('/food')
def food_tracker_page():
    """Display daily food intake summary for selected date"""
    selected_date = request.args.get('date', date.today().isoformat())
    
    try:
        target_date = datetime.strptime(selected_date, "%Y-%m-%d").date()
    except ValueError:
        target_date = date.today()
    
    intake = food_tracker.get_daily_intake(target_date)
    return render_template('food_tracker.html', intake=intake, selected_date=selected_date)


@main_bp.route('/add_food', methods=['GET', 'POST'])
def add_food():
    """Handle food entry form and save new entries"""
    if request.method == 'POST':
        try:
            # Extract food entry data from form
            food_name = request.form['food_name']
            calories_per_100g = float(request.form['calories_per_100g'])
            quantity = float(request.form['quantity'])
            meal_type = MealType(request.form['meal_type'])
            
            # Handle custom date/time or use current time
            date_str = request.form.get('date', '')
            time_str = request.form.get('time', '')
            
            if date_str and time_str:
                timestamp = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
            else:
                timestamp = datetime.now()
            
            # Create and save food entry
            food_item = FoodItem(food_name, calories_per_100g, quantity)
            entry = FoodEntry(meal_type, food_item, timestamp)
            
            food_tracker.add_food_entry(entry)
            return redirect(url_for('main.food_tracker_page'))
        except Exception as e:
            return render_template('add_food.html', error=str(e))
    
    return render_template('add_food.html')


@main_bp.route('/api/search_food')
def search_food():
    """API endpoint for food database search with autocomplete"""
    query = request.args.get('q', '')
    if query:
        results = food_db.search_food(query)
        return jsonify(results)
    return jsonify([])


@main_bp.route('/select_food/<food_name>')
def select_food(food_name):
    """Pre-fill food form with selected food from database"""
    food = food_db.get_food_by_name(food_name)
    if food:
        return render_template('add_food.html', selected_food=food)
    return redirect(url_for('main.add_food'))

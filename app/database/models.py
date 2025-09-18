"""
Database Models for Calorie Calculator

Handles PostgreSQL database connections and operations for food entries.
Provides methods to save and retrieve food intake data with proper error handling.
"""

import psycopg2
import os
from datetime import datetime
from typing import List, Dict, Optional
from ..models.food import FoodEntry, FoodItem, MealType

class DatabaseManager:
    """Manages PostgreSQL database connections and food entry operations"""
    
    def __init__(self, db_url: str = None):
        """Initialize database manager with connection URL"""
        self.db_url = db_url or os.getenv('DATABASE_URL', 'postgresql://localhost/calorie_tracker')
        self.init_database()
    
    def get_connection(self):
        """Create and return a new database connection"""
        return psycopg2.connect(self.db_url)
    
    def init_database(self):
        """Create database tables if they don't exist"""
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS food_entries (
                        id SERIAL PRIMARY KEY,
                        food_name VARCHAR(255) NOT NULL,
                        calories_per_100g DECIMAL(8,2) NOT NULL,
                        quantity_grams DECIMAL(8,2) NOT NULL,
                        meal_type VARCHAR(50) NOT NULL,
                        timestamp TIMESTAMP NOT NULL
                    )
                """)
            conn.commit()
    
    def save_food_entry(self, entry: FoodEntry) -> int:
        """Save a food entry to the database and return the entry ID"""
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO food_entries 
                    (food_name, calories_per_100g, quantity_grams, meal_type, timestamp)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    entry.food_item.name,
                    entry.food_item.calories_per_100g,
                    entry.food_item.quantity_grams,
                    entry.meal_type.value,
                    entry.timestamp
                ))
                result = cursor.fetchone()
            conn.commit()
            return result[0] if result else None
    
    def get_daily_entries(self, date_str: str) -> List[FoodEntry]:
        """Retrieve all food entries for a specific date"""
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT food_name, calories_per_100g, quantity_grams, meal_type, timestamp
                    FROM food_entries
                    WHERE DATE(timestamp) = %s
                    ORDER BY timestamp
                """, (date_str,))
                
                entries = []
                for row in cursor.fetchall():
                    # Reconstruct food entry objects from database data
                    food_item = FoodItem(row[0], float(row[1]), float(row[2]))
                    meal_type = MealType(row[3])
                    timestamp = row[4]
                    entries.append(FoodEntry(meal_type, food_item, timestamp))
                
                return entries

import sqlite3
from typing import List, Dict, Optional

class FoodDatabase:
    def __init__(self, db_path: str = "calorie_tracker.db"):
        self.db_path = db_path
        self.init_food_database()
        self.populate_food_data()
    
    def init_food_database(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS food_database (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE,
                    calories_per_100g REAL NOT NULL,
                    category TEXT NOT NULL
                )
            """)
            conn.commit()
    
    def populate_food_data(self):
        foods = [
            # Fruits
            ("Apple", 52, "Fruits"),
            ("Banana", 89, "Fruits"),
            ("Orange", 47, "Fruits"),
            ("Strawberry", 32, "Fruits"),
            ("Grapes", 62, "Fruits"),
            ("Pineapple", 50, "Fruits"),
            ("Mango", 60, "Fruits"),
            ("Watermelon", 30, "Fruits"),
            ("Peach", 39, "Fruits"),
            ("Pear", 57, "Fruits"),
            
            # Vegetables
            ("Broccoli", 34, "Vegetables"),
            ("Carrot", 41, "Vegetables"),
            ("Spinach", 23, "Vegetables"),
            ("Tomato", 18, "Vegetables"),
            ("Cucumber", 16, "Vegetables"),
            ("Bell Pepper", 31, "Vegetables"),
            ("Onion", 40, "Vegetables"),
            ("Lettuce", 15, "Vegetables"),
            ("Potato", 77, "Vegetables"),
            ("Sweet Potato", 86, "Vegetables"),
            
            # Grains & Cereals
            ("White Rice", 130, "Grains"),
            ("Brown Rice", 111, "Grains"),
            ("Quinoa", 120, "Grains"),
            ("Oats", 389, "Grains"),
            ("Wheat Bread", 265, "Grains"),
            ("Whole Wheat Bread", 247, "Grains"),
            ("Pasta", 131, "Grains"),
            ("Barley", 354, "Grains"),
            ("Corn", 86, "Grains"),
            ("Buckwheat", 343, "Grains"),
            
            # Proteins
            ("Chicken Breast", 165, "Proteins"),
            ("Salmon", 208, "Proteins"),
            ("Tuna", 144, "Proteins"),
            ("Beef", 250, "Proteins"),
            ("Pork", 242, "Proteins"),
            ("Eggs", 155, "Proteins"),
            ("Tofu", 76, "Proteins"),
            ("Lentils", 116, "Proteins"),
            ("Black Beans", 132, "Proteins"),
            ("Chickpeas", 164, "Proteins"),
            
            # Dairy
            ("Milk (Whole)", 61, "Dairy"),
            ("Milk (Skim)", 34, "Dairy"),
            ("Cheddar Cheese", 403, "Dairy"),
            ("Greek Yogurt", 59, "Dairy"),
            ("Butter", 717, "Dairy"),
            ("Cream", 345, "Dairy"),
            ("Cottage Cheese", 98, "Dairy"),
            ("Mozzarella", 280, "Dairy"),
            ("Parmesan", 431, "Dairy"),
            ("Ice Cream", 207, "Dairy"),
            
            # Nuts & Seeds
            ("Almonds", 579, "Nuts"),
            ("Walnuts", 654, "Nuts"),
            ("Peanuts", 567, "Nuts"),
            ("Cashews", 553, "Nuts"),
            ("Sunflower Seeds", 584, "Nuts"),
            ("Pumpkin Seeds", 559, "Nuts"),
            ("Chia Seeds", 486, "Nuts"),
            ("Flax Seeds", 534, "Nuts"),
            ("Pistachios", 560, "Nuts"),
            ("Brazil Nuts", 659, "Nuts"),
            
            # Oils & Fats
            ("Olive Oil", 884, "Oils"),
            ("Coconut Oil", 862, "Oils"),
            ("Avocado", 160, "Oils"),
            ("Canola Oil", 884, "Oils"),
            ("Sesame Oil", 884, "Oils"),
            
            # Beverages
            ("Coffee", 2, "Beverages"),
            ("Tea", 1, "Beverages"),
            ("Orange Juice", 45, "Beverages"),
            ("Apple Juice", 46, "Beverages"),
            ("Soda", 41, "Beverages"),
            
            # Snacks
            ("Potato Chips", 536, "Snacks"),
            ("Chocolate", 546, "Snacks"),
            ("Cookies", 502, "Snacks"),
            ("Crackers", 431, "Snacks"),
            ("Popcorn", 387, "Snacks"),
        ]
        
        with sqlite3.connect(self.db_path) as conn:
            # Check if data already exists
            cursor = conn.execute("SELECT COUNT(*) FROM food_database")
            if cursor.fetchone()[0] == 0:
                conn.executemany(
                    "INSERT INTO food_database (name, calories_per_100g, category) VALUES (?, ?, ?)",
                    foods
                )
                conn.commit()
    
    def search_food(self, query: str) -> List[Dict]:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("""
                SELECT name, calories_per_100g, category 
                FROM food_database 
                WHERE name LIKE ? 
                ORDER BY name
                LIMIT 10
            """, (f"%{query}%",))
            
            return [
                {"name": row[0], "calories_per_100g": row[1], "category": row[2]}
                for row in cursor.fetchall()
            ]
    
    def get_food_by_name(self, name: str) -> Optional[Dict]:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("""
                SELECT name, calories_per_100g, category 
                FROM food_database 
                WHERE LOWER(name) = LOWER(?)
            """, (name,))
            
            row = cursor.fetchone()
            if row:
                return {"name": row[0], "calories_per_100g": row[1], "category": row[2]}
            return None

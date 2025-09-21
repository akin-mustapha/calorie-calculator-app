"""
Flask Application Factory

Creates and configures the Flask application using the factory pattern.
This allows for better testing, configuration management, and deployment flexibility.
"""

from flask import Flask
from flask_cors import CORS
from config.settings import Config


def create_app(config_class=Config):
    """Create and configure Flask application"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Enable CORS for React frontend
    CORS(app)
    
    # Register API blueprint
    from app.views.api_routes import api_bp
    app.register_blueprint(api_bp)
    
    return app

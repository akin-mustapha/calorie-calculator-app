"""
Flask Application Factory

Creates and configures the Flask application using the factory pattern.
This allows for better testing, configuration management, and deployment flexibility.
"""

import os
from flask import Flask
from config.settings import Config


def create_app(config_class=Config):
    """Create and configure Flask application"""
    # Set template and static folders relative to project root
    template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'templates'))
    static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))
    
    app = Flask(__name__, 
                template_folder=template_dir,
                static_folder=static_dir)
    app.config.from_object(config_class)
    
    # Register blueprints
    from app.views.routes import main_bp
    app.register_blueprint(main_bp)
    
    return app

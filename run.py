#!/usr/bin/env python3
"""
Application Entry Point

Main entry point for the Calorie Calculator web application.
Uses Flask application factory pattern for better organization.
"""

import os
from app import create_app
from config.settings import config

# Get environment or default to development
env = os.environ.get('FLASK_ENV', 'development')
app = create_app(config.get(env, config['default']))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

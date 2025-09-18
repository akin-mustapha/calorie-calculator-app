"""
Application Configuration

Centralized configuration management for different environments.
Uses environment variables with sensible defaults.
"""

import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Base configuration class"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DATABASE_URL = os.environ.get('DATABASE_URL') or 'postgresql://localhost/calorie_tracker'
    
    # Flask settings
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    """Development environment configuration"""
    DEBUG = True


class ProductionConfig(Config):
    """Production environment configuration"""
    DEBUG = False


class TestingConfig(Config):
    """Testing environment configuration"""
    TESTING = True
    DATABASE_URL = os.environ.get('TEST_DATABASE_URL') or 'postgresql://localhost/calorie_tracker_test'


# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

"""
Basic Application Tests

Sample test structure for the calorie calculator application.
"""

import pytest
from app import create_app
from config.settings import TestingConfig


@pytest.fixture
def app():
    """Create test application"""
    app = create_app(TestingConfig)
    return app


@pytest.fixture
def client(app):
    """Create test client"""
    return app.test_client()


def test_home_page(client):
    """Test home page loads correctly"""
    response = client.get('/')
    assert response.status_code == 200


def test_calculate_page(client):
    """Test calculate page loads correctly"""
    response = client.get('/calculate')
    assert response.status_code == 200

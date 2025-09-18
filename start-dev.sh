#!/bin/bash

echo "🚀 Starting Calorie Calculator Development Environment"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "📦 Starting services with Docker Compose..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

echo ""
echo "✅ Services are running!"
echo ""
echo "🌐 Frontend (React):  http://localhost:3000"
echo "🔧 API (Flask):      http://localhost:8000"
echo "🗄️  Database:        localhost:5432"
echo ""
echo "📊 Test API:         curl http://localhost:8000/api/search-food?q=apple"
echo ""
echo "To stop: docker-compose down"

#!/bin/bash

echo "🚀 Starting ExerAI Application..."
echo "=================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "✅ Docker is running"
echo "✅ Docker Compose is available"

# Stop any existing containers
echo "🛑 Stopping any existing containers..."
docker-compose down

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "🎉 Application is starting up!"
echo "=================================="
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "🗄️  Database: localhost:5432"
echo ""
echo "⏰ Please wait 1-2 minutes for all services to fully initialize..."
echo ""
echo "📋 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"
echo "🔄 To restart: ./start.sh"
echo ""
echo "Happy demoing! 🚀" 
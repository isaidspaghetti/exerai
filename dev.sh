#!/bin/bash

# Development script for ExerAI with Docker volume mounting
# This enables hot reloading - your code changes will automatically reflect in the browser!

set -e

echo "🚀 ExerAI Development Environment"
echo "=================================="

case "$1" in
    "start"|"up")
        echo "Starting development environment with hot reloading..."
        echo "✅ Frontend: http://localhost:3000"
        echo "✅ Backend:  http://localhost:8000"
        echo "✅ Database: localhost:5432"
        echo ""
        echo "💡 Your code changes will automatically reload!"
        echo "💡 Press Ctrl+C to stop"
        echo ""
        docker-compose up --build
        ;;
    "stop"|"down")
        echo "Stopping development environment..."
        docker-compose down
        echo "✅ Stopped!"
        ;;
    "restart")
        echo "Restarting development environment..."
        docker-compose down
        docker-compose up --build
        ;;
    "logs")
        echo "Showing logs..."
        docker-compose logs -f
        ;;
    "clean")
        echo "Cleaning up Docker containers and volumes..."
        docker-compose down -v
        docker system prune -f
        echo "✅ Cleaned up!"
        ;;
    "rebuild")
        echo "Rebuilding containers..."
        docker-compose down
        docker-compose build --no-cache
        docker-compose up
        ;;
    *)
        echo "Usage: ./dev.sh [command]"
        echo ""
        echo "Commands:"
        echo "  start/up     - Start development environment with hot reloading"
        echo "  stop/down    - Stop development environment"
        echo "  restart      - Restart development environment"
        echo "  logs         - Show container logs"
        echo "  clean        - Clean up containers and volumes"
        echo "  rebuild      - Rebuild containers from scratch"
        echo ""
        echo "Examples:"
        echo "  ./dev.sh start    # Start development"
        echo "  ./dev.sh stop     # Stop development"
        echo "  ./dev.sh logs     # View logs"
        ;;
esac 
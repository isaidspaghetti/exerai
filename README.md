# ExerAI - Exercise Management Application

A modern web application for managing physical therapy exercises with a React frontend and Django backend.

## 🚀 Quick Start (For Interviewers)

### Prerequisites

- Docker
- Docker Compose

### One-Command Setup

```bash
# Clone the repository
git clone <repository-url>
cd exerai

# Start all services
docker-compose up --build
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: PostgreSQL on localhost:5432

## 🏗️ Architecture

### Frontend (React)

- **Framework**: React 17 with Hooks
- **Styling**: Tailwind CSS
- **State Management**: React useState/useEffect
- **HTTP Client**: Axios
- **Features**:
  - Infinite scroll pagination
  - Real-time search
  - Modal-based CRUD operations
  - Toast notifications
  - Responsive design

### Backend (Django)

- **Framework**: Django with Django REST Framework
- **Database**: PostgreSQL
- **Features**:
  - RESTful API endpoints
  - Automatic database migrations
  - Fixture data loading
  - CORS configuration

### Database

- **Type**: PostgreSQL 13
- **Data**: Pre-loaded with 50+ physical therapy exercises
- **Images**: High-quality Pexels images for each exercise

## 📋 Features

### Exercise Management

- ✅ View all exercises with infinite scroll
- ✅ Search exercises by name
- ✅ Create new exercises
- ✅ Update existing exercises
- ✅ Delete exercises
- ✅ High-quality exercise images

### User Experience

- ✅ Modern, responsive UI
- ✅ Infinite scroll pagination
- ✅ Real-time search
- ✅ Toast notifications
- ✅ Modal-based interactions
- ✅ Loading states

### Technical Features

- ✅ Docker containerization
- ✅ Automatic database setup
- ✅ Pre-loaded seed data
- ✅ Health checks
- ✅ Environment configuration

## 🔧 Development Setup

### Local Development

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

# Frontend
cd frontend
npm install
npm start
```

### Database Management

```bash
# Load fixture data
docker-compose exec backend python manage.py loaddata api/fixtures/movements.json

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Run migrations
docker-compose exec backend python manage.py migrate
```

## 🐳 Docker Services

### Services Overview

- **frontend**: React development server (port 3000)
- **backend**: Django REST API (port 8000)
- **db**: PostgreSQL database (port 5432)

### Environment Variables

All necessary environment variables are configured in `docker-compose.yml`:

- Database credentials
- Django settings
- Frontend configuration

## 📁 Project Structure

```
exerai/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── css/            # Stylesheets
│   │   └── constants/      # Application constants
│   ├── Dockerfile
│   └── package.json
├── backend/                 # Django application
│   ├── api/                # Main Django app
│   │   ├── fixtures/       # Seed data
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   └── serializers.py  # Data serializers
│   ├── Dockerfile
│   ├── entrypoint.sh       # Startup script
│   └── requirements.txt
├── docker-compose.yml      # Multi-service orchestration
└── README.md
```

## 🚨 Troubleshooting

### Common Issues

**Port already in use**

```bash
# Stop existing containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Rebuild and start
docker-compose up --build
```

**Database connection issues**

```bash
# Check database health
docker-compose ps

# View logs
docker-compose logs db
docker-compose logs backend
```

**Frontend not loading**

```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose build frontend
docker-compose up frontend
```

### Reset Everything

```bash
# Complete reset
docker-compose down -v
docker system prune -f
docker-compose up --build
```

## 🎯 Demo Features to Show

1. **Infinite Scroll**: Scroll down to see more exercises load automatically
2. **Search**: Use the search bar to filter exercises
3. **CRUD Operations**:
   - Click "Create" to add a new exercise
   - Click on any exercise card to edit
   - Use the delete button to remove exercises
4. **Responsive Design**: Resize the browser to see mobile responsiveness
5. **Toast Notifications**: Actions show success/error messages

## 📊 API Endpoints

- `GET /movements/` - List all movements
- `POST /movements/` - Create new movement
- `GET /movements/{id}/` - Get specific movement
- `PUT /movements/{id}/` - Update movement
- `DELETE /movements/{id}/` - Delete movement

## 🔒 Security Notes

- This is a demo application with basic security
- Database credentials are simplified for demo purposes
- CORS is configured for development
- Production deployment would require additional security measures

## 📝 Notes for Interviewers

- **Startup Time**: First run may take 2-3 minutes to build images and load data
- **Data**: Application comes pre-loaded with 50+ physical therapy exercises
- **Images**: All exercises have high-quality Pexels images
- **Performance**: Infinite scroll loads 12 items at a time for optimal performance
- **Code Quality**: Follows React and Django best practices
- **Scalability**: Architecture supports easy scaling and feature additions

---

**Ready to demo!** 🎉

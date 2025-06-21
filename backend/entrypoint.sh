#!/bin/bash
set -e

# Wait for DB to be ready using the DATABASE_URL
until pg_isready -d "$DATABASE_URL"; do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

echo "PostgreSQL is up - continuing"

# Apply DB migrations
python manage.py migrate

# Load fixtures (if they exist)
if [ -f api/fixtures/exercises.json ]; then
  python manage.py loaddata api/fixtures/exercises.json || true
fi
if [ -f api/fixtures/movements.json ]; then
  python manage.py loaddata api/fixtures/movements.json || true
fi

# Start server with gunicorn
echo "Starting Django app with Gunicorn..."
exec gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT 
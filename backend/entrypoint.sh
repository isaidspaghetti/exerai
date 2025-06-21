#!/bin/bash
set -e

# Wait for DB to be ready
until pg_isready -h "$POSTGRES_HOST" -U "$POSTGRES_USER"; do
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

# Start server
echo "Starting Django app..."
exec python manage.py runserver 0.0.0.0:8000 
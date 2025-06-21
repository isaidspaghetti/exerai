FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /backend

# Install build dependencies
RUN apt-get update && apt-get install -y gcc python3-dev musl-dev postgresql-client && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN chmod +x /backend/entrypoint.sh
ENTRYPOINT ["/backend/entrypoint.sh"] 
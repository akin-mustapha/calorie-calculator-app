# Use Python 3.11 slim image for smaller size
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first for better Docker layer caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Expose port 8000 for the web application
EXPOSE 8000

# Run the application with Gunicorn production server
CMD ["gunicorn", "run:app", "-c", "gunicorn.conf.py"]

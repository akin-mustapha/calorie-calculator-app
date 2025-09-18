"""
Gunicorn Configuration for Production Deployment

Optimized settings for running the calorie calculator web application
in production with proper worker management and performance tuning.
"""

# Server socket binding
bind = "0.0.0.0:8000"

# Worker processes - adjust based on CPU cores (2 * cores + 1)
workers = 2

# Worker class - sync is good for CPU-bound tasks
worker_class = "sync"

# Request timeout in seconds
timeout = 30

# Keep connections alive to reduce overhead
keepalive = 2

# Restart workers after handling this many requests (prevents memory leaks)
max_requests = 1000
max_requests_jitter = 100  # Add randomness to prevent thundering herd

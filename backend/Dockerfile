# Use an official Python 3.11 image that supports ARM
FROM python:3.13-slim

# Set a working directory
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install the dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Expose the port that FastAPI will run on
EXPOSE 81

# Define the command to run FastAPI
CMD ["fastapi", "run", "main.py", "--port", "81"] 
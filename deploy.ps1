# filepath: c:\Users\leoni\1Uni\Bachelorarbeit\Code\recipe_web_app\deploy.ps1

# Stop and remove the existing frontend and backend containers, if running
docker-compose -f deploy.yml down

# Remove old images
docker rmi web-app-backend web-app-frontend -f

# Build and start new containers
docker-compose -f deploy.yml up --build -d

docker system prune -af
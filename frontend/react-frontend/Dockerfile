# Schritt 1: Build der React-App
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Schritt 2: Ausliefern über Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: Eigene Nginx-Konfig, wenn du z. B. Routing brauchst
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

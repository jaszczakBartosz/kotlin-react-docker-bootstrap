FROM gradle:jdk21-alpine AS backend-build
WORKDIR /app/backend
COPY backend .
RUN gradle build --no-daemon --parallel --configure-on-demand -x test

FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache nginx dos2unix

WORKDIR /app

COPY --from=backend-build /app/backend/build/libs/*.jar app.jar

COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh .
RUN dos2unix start.sh && chmod +x start.sh

EXPOSE 80 8080

CMD ["sh", "./start.sh"]
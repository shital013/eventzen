# Build stage (using newer Maven image)
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /workspace
COPY pom.xml .
COPY src src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]

FROM gradle:8.5-jdk17 AS build

WORKDIR /app

COPY gradlew gradlew.bat ./
COPY gradle/ gradle/
COPY build.gradle settings.gradle ./
RUN ./gradlew dependencies --no-daemon

COPY src/ src/
RUN ./gradlew build --no-daemon -x test

FROM amazoncorretto:17-alpine

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"

CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
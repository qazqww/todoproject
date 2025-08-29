FROM gradle:8.5-jdk17 AS build

WORKDIR /app

COPY build.gradle settings.gradle ./
COPY gradle/ gradle/
COPY gradlew gradlew.bat ./

RUN gradle dependencies --no-daemon

COPY src/ src/

RUN gradle build --no-daemon -x test

FROM openjdk:17

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"

CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
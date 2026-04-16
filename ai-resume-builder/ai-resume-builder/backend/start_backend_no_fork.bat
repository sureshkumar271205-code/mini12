@echo off
set "JAVA_HOME=c:\Users\23IT025\Downloads\ai-resume-builder\ai-resume-builder\backend\local-jdk\jdk-11.0.30+7"
set "MAVEN_HOME=c:\Users\23IT025\Downloads\ai-resume-builder\ai-resume-builder\backend\local-maven\apache-maven-3.9.6"
set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"

echo Starting Spring Boot with fork=false...
call mvn spring-boot:run -Dspring-boot.run.fork=false -DskipTests

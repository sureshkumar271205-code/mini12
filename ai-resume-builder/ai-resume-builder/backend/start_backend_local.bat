@echo off
set "JAVA_HOME=c:\Users\23IT025\Downloads\ai-resume-builder\ai-resume-builder\backend\local-jdk\jdk-11.0.30+7"
set "MAVEN_HOME=c:\Users\23IT025\Downloads\ai-resume-builder\ai-resume-builder\backend\local-maven\apache-maven-3.9.6"
set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"

echo [DEBUG] JAVA_HOME is %JAVA_HOME%
echo [DEBUG] MAVEN_HOME is %MAVEN_HOME%

call java -version
call mvn -version

echo Starting Spring Boot clean run...
call mvn clean spring-boot:run -DskipTests

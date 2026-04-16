@echo off
setlocal
title AI Resume Builder - Single Port Mode

echo [INFO] Starting build and run process at %DATE% %TIME% > startup.log

echo ==========================================
echo    BUILDING FRONTEND (for Single Port)
echo ==========================================
echo [INFO] Building frontend... >> startup.log

cd frontend
if not exist "node_modules" (
    echo [INFO] Installing frontend dependencies... >> ..\startup.log
    call npm install >> ..\startup.log 2>&1
)
echo [INFO] Building frontend...
call npm run build >> ..\startup.log 2>&1

cd ..

echo [INFO] Preparing Backend Static Resources... >> startup.log
if not exist "backend\src\main\resources\static" mkdir "backend\src\main\resources\static"
echo [INFO] Copying frontend build to backend... >> startup.log
xcopy /E /I /Y "frontend\dist\*" "backend\src\main\resources\static\" >> startup.log 2>&1

echo ==========================================
echo    STARTING BACKEND (Serving Frontend)
echo ==========================================
echo [INFO] Starting Backend Server on port 8085... >> startup.log

cd backend
REM Set local environment for Maven and Java
set "JAVA_HOME=%~dp0backend\local-jdk\jdk-11.0.30+7"
set "MAVEN_HOME=%~dp0backend\local-maven\apache-maven-3.9.6"
set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"

echo [INFO] Environment set: JAVA_HOME=%JAVA_HOME% >> ..\startup.log
echo [INFO] Running mvn clean spring-boot:run >> ..\startup.log

call mvn clean spring-boot:run >> ..\startup.log 2>&1

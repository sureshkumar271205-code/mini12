@echo off
echo Starting npm install for react-router-dom... > npm_status.txt
call npm install react-router-dom >> npm_status.txt 2>&1
if %ERRORLEVEL% equ 0 (
    echo npm install finished successfully. >> npm_status.txt
) else (
    echo npm install failed with exit code %ERRORLEVEL%. >> npm_status.txt
)
echo Job done. >> npm_status.txt

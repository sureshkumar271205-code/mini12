@echo off
echo Starting npm run build... > build_status.txt
call npm run build >> build_status.txt 2>&1
if %ERRORLEVEL% equ 0 (
    echo Build successful. >> build_status.txt
) else (
    echo Build failed with exit code %ERRORLEVEL%. >> build_status.txt
)

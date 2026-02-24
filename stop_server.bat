@echo off
echo Szukanie procesu na porcie 80...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :80') do (
    taskkill /f /pid %%a >nul 2>&1
)
pause

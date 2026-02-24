@echo off
chcp 65001 >nul
cd /d "%~dp0"
:loop
echo Starting HeatManager Server...
call npm run serve
timeout /t 5
goto loop

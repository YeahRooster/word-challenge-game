@echo off
echo Reiniciando servidor de desarrollo para Word Challenge...
taskkill /f /im node.exe >nul 2>&1
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev -- --port 3000
pause

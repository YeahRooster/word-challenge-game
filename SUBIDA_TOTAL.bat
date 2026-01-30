@echo off
set /p msg="Introduce el mensaje de los cambios (o pulsa Enter para 'Actualizacion'): "
if "%msg%"=="" set msg="Actualizacion"

echo.
echo === SUBIENDO CAMBIOS A GITHUB ===
git add .
git commit -m "%msg%"
git push origin main

echo.
echo === PROCESO COMPLETADO ===
echo Vercel detectara los cambios y actualizara tu web en segundos.
pause

@echo off

rem Verifica se a pasta node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
) else (
    echo As dependencias ja estao instaladas.
)

rem Inicia o aplicativo
echo Aplicativo iniciado.
npm start

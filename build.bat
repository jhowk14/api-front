@echo off

rem Verifica se a pasta node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
) else (
    echo As dependencias ja estão instaladas.
)

rem Faz o build da aplicacao
echo Fazendo build da aplicação...
npm run build

echo Build Completa !!

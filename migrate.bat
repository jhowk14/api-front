@echo off

rem Verifica se a pasta node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
) else (
    echo As dependencias ja estao instaladas.
)

rem Aplica as migracoes do Prisma
npx prisma migrate dev

rem Gera os artefatos do Prisma Client
npx prisma generate

echo Migracoes realizadas.
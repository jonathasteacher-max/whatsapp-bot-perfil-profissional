@echo off
REM ========================================
REM Instalação - Bot WhatsApp Perfil
REM ========================================

echo.
echo ================================================
echo   INSTALACAO BOT WHATSAPP - PERFIL PROFISSIONAL
echo ================================================
echo.

echo [1/3] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Baixe em: https://nodejs.org
    pause
    exit /b 1
)
node --version
echo OK!
echo.

echo [2/3] Instalando dependencias...
echo Isso pode levar alguns minutos...
call npm install
if errorlevel 1 (
    echo ERRO ao instalar dependencias!
    pause
    exit /b 1
)
echo OK!
echo.

echo [3/3] Verificando configuracao...
if exist .env (
    echo Arquivo .env encontrado!
) else (
    echo AVISO: Arquivo .env nao encontrado!
    echo Por favor, copie .env.example para .env e configure.
)
echo.

echo ================================================
echo   INSTALACAO CONCLUIDA!
echo ================================================
echo.
echo Proximos passos:
echo 1. Configure o arquivo .env com seus dados
echo 2. Execute: iniciar.bat
echo 3. Escaneie o QR Code
echo.
pause

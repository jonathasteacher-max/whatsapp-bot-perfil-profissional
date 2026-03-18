@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🗑️  DESINSTALANDO SERVIÇO DO BOT
echo ════════════════════════════════════════════════════════════
echo.

REM Verifica se está executando como administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ ERRO: Este script precisa ser executado como ADMINISTRADOR!
    echo.
    echo 📌 Como executar como administrador:
    echo    1. Clique com botão direito neste arquivo
    echo    2. Selecione "Executar como administrador"
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0"

echo 🛑 Parando bot...
call pm2 stop whatsapp-bot-perfil 2>nul

echo.
echo 🗑️  Removendo bot do PM2...
call pm2 delete whatsapp-bot-perfil 2>nul

echo.
echo 💾 Salvando configuração...
call pm2 save --force

echo.
echo 🔧 Removendo inicialização automática...
call pm2 unstartup

echo.
echo ════════════════════════════════════════════════════════════
echo   ✅ SERVIÇO DESINSTALADO COM SUCESSO!
echo ════════════════════════════════════════════════════════════
echo.
echo O bot não vai mais iniciar automaticamente com Windows.
echo.
echo 💡 Para iniciar manualmente novamente, execute: npm run dev
echo.
pause

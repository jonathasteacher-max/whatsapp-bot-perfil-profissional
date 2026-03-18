@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🧪 TESTE RÁPIDO - INSTALAÇÃO PM2
echo ════════════════════════════════════════════════════════════
echo.
echo Este script NÃO precisa de administrador
echo Serve apenas para testar se tudo funciona
echo.

cd /d "%~dp0"

echo 📦 Paso 1: Instalando PM2...
echo.
call npm install -g pm2
echo.

if %errorLevel% neq 0 (
    echo ❌ ERRO ao instalar PM2
    echo.
    pause
    exit /b 1
)

echo ✅ PM2 instalado!
echo.

echo 📦 Passo 2: Verificando dependências do bot...
if not exist node_modules (
    echo    Instalando dependências...
    call npm install
)
echo ✅ Dependências OK
echo.

echo 🛑 Passo 3: Limpando processos anteriores...
pm2 delete whatsapp-bot-perfil >nul 2>&1
echo ✅ Limpo
echo.

echo 🚀 Passo 4: Iniciando bot em background...
echo.
call pm2 start npm --name "whatsapp-bot-perfil" -- run dev
echo.

if %errorLevel% neq 0 (
    echo ❌ ERRO ao iniciar
    echo.
    pause
    exit /b 1
)

echo ✅ Bot iniciado!
echo.

echo 💾 Passo 5: Salvando configuração...
call pm2 save
echo ✅ Salvo
echo.

echo ════════════════════════════════════════════════════════════
echo   ✅ TESTE CONCLUÍDO COM SUCESSO!
echo ════════════════════════════════════════════════════════════
echo.
echo 📊 Status atual:
echo.
call pm2 status
echo.
echo ════════════════════════════════════════════════════════════
echo.
echo 📱 O QR CODE DEVE APARECER NOS LOGS!
echo.
echo Pressione qualquer tecla para ver os logs...
pause >nul

cls
echo.
echo ════════════════════════════════════════════════════════════
echo   📄 LOGS EM TEMPO REAL
echo ════════════════════════════════════════════════════════════
echo.
echo Aguardando QR Code aparecer...
echo Pressione Ctrl+C quando escanear o QR Code
echo.
echo ════════════════════════════════════════════════════════════
echo.

timeout /t 3 /nobreak >nul

pm2 logs whatsapp-bot-perfil

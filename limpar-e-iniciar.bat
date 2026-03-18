@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🧹 LIMPANDO SESSÃO ANTERIOR E INICIANDO BOT
echo ════════════════════════════════════════════════════════════
echo.

cd /d "%~dp0"

echo 🗑️  Deletando pasta auth_info_baileys...
if exist auth_info_baileys (
    rmdir /s /q auth_info_baileys
    echo ✅ Pasta deletada com sucesso!
) else (
    echo ℹ️  Pasta não existe (primeira execução)
)

echo.
echo 📦 Verificando node_modules...
if not exist node_modules (
    echo ⚠️  node_modules não encontrado. Execute: npm install
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════════════════════════
echo   🚀 INICIANDO BOT - AGUARDE O QR CODE APARECER!
echo ════════════════════════════════════════════════════════════
echo.

npm run dev

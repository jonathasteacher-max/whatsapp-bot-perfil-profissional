@echo off
chcp 65001 >nul
cd /d "%~dp0"

cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🚀 INICIANDO BOT COM PM2
echo ════════════════════════════════════════════════════════════
echo.

echo Matando todos os processos PM2...
call pm2 kill
echo.

echo Iniciando bot...
call pm2 start npm --name "whatsapp-bot-perfil" -- run dev
echo.

echo Salvando...
call pm2 save
echo.

echo Status:
call pm2 status
echo.

echo ════════════════════════════════════════════════════════════
echo   Aguarde o QR Code aparecer nos logs abaixo...
echo   Pressione Ctrl+C para sair
echo ════════════════════════════════════════════════════════════
echo.

timeout /t 3 /nobreak >nul

pm2 logs whatsapp-bot-perfil

@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   📄 LOGS DO BOT EM TEMPO REAL
echo ════════════════════════════════════════════════════════════
echo.
echo Pressione Ctrl+C para sair
echo.

pm2 logs whatsapp-bot-perfil

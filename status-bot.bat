@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   📊 STATUS DO BOT
echo ════════════════════════════════════════════════════════════
echo.

pm2 status

echo.
echo ════════════════════════════════════════════════════════════
echo   📌 COMANDOS ÚTEIS
echo ════════════════════════════════════════════════════════════
echo.
echo   pm2 restart whatsapp-bot-perfil  - Reiniciar bot
echo   pm2 stop whatsapp-bot-perfil     - Parar bot
echo   pm2 logs whatsapp-bot-perfil     - Ver logs
echo   pm2 monit                        - Monitor em tempo real
echo.
pause

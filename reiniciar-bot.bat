@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🔄 REINICIANDO BOT
echo ════════════════════════════════════════════════════════════
echo.

REM Verifica se a pasta de sessão existe e deleta
if exist auth_info_baileys (
    echo 🗑️  Deletando sessão anterior...
    rmdir /s /q auth_info_baileys
    echo ✅ Sessão deletada
    echo.
)

echo 🔄 Reiniciando bot...
pm2 restart whatsapp-bot-perfil

if %errorLevel% equ 0 (
    echo.
    echo ✅ Bot reiniciado com sucesso!
    echo.
    echo 📱 O QR Code deve aparecer nos logs.
    echo    Execute: ver-logs.bat para visualizar
    echo.
) else (
    echo.
    echo ❌ Erro ao reiniciar. O bot está instalado?
    echo    Execute: instalar-servico.bat
    echo.
)

pause

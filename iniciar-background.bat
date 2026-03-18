@echo off
chcp 65001 >nul

cd /d "%~dp0"

cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🚀 INICIANDO BOT EM BACKGROUND (SEM PM2)
echo ════════════════════════════════════════════════════════════
echo.

echo Criando script de inicialização...
echo.

REM Cria um VBScript para rodar em background
echo Set WshShell = CreateObject("WScript.Shell") > start-hidden.vbs
echo WshShell.Run "cmd /c cd /d ""%~dp0"" && npm run dev", 0, False >> start-hidden.vbs

echo ✅ Script criado!
echo.

echo Iniciando bot em background...
cscript //nologo start-hidden.vbs

echo.
echo ════════════════════════════════════════════════════════════
echo   ✅ BOT INICIADO EM BACKGROUND!
echo ════════════════════════════════════════════════════════════
echo.
echo O bot está rodando em segundo plano.
echo.
echo 💡 Para ver os logs, execute: ver-logs-simples.bat
echo.
echo ⚠️  IMPORTANTE: Para ver o QR Code pela primeira vez,
echo    execute: npm run dev (na primeira conexão)
echo.
echo Para parar o bot, execute: parar-bot-simples.bat
echo.
pause

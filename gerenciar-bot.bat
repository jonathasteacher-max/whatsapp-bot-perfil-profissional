@echo off
chcp 65001 >nul

:MENU
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🤖 GERENCIADOR DO BOT WHATSAPP - PERFIL PROFISSIONAL
echo ════════════════════════════════════════════════════════════
echo.
echo   === EXECUÇÃO ===
echo   1. 🚀 Iniciar Bot (terminal visível)
echo   2. 🔇 Iniciar Bot em Background
echo   3. 🛑 Parar Bot
echo.
echo   === AUTO-START ===
echo   4. ⚙️  Configurar Auto-Start (precisa admin)
echo   5. 📊 Ver Status Auto-Start
echo   6. 🗑️  Remover Auto-Start (precisa admin)
echo.
echo   === MONITORAMENTO ===
echo   7. 📄 Ver Logs em Tempo Real
echo   8. 📊 Ver Status do Bot
echo.
echo   === OUTROS ===
echo   9. 📖 Abrir Documentação
echo   0. ❌ Sair
echo.
echo ════════════════════════════════════════════════════════════
echo.

set /p opcao="Escolha uma opção (0-9): "

if "%opcao%"=="1" goto INICIAR_VISIVEL
if "%opcao%"=="2" goto INICIAR_BACKGROUND
if "%opcao%"=="3" goto PARAR
if "%opcao%"=="4" goto CONFIG_AUTOSTART
if "%opcao%"=="5" goto STATUS_AUTOSTART
if "%opcao%"=="6" goto REMOVER_AUTOSTART
if "%opcao%"=="7" goto LOGS
if "%opcao%"=="8" goto STATUS
if "%opcao%"=="9" goto DOCS
if "%opcao%"=="0" goto SAIR

echo ❌ Opção inválida!
timeout /t 2 >nul
goto MENU

:INICIAR_VISIVEL
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🚀 INICIANDO BOT (TERMINAL VISÍVEL)
echo ════════════════════════════════════════════════════════════
echo.
echo O bot vai iniciar e você verá os logs aqui.
echo Pressione Ctrl+C para parar.
echo.
pause
npm run dev
goto MENU

:INICIAR_BACKGROUND
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🔇 INICIANDO BOT EM BACKGROUND
echo ════════════════════════════════════════════════════════════
echo.
call iniciar-background.bat
goto MENU

:PARAR
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🛑 PARANDO BOT
echo ════════════════════════════════════════════════════════════
echo.
call parar-bot-simples.bat
goto MENU

:CONFIG_AUTOSTART
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   ⚙️  CONFIGURAR AUTO-START
echo ════════════════════════════════════════════════════════════
echo.
echo ⚠️  ATENÇÃO: Este comando precisa ser executado como
echo    ADMINISTRADOR!
echo.
pause
call configurar-autostart.bat
goto MENU

:STATUS_AUTOSTART
cls
call status-autostart.bat
goto MENU

:REMOVER_AUTOSTART
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🗑️  REMOVER AUTO-START
echo ════════════════════════════════════════════════════════════
echo.
echo ⚠️  ATENÇÃO: Este comando precisa ser executado como
echo    ADMINISTRADOR!
echo.
pause
call remover-autostart.bat
goto MENU

:LOGS
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   📄 LOGS DO BOT
echo ════════════════════════════════════════════════════════════
echo.
echo Nota: Se o bot estiver rodando em background, os logs
echo podem não aparecer aqui. Use "Iniciar Bot" (opção 1) para
echo ver logs em tempo real.
echo.
pause
goto MENU

:STATUS
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   📊 STATUS DO BOT
echo ════════════════════════════════════════════════════════════
echo.
tasklist /fi "imagename eq node.exe" 2>nul | find /i "node.exe" >nul
if %errorLevel% equ 0 (
    echo ✅ Bot está RODANDO
    echo.
    tasklist /fi "imagename eq node.exe"
) else (
    echo ❌ Bot NÃO está rodando
)
echo.
pause
goto MENU

:DOCS
cls
start README.md
echo.
echo ✅ Documentação aberta!
echo.
timeout /t 2 >nul
goto MENU

:SAIR
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   👋 Até logo!
echo ════════════════════════════════════════════════════════════
echo.
echo O bot continua rodando em segundo plano.
echo.
timeout /t 2 >nul
exit

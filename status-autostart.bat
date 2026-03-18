@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   📊 STATUS DO AUTO-START
echo ════════════════════════════════════════════════════════════
echo.

echo Verificando se tarefa está configurada...
echo.

schtasks /query /tn "WhatsAppBotPerfilProfissional" >nul 2>&1

if %errorLevel% equ 0 (
    echo ✅ AUTO-START ESTÁ CONFIGURADO
    echo.
    echo Detalhes da tarefa:
    echo ────────────────────────────────────────────────────────────
    schtasks /query /tn "WhatsAppBotPerfilProfissional" /fo LIST /v | findstr /i "TaskName Status NextRun LastRun"
    echo ────────────────────────────────────────────────────────────
    echo.
    echo 📌 O bot vai iniciar automaticamente no próximo login
) else (
    echo ❌ AUTO-START NÃO ESTÁ CONFIGURADO
    echo.
    echo Para configurar, execute como administrador:
    echo    configurar-autostart.bat
)

echo.
echo ════════════════════════════════════════════════════════════
echo   🔍 PROCESSOS NODE.JS EM EXECUÇÃO
echo ════════════════════════════════════════════════════════════
echo.

tasklist /fi "imagename eq node.exe" 2>nul | find /i "node.exe" >nul

if %errorLevel% equ 0 (
    echo ✅ Bot está RODANDO agora
    echo.
    tasklist /fi "imagename eq node.exe"
) else (
    echo ❌ Bot NÃO está rodando
    echo.
    echo Para iniciar, execute:
    echo    • npm run dev (com terminal visível)
    echo    • iniciar-background.bat (em background)
)

echo.
pause

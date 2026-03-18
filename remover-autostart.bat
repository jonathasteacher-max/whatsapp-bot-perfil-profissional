@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🗑️  REMOVER AUTO-START
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

echo ✅ Executando como administrador
echo.

echo Removendo tarefa do Agendador de Tarefas...
schtasks /delete /tn "WhatsAppBotPerfilProfissional" /f >nul 2>&1

if %errorLevel% equ 0 (
    echo ✅ Tarefa removida com sucesso!
) else (
    echo ℹ️  Tarefa não encontrada (pode já estar removida)
)

echo.

echo Removendo arquivo de script...
if exist "%~dp0startup-bot.vbs" (
    del "%~dp0startup-bot.vbs"
    echo ✅ Script removido
) else (
    echo ℹ️  Script não encontrado
)

echo.
echo ════════════════════════════════════════════════════════════
echo   ✅ AUTO-START DESABILITADO!
echo ════════════════════════════════════════════════════════════
echo.
echo O bot não vai mais iniciar automaticamente.
echo.
echo 💡 Para iniciar manualmente: npm run dev
echo.
pause

@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🔧 CONFIGURAR AUTO-START COM WINDOWS
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

REM Cria script VBS que será executado na inicialização
echo Criando script de inicialização...
echo Set WshShell = CreateObject("WScript.Shell") > startup-bot.vbs
echo WshShell.Run "cmd /c cd /d ""%~dp0"" && npm run dev", 0, False >> startup-bot.vbs

echo ✅ Script criado!
echo.

REM Cria tarefa no Agendador de Tarefas do Windows
echo Criando tarefa no Agendador de Tarefas...
echo.

schtasks /create /tn "WhatsAppBotPerfilProfissional" /tr "\"%~dp0startup-bot.vbs\"" /sc onlogon /rl highest /f

if %errorLevel% neq 0 (
    echo.
    echo ❌ ERRO ao criar tarefa
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════════════════════════
echo   ✅ AUTO-START CONFIGURADO COM SUCESSO!
echo ════════════════════════════════════════════════════════════
echo.
echo 📌 O bot agora vai:
echo    • Iniciar automaticamente quando você fizer login no Windows
echo    • Rodar em segundo plano (sem janela visível)
echo    • Continuar rodando até desligar o PC
echo.
echo 🔍 Para verificar se está rodando:
echo    • Abra o Gerenciador de Tarefas (Ctrl+Shift+Esc)
echo    • Vá na aba "Detalhes"
echo    • Procure por "node.exe"
echo.
echo 🛑 Para parar o bot:
echo    • Execute: parar-bot-simples.bat
echo    OU
echo    • Mate o processo node.exe no Gerenciador de Tarefas
echo.
echo 📝 Tarefa criada: WhatsAppBotPerfilProfissional
echo.
echo 💡 Para testar agora sem reiniciar:
echo    1. Execute: iniciar-background.bat
echo    2. Ou aguarde o próximo login
echo.
pause

REM Pergunta se quer iniciar agora
echo.
set /p start_now="Deseja iniciar o bot agora? (S/N): "

if /i "%start_now%"=="S" (
    echo.
    echo Iniciando bot...
    start /b "" wscript.exe "%~dp0startup-bot.vbs"
    timeout /t 2 /nobreak >nul
    echo ✅ Bot iniciado em background!
    echo.
    echo Teste enviando "oi" de outro número WhatsApp
    echo.
)

pause

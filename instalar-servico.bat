@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🔧 INSTALANDO BOT COMO SERVIÇO DO WINDOWS
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

REM Verifica se PM2 está instalado
where pm2 >nul 2>&1
if %errorLevel% neq 0 (
    echo 📦 PM2 não encontrado. Instalando PM2 globalmente...
    echo.
    call npm install -g pm2
    
    if %errorLevel% neq 0 (
        echo.
        echo ❌ ERRO ao instalar PM2
        echo.
        echo 💡 Tente instalar manualmente:
        echo    npm install -g pm2
        echo.
        pause
        exit /b 1
    )
    
    echo.
    echo ✅ PM2 instalado com sucesso!
    echo.
) else (
    echo ✅ PM2 já está instalado
    echo.
)

REM Para o bot se estiver rodando
echo 🛑 Parando bot se estiver em execução...
pm2 stop whatsapp-bot-perfil >nul 2>&1
pm2 delete whatsapp-bot-perfil >nul 2>&1

echo.
echo 📦 Verificando dependências...
if not exist node_modules (
    echo    Instalando dependências...
    call npm install
    if %errorLevel% neq 0 (
        echo ❌ ERRO ao instalar dependências
        pause
        exit /b 1
    )
)

echo.
echo 🚀 Iniciando bot com PM2...
call pm2 start npm --name "whatsapp-bot-perfil" -- run dev

if %errorLevel% neq 0 (
    echo.
    echo ❌ ERRO ao iniciar bot
    echo.
    echo 💡 Possíveis soluções:
    echo    1. Verifique se as dependências estão instaladas: npm install
    echo    2. Tente iniciar manualmente: npm run dev
    echo    3. Verifique os logs: pm2 logs
    echo.
    pause
    exit /b 1
)

echo ✅ Bot iniciado com sucesso!

echo.
echo 💾 Salvando configuração do PM2...
call pm2 save

echo.
echo 🔧 Configurando inicialização automática...
echo.
call pm2 startup
echo.
echo ⚠️  IMPORTANTE: Copie e execute o comando que apareceu acima
echo    (se houver um comando começando com "pm2 startup...")
echo.

echo.
echo ════════════════════════════════════════════════════════════
echo   ✅ BOT INSTALADO COMO SERVIÇO COM SUCESSO!
echo ════════════════════════════════════════════════════════════
echo.
echo 📌 O bot agora vai:
echo    • Iniciar automaticamente quando Windows iniciar
echo    • Reiniciar automaticamente se travar
echo    • Rodar em segundo plano (pode fechar terminal)
echo.
echo 🔍 Comandos úteis:
echo    • pm2 status          - Ver status do bot
echo    • pm2 logs            - Ver logs em tempo real
echo    • pm2 restart all     - Reiniciar bot
echo    • pm2 stop all        - Parar bot temporariamente
echo.
echo 📱 Escaneie o QR Code agora (se aparecer nos logs)
echo    Execute: pm2 logs whatsapp-bot-perfil
echo.
echo 📊 Ver status: pm2 status
echo.
echo ⏳ Pressione qualquer tecla para ver os logs em tempo real...
pause >nul

echo.
echo ════════════════════════════════════════════════════════════
echo   📄 LOGS EM TEMPO REAL (Ctrl+C para sair)
echo ════════════════════════════════════════════════════════════
echo.

REM Aguarda 2 segundos para o bot inicializar
timeout /t 2 /nobreak >nul

REM Mostra os logs
pm2 logs whatsapp-bot-perfil

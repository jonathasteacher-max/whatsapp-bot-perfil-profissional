@echo off
echo ========================================
echo   DEPLOY RAILWAY - WHATSAPP BOT
echo ========================================
echo.

echo Verificando se Git esta inicializado...
if not exist .git (
    echo [1/5] Inicializando Git...
    git init
    echo.
) else (
    echo Git ja inicializado!
    echo.
)

echo [2/5] Adicionando arquivos...
git add .
echo.

echo [3/5] Fazendo commit...
set /p commit_msg="Digite a mensagem do commit (ou Enter para usar padrao): "
if "%commit_msg%"=="" set commit_msg=Update bot code

git commit -m "%commit_msg%"
echo.

echo [4/5] Verificando remote...
git remote -v | findstr origin >nul
if errorlevel 1 (
    echo.
    echo ATENCAO: Nenhum repositorio GitHub configurado!
    echo.
    echo 1. Crie um repositorio em: https://github.com/new
    echo 2. Execute:
    echo    git remote add origin https://github.com/SEU-USUARIO/whatsapp-bot-perfil-profissional.git
    echo.
    pause
    exit /b
)

echo [5/5] Fazendo push para GitHub...
git push
echo.

echo ========================================
echo   DEPLOY CONCLUIDO!
echo ========================================
echo.
echo Railway vai fazer deploy automaticamente.
echo Acompanhe em: https://railway.app
echo.
pause

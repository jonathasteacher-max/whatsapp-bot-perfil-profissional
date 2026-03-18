@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🔧 GERENCIAR COOLDOWN (LIMITE DE 1 MSG/DIA)
echo ════════════════════════════════════════════════════════════
echo.

cd /d "%~dp0"

if not exist contacts-cooldown.json (
    echo ℹ️  Arquivo de cooldown não existe ainda.
    echo    Será criado automaticamente quando o bot receber a primeira mensagem.
    echo.
    pause
    exit /b 0
)

echo 📊 Contatos com cooldown ativo hoje:
echo.
type contacts-cooldown.json
echo.
echo ════════════════════════════════════════════════════════════
echo.
echo Opções:
echo   1. Ver arquivo completo
echo   2. Limpar TODOS os cooldowns (todos podem falar novamente)
echo   3. Voltar
echo.

set /p opcao="Escolha uma opção (1-3): "

if "%opcao%"=="1" (
    cls
    echo.
    echo ════════════════════════════════════════════════════════════
    echo   📄 ARQUIVO COMPLETO DE COOLDOWN
    echo ════════════════════════════════════════════════════════════
    echo.
    type contacts-cooldown.json
    echo.
    echo.
    pause
    exit /b 0
)

if "%opcao%"=="2" (
    echo.
    echo ⚠️  TEM CERTEZA? Isso vai permitir que TODOS os contatos
    echo    recebam resposta novamente hoje.
    echo.
    set /p confirm="Digite S para confirmar: "
    
    if /i "%confirm%"=="S" (
        del contacts-cooldown.json
        echo {"example": "Este arquivo será recriado automaticamente"} > contacts-cooldown.json
        echo.
        echo ✅ Todos os cooldowns foram limpos!
        echo    Todos os contatos podem receber resposta novamente.
        echo.
    ) else (
        echo.
        echo ❌ Operação cancelada
        echo.
    )
    pause
    exit /b 0
)

exit /b 0

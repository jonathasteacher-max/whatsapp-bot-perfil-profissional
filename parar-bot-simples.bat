@echo off
chcp 65001 >nul

cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🛑 PARANDO BOT
echo ════════════════════════════════════════════════════════════
echo.

echo Matando processos Node.js...
taskkill /F /IM node.exe 2>nul

if %errorLevel% equ 0 (
    echo ✅ Bot parado com sucesso!
) else (
    echo ℹ️  Nenhum bot rodando
)

echo.
pause

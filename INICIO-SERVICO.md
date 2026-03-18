# 🚀 INÍCIO RÁPIDO - Serviço do Windows

## ⚡ Instalação em 3 Passos

### 1️⃣ Execute como Administrador

**Clique com botão direito** em `instalar-servico.bat` e selecione:

```
"Executar como administrador"
```

### 2️⃣ Aguarde a Instalação

O script vai:
- Instalar PM2 (gerenciador de processos)
- Instalar dependências do bot
- Iniciar o bot automaticamente
- Configurar inicialização automática

### 3️⃣ Escaneie o QR Code

Execute:
```
ver-logs.bat
```

Aguarde o QR Code aparecer nos logs e escaneie com WhatsApp.

---

## ✅ Pronto!

Agora o bot:
- ✅ Roda em segundo plano
- ✅ Inicia automaticamente com Windows
- ✅ Reinicia automaticamente se travar
- ✅ Você pode fechar todos os terminais

---

## 📊 Gerenciamento Diário

### Menu Interativo
```
gerenciar-bot.bat
```

### Ver se está rodando
```
status-bot.bat
```

### Ver logs em tempo real
```
ver-logs.bat
```

### Reiniciar (gera novo QR Code)
```
reiniciar-bot.bat
```

---

## 🆘 Problemas?

### QR Code não aparece

1. Execute: `reiniciar-bot.bat`
2. Execute: `ver-logs.bat`
3. Aguarde 30 segundos
4. QR Code deve aparecer

### Bot não inicia

Execute como administrador:
```
instalar-servico.bat
```

### Erro "PM2 não reconhecido"

Execute `instalar-servico.bat` novamente como administrador.

---

## 📖 Documentação Completa

- [SERVICO-WINDOWS.md](SERVICO-WINDOWS.md) - Guia completo do serviço
- [README.md](README.md) - Documentação técnica do bot
- [EXEMPLOS-CONVERSAS.md](EXEMPLOS-CONVERSAS.md) - Exemplos de uso

---

**Dica**: Adicione `gerenciar-bot.bat` ao desktop para acesso rápido! 🎯

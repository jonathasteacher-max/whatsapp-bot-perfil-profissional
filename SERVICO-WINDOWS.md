# 🔧 Bot como Serviço do Windows

Este guia explica como instalar, gerenciar e desinstalar o bot como um serviço do Windows.

---

## 🚀 Instalação

### 1. Executar como Administrador

**IMPORTANTE**: Clique com **botão direito** em `instalar-servico.bat` e selecione **"Executar como administrador"**

```cmd
instalar-servico.bat
```

O script vai:
- ✅ Instalar PM2 (gerenciador de processos Node.js)
- ✅ Instalar dependências do projeto
- ✅ Iniciar o bot em segundo plano
- ✅ Configurar inicialização automática com Windows
- ✅ Configurar reinicialização automática se o bot travar

### 2. Escanear QR Code

Após a instalação, execute para ver os logs:

```cmd
ver-logs.bat
```

O QR Code vai aparecer nos logs. Escaneie com seu WhatsApp.

---

## 📊 Gerenciamento

### Ver Status do Bot

```cmd
status-bot.bat
```

Ou via comando direto:
```cmd
pm2 status
```

### Ver Logs em Tempo Real

```cmd
ver-logs.bat
```

Ou:
```cmd
pm2 logs whatsapp-bot-perfil
```

**Atalhos nos logs:**
- `Ctrl + C` - Sair dos logs (bot continua rodando)

### Reiniciar Bot (com limpeza de sessão)

```cmd
reiniciar-bot.bat
```

Deleta a pasta `auth_info_baileys` e reinicia o bot. Útil para gerar novo QR Code.

---

## 🔄 Comandos Úteis

### Parar Bot Temporariamente

```cmd
pm2 stop whatsapp-bot-perfil
```

### Iniciar Bot Novamente

```cmd
pm2 start whatsapp-bot-perfil
```

### Reiniciar Bot (mantém sessão)

```cmd
pm2 restart whatsapp-bot-perfil
```

### Monitor em Tempo Real

```cmd
pm2 monit
```

Mostra uso de CPU, memória e logs em tempo real.

### Ver Todas as Aplicações PM2

```cmd
pm2 list
```

---

## 🗑️ Desinstalação

Para remover o serviço completamente:

```cmd
desinstalar-servico.bat
```

(Executar como administrador)

Isso vai:
- ❌ Parar o bot
- ❌ Remover da lista do PM2
- ❌ Desabilitar inicialização automática

**NOTA**: O PM2 continua instalado globalmente. Para removê-lo completamente:

```cmd
npm uninstall -g pm2 pm2-windows-startup
```

---

## 💡 Perguntas Frequentes

### O bot vai iniciar quando eu ligar o PC?

✅ Sim! Automaticamente após instalar como serviço.

### Posso fechar o terminal?

✅ Sim! O bot roda em segundo plano via PM2.

### Como gerar um novo QR Code?

Execute `reiniciar-bot.bat` (deleta a sessão e reinicia).

### O bot reinicia sozinho se travar?

✅ Sim! O PM2 monitora e reinicia automaticamente.

### Como ver se o bot está rodando?

Execute `status-bot.bat` ou `pm2 status`

### Como atualizar o código do bot?

1. Faça suas alterações no código
2. Execute `pm2 restart whatsapp-bot-perfil`

Não precisa parar o serviço completamente.

### Onde ficam os logs?

Os logs do PM2 ficam em:
```
C:\Users\jonat\.pm2\logs\
```

Mas é mais fácil ver via `pm2 logs` ou `ver-logs.bat`

---

## 🔐 Segurança

### Executar sem Administrador (depois de instalado)

Após instalar como serviço, os comandos de gerenciamento NÃO precisam de administrador:

- ✅ `pm2 logs` - funciona normal
- ✅ `pm2 restart` - funciona normal
- ✅ `pm2 status` - funciona normal

Apenas a **instalação** e **desinstalação** precisam de admin.

---

## 🆘 Resolução de Problemas

### "PM2 não é reconhecido como comando"

Execute `instalar-servico.bat` como administrador novamente.

### Bot não gera QR Code

1. Execute `reiniciar-bot.bat`
2. Execute `ver-logs.bat` e aguarde 30 segundos
3. O QR Code deve aparecer nos logs

### Bot para após um tempo

Verifique os logs para identificar o erro:
```cmd
pm2 logs whatsapp-bot-perfil --lines 100
```

### Como limpar logs antigos

```cmd
pm2 flush
```

---

## 📌 Resumo dos Scripts

| Script | Função | Precisa Admin? |
|--------|--------|----------------|
| `instalar-servico.bat` | Instala bot como serviço | ✅ Sim |
| `desinstalar-servico.bat` | Remove serviço | ✅ Sim |
| `status-bot.bat` | Mostra status | ❌ Não |
| `ver-logs.bat` | Mostra logs em tempo real | ❌ Não |
| `reiniciar-bot.bat` | Reinicia e limpa sessão | ❌ Não |

---

## 🎯 Workflow Recomendado

### Primeira vez:
1. ✅ Execute `instalar-servico.bat` como **ADMINISTRADOR**
2. ✅ Execute `ver-logs.bat` para ver QR Code
3. ✅ Escaneie QR Code no WhatsApp
4. ✅ Pode fechar todos os terminais

### Uso diário:
- Bot roda sozinho em segundo plano
- Reinicia automaticamente se travar
- Inicia automaticamente quando ligar o PC

### Se precisar de novo QR Code:
1. Execute `reiniciar-bot.bat`
2. Execute `ver-logs.bat`
3. Escaneie novo QR Code

---

## ✅ Vantagens do Serviço

- 🔄 **Auto-reinício**: Bot reinicia se travar
- 🚀 **Auto-start**: Inicia com Windows
- 📊 **Monitoramento**: PM2 monitora CPU, memória, uptime
- 📝 **Logs**: Histórico completo de execução
- 💻 **Background**: Não precisa manter terminal aberto
- 🔧 **Gerenciamento fácil**: Scripts simples para tudo

---

**Criado em**: Março de 2026  
**Autor**: Jonathas Severino  
**Tecnologia**: PM2 + Node.js + TypeScript

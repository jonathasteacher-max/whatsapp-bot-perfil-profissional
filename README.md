# 🤖 Bot WhatsApp - Perfil Profissional

Bot inteligente para apresentação de perfil técnico profissional focado em **Dynamics 365** e **Power Platform**.

## 🎯 Objetivo

Apresentar de forma elegante, técnica e profissional o perfil de um Desenvolvedor Sênior especializado em Dynamics 365 CE e Power Platform, facilitando conexões com oportunidades e projetos alinhados.

## ✨ Características

- **Tom Profissional**: Comunicação madura e consultiva
- **Posicionamento Técnico**: Foco em Dynamics 365 CE, não low-code
- **Identificação de Intenção**: Reconhece palavras-chave técnicas
- **Menu Interativo**: 5 opções claras e objetivas
- **Arquitetura Limpa**: Código modular e desacoplado

## 🏗️ Arquitetura

```
src/
├── app/           # Configuração Express
├── config/        # Environment, logger, profile
├── controllers/   # HTTP controllers (health, webhook)
├── services/      # Lógica de negócio (BotService, IntentService)
├── providers/     # WhatsApp provider (desacoplado)
├── routes/        # Express routes
├── types/         # TypeScript types e interfaces
└── server.ts      # Entry point
```

## 📋 Pré-requisitos

- Node.js 18+
- WhatsApp (1 número dedicado)
- Conexão com internet

## 🚀 Instalação

### 1. Clonar e instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

Copie `.env.example` para `.env` e preencha:

```env
# Servidor
PORT=3000
HOST=0.0.0.0
NODE_ENV=development

# WhatsApp
WHATSAPP_SESSION_PATH=./auth_info_baileys

# Logs
LOG_LEVEL=info

# Perfil Profissional (PREENCHER)
PROFILE_NAME=Seu Nome Completo
PROFILE_TITLE=Desenvolvedor Sênior | Dynamics 365 & Power Platform
PROFILE_CITY=Sua Cidade
PROFILE_LINKEDIN=https://linkedin.com/in/seu-perfil
PROFILE_EMAIL=seu@email.com
PROFILE_WHATSAPP=5511999999999
```

### 3. Iniciar o bot

```bash
npm run dev
```

### 4. Conectar WhatsApp

1. Vai aparecer um QR Code no terminal
2. Abra WhatsApp no celular
3. Vá em **Menu → Aparelhos conectados → Conectar um aparelho**
4. Escaneie o QR Code
5. ✅ Bot conectado!

## 💬 Fluxos Conversacionais

### Mensagem de Abertura

```
Olá! 👋
Atuo como Desenvolvedor Sênior com foco em Dynamics 365 e Power Platform,
com experiência na construção, customização e evolução de soluções corporativas
no ecossistema Microsoft.

Estruturei este contato para apresentar de forma objetiva meu perfil técnico,
minhas principais especialidades e como posso apoiar oportunidades e projetos.

Como deseja seguir?
```

### Menu Principal

1️⃣ 👨‍💻 Sobre meu perfil  
2️⃣ ⚙️ Especialidades em Dynamics e Power Platform  
3️⃣ 🚀 Oportunidades e projetos  
4️⃣ 💬 Falar comigo  
5️⃣ ❓ Outros assuntos

### Identificação de Intenção

O bot reconhece automaticamente palavras-chave:

- **Técnicas**: dynamics, plugin, javascript, dataverse, power platform
- **Oportunidades**: vaga, projeto, consultoria, oportunidade
- **Contato**: falar, conversar, contato

## 🛠️ Stack Técnico

- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript 5.3+
- **Framework**: Express 4.18
- **WhatsApp**: Baileys 6.6 (WhatsApp Web API)
- **Validação**: Zod 3.22
- **Logging**: Pino 8.18
- **QR Code**: qrcode-terminal 0.12

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

Resposta:
```json
{
  "status": "healthy",
  "timestamp": "2026-03-17T00:00:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

### Webhook (future use)
```
POST /api/webhook/messages
```

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento (hot reload)
npm run dev

# Build para produção
npm run build

# Rodar produção
npm start

# Lint
npm run lint

# Format
npm run format
```

## � Rodar como Serviço do Windows

Para que o bot inicie automaticamente com o Windows e rode em segundo plano:

### Instalação Rápida

1. **Execute como Administrador**: `instalar-servico.bat`
2. Aguarde a instalação do PM2
3. O bot vai iniciar automaticamente
4. Execute `ver-logs.bat` para ver o QR Code
5. Escaneie o QR Code no WhatsApp
6. ✅ Pronto! Pode fechar o terminal

### Gerenciamento do Serviço

Execute `gerenciar-bot.bat` para acessar o menu interativo:

```
1. 🚀 Instalar como Serviço
2. 📊 Ver Status do Bot
3. 📄 Ver Logs em Tempo Real
4. 🔄 Reiniciar Bot (limpa sessão)
5. ⏸️  Parar Bot Temporariamente
6. ▶️  Iniciar Bot
7. 🗑️  Desinstalar Serviço
8. 📖 Abrir Documentação
```

### Comandos Úteis

```bash
# Ver status
pm2 status

# Ver logs em tempo real
pm2 logs whatsapp-bot-perfil

# Reiniciar bot
pm2 restart whatsapp-bot-perfil

# Parar bot
pm2 stop whatsapp-bot-perfil

# Iniciar bot
pm2 start whatsapp-bot-perfil
```

### Vantagens do Serviço

- ✅ Inicia automaticamente com Windows
- ✅ Reinicia automaticamente se travar
- ✅ Roda em segundo plano (pode fechar terminal)
- ✅ Monitoramento de CPU, memória e logs
- ✅ Fácil gerenciamento via scripts

**Documentação completa**: [SERVICO-WINDOWS.md](SERVICO-WINDOWS.md)

---

## �📁 Estrutura de Arquivos

```
whatsapp-bot-perfil-profissional/
├── src/
│   ├── app/
│   │   └── index.ts                # Express app setup
│   ├── config/
│   │   ├── environment.ts          # Env vars validation
│   │   ├── logger.ts               # Pino logger
│   │   └── profile.ts              # Profile config & messages
│   ├── controllers/
│   │   ├── HealthController.ts     # Health check
│   │   └── WebhookController.ts    # Webhook handler
│   ├── providers/
│   │   ├── IWhatsAppProvider.ts    # Interface
│   │   └── WhatsAppWebProvider.ts  # Baileys implementation
│   ├── routes/
│   │   └── index.ts                # Express routes
│   ├── services/
│   │   ├── BotService.ts           # Main bot logic
│   │   └── IntentService.ts        # Intent recognition
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   └── server.ts                   # Entry point
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## 🧪 Exemplos de Conversas

### Exemplo 1: Primeiro contato

```
Cliente: oi
Bot: [Mensagem de boas-vindas + Menu]
Cliente: 1
Bot: [Apresentação do perfil + Menu]
```

### Exemplo 2: Com intenção identificada

```
Cliente: trabalho com dynamics 365
Bot: [Especialidades técnicas + Menu]
```

### Exemplo 3: Interesse em oportunidade

```
Cliente: tenho uma vaga
Bot: [Mensagem sobre oportunidades + Menu]
```

### Exemplo 4: Contato direto

```
Cliente: quero conversar
Bot: [Mensagem de contato]
Cliente: [Escreve livremente]
Bot: [Em estado de conversa livre]
```

## 🎯 Diferenciais

✅ **Posicionamento Técnico**: Não é um bot "vendedor"  
✅ **Tom Maduro**: Comunicação consultiva e profissional  
✅ **Inteligência Simples**: Reconhece contexto técnico  
✅ **Arquitetura Limpa**: Código organizado e extensível  
✅ **Provider Desacoplado**: Fácil trocar WhatsApp provider  

## 🔐 Segurança

- Sessão WhatsApp em `auth_info_baileys/` (não commitar)
- `.env` com credenciais (não commitar)
- Validação de env vars com Zod
- Logs estruturados com Pino

## 📝 Customização

### Alterar mensagens

Edite: `src/config/profile.ts`

### Adicionar palavras-chave

Edite: `src/services/IntentService.ts`

### Modificar fluxos

Edite: `src/services/BotService.ts`

## ❓ Troubleshooting

### QR Code não aparece

- Verifique se porta 3000 está livre
- Reinstale dependências: `npm install`

### Bot não responde

- Verifique logs no terminal
- Confirme se está "connected to WA"
- Reinicie: `Ctrl+C` e `npm run dev`

### PowerShell execution policy

Use CMD em vez de PowerShell, ou:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## 📄 Licença

MIT

## 👤 Autor

Jonathan - Desenvolvedor Sênior | Dynamics 365 & Power Platform

---

**Versão**: 1.0.0  
**Data**: Março 2026

# ⚡ Instalação Rápida - Bot WhatsApp Perfil Profissional

Guia rápido para ter o bot funcionando em 5 minutos.

## 🎯 O que é este bot?

Bot WhatsApp profissional para apresentar seu perfil técnico em **Dynamics 365** e **Power Platform** de forma elegante e consultiva.

## 📦 Instalação Express

### Passo 1: Instalar dependências

Abra o **CMD** (Prompt de Comando) e execute:

```cmd
cd C:\caminho\para\whatsapp-bot-perfil-profissional
npm install
```

⏱️ Aguarde ~2-3 minutos.

### Passo 2: Configurar perfil

Edite o arquivo `.env` e preencha seus dados:

```env
PROFILE_NAME=Seu Nome Completo
PROFILE_TITLE=Desenvolvedor Sênior | Dynamics 365 & Power Platform
PROFILE_CITY=Sua Cidade
PROFILE_LINKEDIN=https://linkedin.com/in/seu-perfil
PROFILE_EMAIL=seu@email.com
PROFILE_WHATSAPP=5511999999999
```

### Passo 3: Iniciar o bot

```cmd
npm run dev
```

### Passo 4: Conectar WhatsApp

1. Vai aparecer um **QR Code** no terminal
2. Abra **WhatsApp** no celular
3. **Menu (⋮) → Aparelhos conectados → Conectar um aparelho**
4. **Escaneie o QR Code**
5. ✅ Pronto!

### Passo 5: Testar

De outro celular, envie mensagem "oi" para o número conectado.

O bot deve responder automaticamente! 🤖

---

## 🎯 Usando Scripts .bat (Ainda mais fácil)

### Opção Automática:

1. **Duplo-clique**: `instalar.bat` (instala tudo)
2. **Editar**: `.env` (seus dados)
3. **Duplo-clique**: `iniciar.bat` (inicia bot)
4. **Escanear**: QR Code
5. **Testar**: enviar "oi"

---

## 💬 Como funciona?

### Menu Principal

Quando alguém manda "oi", o bot responde com:

```
1️⃣ 👨‍💻 Sobre meu perfil
2️⃣ ⚙️ Especialidades em Dynamics e Power Platform
3️⃣ 🚀 Oportunidades e projetos
4️⃣ 💬 Falar comigo
5️⃣ ❓ Outros assuntos
```

### Reconhecimento Inteligente

O bot reconhece palavras-chave:

- **"dynamics"** → Mostra especialidades
- **"projeto"** → Fala sobre oportunidades
- **"vaga"** → Fala sobre oportunidades
- **"conversar"** → Abre contato direto

---

## 🔧 Comandos Úteis

### Parar o bot
Pressione `Ctrl + C` no terminal

### Reiniciar
```cmd
npm run dev
```

### Trocar número WhatsApp
```cmd
rmdir /s /q auth_info_baileys
npm run dev
```
(Vai gerar novo QR Code)

---

## ❓ Problemas Comuns

**QR Code não aparece**
→ Verifique se instalou dependências: `npm install`

**Bot não responde**
→ Confirme "connected to WA" no terminal

**PowerShell bloqueado**
→ Use CMD em vez de PowerShell

**Erro no .env**
→ Verifique se preencheu todos os campos obrigatórios

---

## 📞 Estrutura do Projeto

```
whatsapp-bot-perfil-profissional/
├── src/           # Código-fonte
├── .env           # Configuração (EDITAR AQUI)
├── instalar.bat   # Instalador automático  
├── iniciar.bat    # Iniciar bot
└── README.md      # Documentação completa
```

---

## ✅ Checklist

- [ ] Node.js 18+ instalado
- [ ] `npm install` executado
- [ ] `.env` configurado com seus dados
- [ ] Bot iniciado (`npm run dev`)
- [ ] QR Code escaneado
- [ ] Bot conectado ("connected to WA")
- [ ] Teste realizado (enviar "oi")

---

**🎉 Pronto! Seu perfil profissional agora está no WhatsApp de forma automatizada e elegante!**

Para mais detalhes, consulte: [README.md](README.md)

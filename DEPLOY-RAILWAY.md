# 🚀 Deploy no Railway - Guia Completo

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no Railway (https://railway.app)
- Git instalado

---

## 🔧 PASSO 1: Preparar o Projeto

### 1.1 Inicializar Git (se ainda não fez)

```powershell
git init
git add .
git commit -m "Initial commit - WhatsApp Bot"
```

### 1.2 Criar repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `whatsapp-bot-perfil-profissional`
3. Deixe **Private** (recomendado)
4. Criar repositório

### 1.3 Fazer push para o GitHub

```powershell
git remote add origin https://github.com/SEU-USUARIO/whatsapp-bot-perfil-profissional.git
git branch -M main
git push -u origin main
```

---

## 🚂 PASSO 2: Deploy no Railway

### 2.1 Criar conta e projeto

1. Acesse: https://railway.app
2. Clique em **"Start a New Project"**
3. Escolha **"Deploy from GitHub repo"**
4. Autorize Railway a acessar seu GitHub
5. Selecione o repositório: `whatsapp-bot-perfil-profissional`

### 2.2 Configurar variáveis de ambiente

No Railway, vá em **Variables** e adicione:

```env
PORT=3000
NODE_ENV=production
PROFILE_NAME=Jonathas Severino
PROFILE_TITLE=Desenvolvedor Sênior - Dynamics 365 & Power Platform
PROFILE_CITY=Sua Cidade
PROFILE_LINKEDIN=https://linkedin.com/in/seu-perfil
PROFILE_EMAIL=seu@email.com
PROFILE_WHATSAPP=+5511999999999
```

### 2.3 Deploy automático

- Railway vai detectar o Dockerfile
- Build automático começará
- Aguarde 2-5 minutos

---

## 📱 PASSO 3: Conectar WhatsApp

### ⚠️ IMPORTANTE: QR Code

**PROBLEMA**: No Railway, você NÃO verá o QR Code no terminal!

**SOLUÇÃO**: 2 opções:

#### Opção A: Conectar localmente primeiro (RECOMENDADO)

1. **Rode o bot LOCALMENTE até conectar:**
   ```powershell
   npm run dev
   ```

2. **Escaneie o QR Code e espere conectar**

3. **Copie a pasta de autenticação para o Railway:**
   - A pasta `auth_info_baileys` contém a sessão
   - Você precisa fazer commit desta pasta:

   ```powershell
   # Temporariamente remover do .gitignore
   # Edite .gitignore e comente a linha:
   # auth_info_baileys
   
   git add auth_info_baileys
   git commit -m "Add WhatsApp session"
   git push
   ```

4. **Railway vai fazer redeploy automaticamente**

5. **IMPORTANTE**: Depois do deploy, **adicione auth_info_baileys de volta ao .gitignore**

#### Opção B: Usar Railway CLI para ver logs

```powershell
# Instalar Railway CLI
npm install -g @railway/cli

# Fazer login
railway login

# Ver logs em tempo real (incluindo QR Code)
railway logs
```

---

## ✅ PASSO 4: Verificar Status

### No Railway Dashboard:

1. **Deployments** → Deve estar verde ✅
2. **Logs** → Ver se bot conectou: "WhatsApp conectado com sucesso!"
3. **Metrics** → CPU/RAM usage

### Testar o bot:

1. Mande mensagem no WhatsApp
2. Pessoa responde
3. Bot deve enviar boas-vindas

---

## 💰 Custos Estimados

- **Trial**: $5 grátis/mês
- **Hobby**: ~$5-7/mês (suficiente para 1 bot)
- Cobrado por uso (RAM + CPU)

---

## 🔄 Atualizações Futuras

Sempre que modificar o código:

```powershell
git add .
git commit -m "Descrição da mudança"
git push
```

Railway faz **deploy automático**! 🎉

---

## 🐛 Troubleshooting

### Bot não conecta no Railway

- Certifique-se que `auth_info_baileys` foi enviada
- Verifique logs: `railway logs`
- Se sessão expirou, reconecte localmente e faça push de novo

### Bot está "dormindo"

- Railway free tier pode ter limitações
- Upgrade para Hobby plan ($5/mês) garante 24/7

### Erro de build

- Verifique que Node.js 18 está configurado
- Veja logs de build no Railway Dashboard

---

## 📞 Suporte

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

---

✅ **Bot rodando 24/7 na nuvem!** 🚀

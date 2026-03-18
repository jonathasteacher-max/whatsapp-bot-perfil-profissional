# 🕐 Sistema de Cooldown - 1 Resposta por Dia

## 🎯 Objetivo

Evitar que o bot seja **massivo/repetitivo** respondendo várias vezes no mesmo dia para o mesmo contato.

---

## 📋 Como Funciona

### ✅ **Primeira Interação do Dia**
1. Usuário envia "oi" (ou qualquer mensagem)
2. Bot responde normalmente com boas-vindas e menu
3. Interação é registrada com a data de hoje

### ❌ **Tentativas Subsequentes no Mesmo Dia**
1. Mesmo usuário envia outra mensagem
2. Bot **ignora silenciosamente** (não responde)
3. Nos logs aparece: `"Ignorando mensagem devido ao cooldown"`

### ✅ **Novo Dia**
1. No dia seguinte, o usuário pode enviar mensagem novamente
2. Bot responde normalmente
3. Cooldown é reiniciado por mais 24h

---

## 📁 Arquivo de Controle

O arquivo `contacts-cooldown.json` armazena os contatos e a última data de interação:

```json
{
  "5511999999999@s.whatsapp.net": "2026-03-17",
  "5511888888888@s.whatsapp.net": "2026-03-17"
}
```

- **Chave**: ID do contato no WhatsApp
- **Valor**: Data da última resposta (formato YYYY-MM-DD)

---

## 🔧 Gerenciamento

### Ver Cooldowns Ativos
```cmd
gerenciar-cooldown.bat
```

### Limpar Todos os Cooldowns
Permite que todos os contatos recebam resposta novamente:
```cmd
gerenciar-cooldown.bat
→ Opção 2
```

### Limpar Cooldown de 1 Contato Específico
Edite manualmente o arquivo `contacts-cooldown.json` e remova a linha do contato.

---

## 🧹 Limpeza Automática

O sistema **limpa automaticamente** registros com mais de **7 dias** a cada 24 horas para não acumular dados infinitamente.

---

## 🧪 Exemplo de Uso

### Dia 1 (17/03/2026):
```
Cliente: oi
Bot: Olá, João! 👋 [responde normalmente]

[5 minutos depois]
Cliente: oi de novo
Bot: [ignora, não responde]

[1 hora depois]
Cliente: menu
Bot: [ignora, não responde]
```

### Dia 2 (18/03/2026):
```
Cliente: oi
Bot: Olá, João! 👋 [responde normalmente de novo]
```

---

## 📊 Logs

No terminal, você verá mensagens como:

**Primeira interação:**
```
INFO: Primeiro contato do usuário { contactId: '5511999999999@s.whatsapp.net' }
INFO: Interação registrada { contactId: '5511999999999@s.whatsapp.net', date: '2026-03-17' }
```

**Tentativas no mesmo dia:**
```
INFO: Cooldown ativo, ignorando mensagem { contactId: '5511999999999@s.whatsapp.net', lastInteraction: '2026-03-17' }
```

**Novo dia:**
```
INFO: Cooldown expirado, pode responder novamente { contactId: '5511999999999@s.whatsapp.net', lastInteraction: '2026-03-17', today: '2026-03-18' }
```

---

## ⚙️ Personalização

Se quiser mudar o tempo de cooldown, edite `src/services/CooldownService.ts`:

### Mudar para 12 horas:
```typescript
private getTodayDate(): string {
  const now = new Date();
  const hours = Math.floor(now.getTime() / (12 * 60 * 60 * 1000));
  return `${now.toISOString().split('T')[0]}-${hours}`;
}
```

### Mudar para 1 hora:
```typescript
private getTodayDate(): string {
  const now = new Date();
  const hours = now.getHours();
  return `${now.toISOString().split('T')[0]}-${hours}`;
}
```

---

## 🎯 Benefícios

✅ **Não é massivo** - Cada pessoa recebe apenas 1 resposta por dia  
✅ **Profissional** - Evita parecer spam  
✅ **Respeitoso** - Não enche a caixa de mensagens  
✅ **Eficiente** - Reduz processamento desnecessário  
✅ **Automático** - Limpa dados antigos sozinho  

---

## 🔄 Desabilitar Cooldown

Se quiser **desabilitar completamente** o sistema de cooldown:

1. Edite `src/services/BotService.ts`
2. Comente as linhas:
```typescript
// if (!this.cooldownService.canRespond(from)) {
//   logger.info('Ignorando mensagem devido ao cooldown', { from });
//   return;
// }
```

3. E:
```typescript
// this.cooldownService.registerInteraction(from);
```

Reinicie o bot e ele vai responder sempre.

---

**Criado em**: Março de 2026  
**Autor**: Jonathas Severino  
**Versão**: 1.0

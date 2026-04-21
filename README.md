# Gov.br Login Page

Página de autenticação inspirada no portal gov.br do governo brasileiro.

## 🚀 Como executar localmente

### Pré-requisitos
- Node.js 16 ou superior
- pnpm (gerenciador de pacotes)

### Instalação

```bash
# Instalar pnpm (se ainda não tiver)
npm install -g pnpm

# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

## 📦 Deploy no GitHub Pages

### Configuração Inicial

**IMPORTANTE:** Antes de fazer o deploy, edite o arquivo `vite.config.ts` e altere a linha:

```typescript
base: '/your-repo-name/',
```

Substitua `your-repo-name` pelo nome real do seu repositório no GitHub.

### Deploy Automático (Recomendado)

O projeto já está configurado com GitHub Actions. Quando você fizer push para a branch `main`, o deploy será automático.

**Passos:**

1. Faça push do código para o GitHub
2. Vá em **Settings** > **Pages** no seu repositório
3. Em **Source**, selecione **GitHub Actions**
4. O deploy será feito automaticamente a cada push

Seu site estará disponível em: `https://seu-usuario.github.io/nome-do-repositorio/`

### Deploy Manual (Alternativo)

```bash
# Instalar gh-pages
pnpm add -D gh-pages

# Fazer deploy
pnpm deploy
```

## 🛠️ Tecnologias

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Lucide React (ícones)

## 📝 Estrutura do Projeto

```
├── src/
│   ├── app/
│   │   ├── App.tsx              # Componente principal
│   │   └── components/          # Componentes React
│   ├── styles/                  # Estilos CSS
│   └── imports/                 # Assets e imagens
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions config
└── vite.config.ts               # Configuração do Vite
```

## 📄 Licença

Este projeto é apenas para fins educacionais e demonstrativos.

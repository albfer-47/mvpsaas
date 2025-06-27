# Instruções de Deploy para PDF Market Intelligence

Este documento fornece instruções detalhadas para implantar o aplicativo PDF Market Intelligence em plataformas que oferecem suporte nativo para Single Page Applications (SPAs) React.

## Opção 1: Deploy no Vercel (Recomendado)

O Vercel oferece suporte nativo para aplicativos React e configura automaticamente o redirecionamento de rotas para SPAs.

### Pré-requisitos
- Uma conta no [Vercel](https://vercel.com)
- Git instalado em sua máquina

### Passos para Deploy

1. **Prepare o repositório**
   ```bash
   cd pdf-market-intelligence-enhanced
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Conecte ao Vercel**
   - Acesse [vercel.com](https://vercel.com) e faça login
   - Clique em "New Project"
   - Importe seu repositório Git ou faça upload do diretório

3. **Configure o projeto**
   - Framework Preset: selecione "React"
   - Build Command: `npm run build` ou `pnpm run build`
   - Output Directory: `dist`
   - Clique em "Deploy"

4. **Acesse seu site**
   - Após o deploy, o Vercel fornecerá uma URL (exemplo: `https://pdf-market-intelligence.vercel.app`)
   - Todas as rotas internas funcionarão automaticamente

## Opção 2: Deploy no Netlify

O Netlify também oferece excelente suporte para SPAs React.

### Pré-requisitos
- Uma conta no [Netlify](https://netlify.com)

### Passos para Deploy

1. **Prepare o arquivo de configuração**
   Crie um arquivo `netlify.toml` na raiz do projeto:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via interface do Netlify**
   - Acesse [netlify.com](https://netlify.com) e faça login
   - Arraste e solte a pasta `dist` na área de upload do Netlify
   - Ou conecte seu repositório Git para deploy contínuo

3. **Configure o projeto (para deploy contínuo)**
   - Build Command: `npm run build` ou `pnpm run build`
   - Publish Directory: `dist`

4. **Acesse seu site**
   - O Netlify fornecerá uma URL (exemplo: `https://pdf-market-intelligence.netlify.app`)

## Opção 3: Deploy Local para Testes

Para testar localmente antes de publicar:

1. **Instale um servidor local**
   ```bash
   npm install -g serve
   ```

2. **Execute o servidor**
   ```bash
   serve -s dist
   ```

3. **Acesse o site**
   - Abra `http://localhost:3000` no navegador

## Configuração do Firebase (para autenticação)

Após o deploy, você precisará configurar o Firebase para autenticação:

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Adicione um aplicativo web ao projeto
4. Copie as credenciais de configuração
5. Substitua as credenciais no arquivo `src/context/AuthContext.tsx`
6. Ative os métodos de autenticação desejados no console do Firebase

## Configuração do Stripe (para assinaturas)

Para habilitar pagamentos:

1. Crie uma conta no [Stripe](https://stripe.com)
2. Obtenha suas chaves de API (publicável e secreta)
3. Configure os produtos e preços no dashboard do Stripe
4. Atualize as chaves no arquivo de configuração do Stripe

## Suporte

Se precisar de assistência adicional com o deploy, entre em contato para obter suporte personalizado.

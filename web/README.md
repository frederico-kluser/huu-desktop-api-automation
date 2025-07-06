# Interface Web da API NutJS

Esta é a interface web da API de Automação Desktop NutJS, criada com React e TypeScript.

## 📁 Estrutura do Projeto Web

```
web/
├── src/
│   ├── components/          # Componentes React
│   │   └── Header.tsx      # Componente do cabeçalho
│   ├── styles/             # Arquivos de estilo
│   │   ├── index.css       # Estilos globais
│   │   └── App.css         # Estilos do componente App
│   ├── App.tsx             # Componente principal
│   └── index.tsx           # Ponto de entrada
├── public/
│   └── index.html          # Template HTML
├── dist/                   # Arquivos compilados
├── tsconfig.json          # Configuração do TypeScript
└── webpack.config.cjs     # Configuração do Webpack
```

## 🚀 Como Executar

### Desenvolvimento
```bash
# Inicia tanto a API quanto o servidor de desenvolvimento web
npm run dev

# Somente a API na porta 3000
# Somente o servidor web na porta 3001
```

### Produção
```bash
# Constrói o projeto completo
npm run build

# Inicia o servidor (serve tanto a API quanto a web)
npm start

# Acesse http://localhost:3000
```

## 🎨 Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Bootstrap 5** - Framework CSS
- **React Bootstrap** - Componentes Bootstrap para React
- **Webpack 5** - Bundler
- **Font Awesome** - Ícones

## 🔧 Funcionalidades

- **Hello World** - Página inicial com informações da API
- **Status da API** - Botão para verificar o health check
- **Design Responsivo** - Interface adaptável a diferentes tamanhos de tela
- **Integração com API** - Pronto para consumir endpoints da API NutJS

## 🌐 Endpoints Disponíveis

A interface web é servida automaticamente pelo servidor Fastify nos seguintes endpoints:

- `GET /` - Página inicial (index.html)
- `GET /bundle.js` - JavaScript compilado
- `GET /api/health` - Health check da API
- `GET /api/v1/*` - Endpoints da API NutJS

## 📝 Próximos Passos

Esta é uma implementação básica. Você pode expandir com:

- Páginas para testar os endpoints da API
- Formulários para enviar comandos de automação
- Dashboard em tempo real
- Documentação interativa da API
- Testes das funcionalidades do mouse/teclado

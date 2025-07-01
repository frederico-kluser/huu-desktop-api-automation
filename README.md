# NutJS REST API

API REST wrapper para o NutJS, oferecendo automação desktop através de endpoints HTTP.

## Arquitetura

O projeto segue Clean Architecture com as seguintes camadas:

- **Domain**: Entidades e casos de uso
- **Application**: Serviços e DTOs
- **Infrastructure**: Adaptadores NutJS e providers
- **Interface**: Controllers e middleware

## Instalação

```bash
npm install
```

## Configuração

1. Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente conforme necessário.

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Produção

```bash
npm start
```

## Endpoints

### Mouse

- `POST /api/v1/mouse/move` - Move o cursor
- `POST /api/v1/mouse/click` - Clica com o mouse
- `POST /api/v1/mouse/drag` - Arrasta de um ponto a outro
- `POST /api/v1/mouse/scroll` - Rola a tela
- `GET /api/v1/mouse/position` - Obtém posição atual do cursor

### Screen

- `POST /api/v1/screen/find` - Busca template na tela
- `POST /api/v1/screen/capture` - Captura screenshot

### Health Check

- `GET /health` - Verifica status da API

## Exemplos

### Mover mouse
```bash
curl -X POST http://localhost:3000/api/v1/mouse/move \
  -H "Content-Type: application/json" \
  -d '{"x": 100, "y": 200, "smooth": true}'
```

### Clicar
```bash
curl -X POST http://localhost:3000/api/v1/mouse/click \
  -H "Content-Type: application/json" \
  -d '{"button": "left"}'
```

## Permissões

### macOS
System Preferences > Security & Privacy > Privacy > Accessibility - adicione o terminal ou aplicação

### Linux
Certifique-se que a variável DISPLAY está configurada:
```bash
export DISPLAY=:0
```

### Windows
Geralmente funciona sem configuração adicional

## Stack

- TypeScript
- Fastify
- NutJS
- TSyringe
- Zod
- Clean Architecture
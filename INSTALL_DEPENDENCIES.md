# Dependências Adicionais Opcionais

Estas dependências foram mencionadas no roadmap mas são opcionais para o funcionamento básico:

## Para Otimizações de Performance (Opcional)

```bash
# Cache LRU para templates
npm install lru-cache

# Pool de recursos
npm install generic-pool

# Cross-platform scripts
npm install --save-dev cross-env
```

## Nota sobre @nut-tree/nl-matcher

O provider `@nut-tree/nl-matcher` mencionado no roadmap não está disponível publicamente no npm. Este é um provider premium que requer assinatura do nutjs.dev.

O projeto funciona sem ele, mas se você tiver acesso ao registry privado, pode instalar com:

```bash
# Configurar registry privado (se tiver acesso)
echo "@nut-tree:registry=https://nutjs.dev/" >> .npmrc

# Fazer login no registry
npm login --registry=https://nutjs.dev/

# Instalar o provider
npm install @nut-tree/nl-matcher
```

## Verificação das Dependências Atuais

Execute os seguintes comandos para verificar se tudo está correto:

```bash
# Verificar se há vulnerabilidades
npm audit

# Atualizar dependências menores
npm update

# Verificar tipos TypeScript
npm run typecheck

# Verificar linting
npm run lint

# Verificar formatação
npm run format:check
```
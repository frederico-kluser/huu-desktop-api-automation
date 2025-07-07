#!/bin/bash

# Script para instalar dependências necessárias para o ActionBuilder

echo "Instalando dependências para o ActionBuilder..."

# Dependências de produção
npm install --save nanoid react-bootstrap-icons

# Tipos TypeScript (se necessário)
npm install --save-dev @types/nanoid

echo "Dependências instaladas com sucesso!"
echo ""
echo "Pacotes adicionados:"
echo "- nanoid: Para gerar IDs únicos para as ações"
echo "- react-bootstrap-icons: Para ícones na interface"
echo ""
echo "Execute 'npm start' para iniciar o servidor de desenvolvimento"
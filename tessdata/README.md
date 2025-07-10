# Tesseract Language Data Files

Este diretório contém os arquivos de dados de linguagem para o Tesseract OCR.

## Arquivos Necessários

Para o funcionamento do OCR, você precisa baixar os arquivos de linguagem:

- `eng.traineddata.gz` - Inglês (~4.9 MB)
- `por.traineddata.gz` - Português (~4.2 MB)

## Como Baixar

### Opção 1: Download Manual

Baixe os arquivos diretamente dos links:

- Inglês: https://cdn.jsdelivr.net/npm/@tesseract.js-data/eng@1.0.0/4.0.0_best_int/eng.traineddata.gz
- Português: https://cdn.jsdelivr.net/npm/@tesseract.js-data/por@1.0.0/4.0.0_best_int/por.traineddata.gz

### Opção 2: Script de Download

Execute o script de download:

```bash
# No diretório raiz do projeto
npm run download-tessdata
```

### Opção 3: Download Automático

O sistema baixará automaticamente os arquivos na primeira execução do OCR.

## Adicionar Novas Linguagens

Para adicionar suporte a outras linguagens:

1. Baixe o arquivo `.traineddata.gz` correspondente
2. Coloque-o neste diretório
3. Atualize a variável de ambiente `OCR_LANGUAGES` para incluir o código da linguagem

Códigos de linguagem disponíveis:
- `spa` - Espanhol
- `fra` - Francês
- `deu` - Alemão
- `ita` - Italiano
- `jpn` - Japonês
- `chi_sim` - Chinês Simplificado

## Estrutura Esperada

```
tessdata/
├── README.md
├── eng.traineddata.gz
└── por.traineddata.gz
```

## Observações

- Os arquivos devem estar no formato `.traineddata.gz` (comprimidos)
- O Tesseract.js descomprimirá automaticamente os arquivos quando necessário
- O cache dos arquivos descomprimidos é mantido em um diretório temporário do sistema
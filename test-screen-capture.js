#!/usr/bin/env node

/**
 * 🧪 Script de teste para captura de tela e validação
 *
 * Este script:
 * 1. 📸 Faz uma requisição para a API de captura de tela
 * 2. 🔍 Decodifica o base64 retornado
 * 3. 💾 Salva como arquivo PNG
 * 4. ✅ Valida o arquivo resultante
 */

import { writeFileSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

// 📡 Função para fazer a requisição
async function captureScreen() {
  console.log('📸 Iniciando captura de tela...');

  try {
    const response = await fetch('http://localhost:3000/api/v1/screen/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`❌ Erro na API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Resposta da API recebida');
    console.log('📊 Propriedades da resposta:', Object.keys(data));

    if (!data.success) {
      throw new Error('❌ API retornou success: false');
    }

    if (!data.data || !data.data.image) {
      throw new Error('❌ Campo image não encontrado na resposta');
    }

    console.log('🎯 Campo image encontrado!');
    console.log('📏 Tamanho do base64:', data.data.image.length, 'caracteres');

    return data.data.image;
  } catch (error) {
    console.error('❌ Erro na captura:', error.message);
    throw error;
  }
}

// 🔍 Função para decodificar e salvar
function decodeAndSave(base64Image, outputPath) {
  console.log('🔍 Decodificando base64...');

  try {
    // Verificar se é um data URL válido
    if (!base64Image.startsWith('data:image/')) {
      throw new Error('❌ Não é um data URL válido');
    }

    // Extrair apenas a parte base64
    const base64Data = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
    console.log('📏 Tamanho dos dados base64:', base64Data.length, 'caracteres');

    // Decodificar
    const buffer = Buffer.from(base64Data, 'base64');
    console.log('📦 Buffer criado com', buffer.length, 'bytes');

    // Salvar arquivo
    writeFileSync(outputPath, buffer);
    console.log('💾 Arquivo salvo em:', outputPath);

    return buffer;
  } catch (error) {
    console.error('❌ Erro na decodificação:', error.message);
    throw error;
  }
}

// ✅ Função para validar o arquivo
function validatePNG(filePath) {
  console.log('✅ Validando arquivo PNG...');

  try {
    const stats = statSync(filePath);
    console.log('📊 Tamanho do arquivo:', stats.size, 'bytes');

    if (stats.size === 0) {
      throw new Error('❌ Arquivo está vazio');
    }

    if (stats.size < 100) {
      throw new Error('❌ Arquivo muito pequeno para ser um PNG válido');
    }

    // Verificar header PNG
    const buffer = readFileSync(filePath);
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    if (!buffer.subarray(0, 8).equals(pngSignature)) {
      console.log('🔍 Primeiros 16 bytes:', buffer.subarray(0, 16).toString('hex'));
      throw new Error('❌ Arquivo não possui header PNG válido');
    }

    console.log('🎉 PNG válido confirmado!');
    console.log('📈 Informações do arquivo:');
    console.log('  - Tamanho:', stats.size, 'bytes');
    console.log('  - Data de criação:', stats.birthtime);
    console.log('  - Signature PNG:', '✅ Válida');

    return true;
  } catch (error) {
    console.error('❌ Erro na validação:', error.message);
    throw error;
  }
}

// 🚀 Função principal
async function main() {
  const outputPath = join(process.cwd(), 'screenshot_test.png');

  console.log('🔬 === TESTE DE CAPTURA DE TELA ===');
  console.log('📁 Arquivo de saída:', outputPath);
  console.log('');

  try {
    // 1. Capturar tela via API
    const base64Image = await captureScreen();

    // 2. Decodificar e salvar
    const buffer = decodeAndSave(base64Image, outputPath);

    // 3. Validar arquivo
    validatePNG(outputPath);

    console.log('');
    console.log('🎉 === TESTE CONCLUÍDO COM SUCESSO ===');
    console.log('✅ Imagem capturada e salva com sucesso');
    console.log('📄 Arquivo:', outputPath);
  } catch (error) {
    console.log('');
    console.log('💥 === TESTE FALHADO ===');
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar
main().catch(console.error);

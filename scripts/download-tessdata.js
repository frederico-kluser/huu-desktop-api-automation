#!/usr/bin/env node

/**
 * Script para download dos arquivos de linguagem do Tesseract
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TESSDATA_DIR = path.join(__dirname, '..', 'tessdata');

// URLs dos arquivos de linguagem
const LANGUAGE_FILES = {
  eng: 'https://cdn.jsdelivr.net/npm/@tesseract.js-data/eng@1.0.0/4.0.0_best_int/eng.traineddata.gz',
  por: 'https://cdn.jsdelivr.net/npm/@tesseract.js-data/por@1.0.0/4.0.0_best_int/por.traineddata.gz',
};

// Garantir que o diretório existe
if (!fs.existsSync(TESSDATA_DIR)) {
  fs.mkdirSync(TESSDATA_DIR, { recursive: true });
}

/**
 * Baixa um arquivo
 * @param {string} url URL do arquivo
 * @param {string} destPath Caminho de destino
 * @returns {Promise<void>}
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    console.log(`Baixando ${path.basename(destPath)}...`);

    const file = fs.createWriteStream(destPath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Falha ao baixar: HTTP ${response.statusCode}`));
          return;
        }

        const totalBytes = parseInt(response.headers['content-length'], 10);
        let downloadedBytes = 0;

        response.on('data', (chunk) => {
          downloadedBytes += chunk.length;
          const progress = ((downloadedBytes / totalBytes) * 100).toFixed(1);
          process.stdout.write(`\r${path.basename(destPath)}: ${progress}%`);
        });

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(` ✓`);
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(destPath, () => {}); // Remover arquivo parcial
        reject(err);
      });

    file.on('error', (err) => {
      fs.unlink(destPath, () => {}); // Remover arquivo parcial
      reject(err);
    });
  });
}

/**
 * Baixa todos os arquivos de linguagem
 */
async function downloadAllLanguages() {
  console.log('Baixando arquivos de linguagem do Tesseract...\n');

  for (const [lang, url] of Object.entries(LANGUAGE_FILES)) {
    const destPath = path.join(TESSDATA_DIR, `${lang}.traineddata.gz`);

    // Verificar se já existe
    if (fs.existsSync(destPath)) {
      console.log(`${lang}.traineddata.gz já existe, pulando...`);
      continue;
    }

    try {
      await downloadFile(url, destPath);
    } catch (error) {
      console.error(`\nErro ao baixar ${lang}:`, error.message);
      process.exit(1);
    }
  }

  console.log('\n✓ Download concluído!');
  console.log(`Arquivos salvos em: ${TESSDATA_DIR}`);
}

// Executar
downloadAllLanguages().catch((error) => {
  console.error('Erro:', error);
  process.exit(1);
});

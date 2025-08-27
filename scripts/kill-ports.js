#!/usr/bin/env node

import { exec } from 'child_process';
import os from 'os';

const ports = [3000, 3001];

function killPort(port) {
  return new Promise((resolve) => {
    const platform = os.platform();
    let command;

    if (platform === 'win32') {
      command = `netstat -ano | findstr :${port} | findstr LISTENING`;
    } else {
      command = `lsof -ti:${port}`;
    }

    exec(command, (error, stdout) => {
      if (error || !stdout) {
        console.log(`Porta ${port}: Nenhum processo encontrado`);
        resolve();
        return;
      }

      const pid = platform === 'win32' 
        ? stdout.trim().split(/\s+/).pop()
        : stdout.trim();

      if (pid) {
        const killCommand = platform === 'win32' 
          ? `taskkill /PID ${pid} /F`
          : `kill -9 ${pid}`;

        exec(killCommand, (killError) => {
          if (killError) {
            console.error(`Erro ao matar processo na porta ${port}:`, killError.message);
          } else {
            console.log(`Porta ${port}: Processo ${pid} finalizado`);
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

async function killAllPorts() {
  console.log('Limpando portas 3000 e 3001...');
  
  for (const port of ports) {
    await killPort(port);
  }
  
  console.log('Portas liberadas!');
}

killAllPorts().catch(console.error);
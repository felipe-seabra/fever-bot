const fs = require('fs-extra');

// Copia todos os arquivos do diretório src para o diretório dist
fs.copy('./src', './dist', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Build concluído!');
  }
});

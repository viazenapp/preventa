const fs = require('fs');
const path = require('path');

const FUTURISTIC_BG = `bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900`;

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (file.endsWith('.tsx')) {
      callback(fullPath);
    }
  });
}

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  const original = content;

  // Reemplazar fondos genéricos por fondo futurista
  content = content.replace(/bg-(slate|gray|zinc|neutral|white|black)-[0-9]+/g, '');
  content = content.replace(/from-(.*?)(\s|")/g, '');
  content = content.replace(/to-(.*?)(\s|")/g, '');
  content = content.replace(/bg-gradient-to-[^\s"]+/g, '');

  // Insertar fondo futurista si no está
  if (!content.includes(FUTURISTIC_BG)) {
    content = content.replace(
      /className="([^"]*)"/g,
      (match, className) => {
        if (!className.includes('min-h-screen')) return match;
        return `className="${FUTURISTIC_BG} ${className.trim()}"`
      }
    );
  }

  // Guardar solo si hay cambios
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Estilo futurista aplicado en: ${filePath}`);
  }
}

walk('./src', updateFile);

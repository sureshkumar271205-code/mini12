const fs = require('fs');
const path = require('path');

const componentsPath = 'z:/ai-resume-builder (2)/ai-resume-builder/ai-resume-builder/frontend/src/components';
const srcPath = 'z:/ai-resume-builder (2)/ai-resume-builder/ai-resume-builder/frontend/src';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
        if (file !== 'node_modules') processDir(filePath);
    } else if (file.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/tranzinc-/g, 'translate-');
      content = content.replace(/slate-950/g, 'bg-color'); // Using CSS variable
      content = content.replace(/bg-slate-950/g, 'bg-zinc-950'); // Or just more neutral
      content = content.replace(/text-slate-50/g, 'text-zinc-50');
      content = content.replace(/bg-blue-500/g, 'bg-rose-500');
      fs.writeFileSync(filePath, content);
    }
  });
}

processDir(srcPath);
console.log('Typos fixed and colors updated!');

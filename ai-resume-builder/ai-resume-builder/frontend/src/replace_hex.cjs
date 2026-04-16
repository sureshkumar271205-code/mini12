const fs = require('fs');
const path = require('path');

const p = 'z:/ai-resume-builder (2)/ai-resume-builder/ai-resume-builder/frontend/src/components';
const files = fs.readdirSync(p).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(p, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/#3b82f6/g, 'var(--accent-primary)');
  content = content.replace(/#334155/g, 'rgba(255, 255, 255, 0.1)');
  fs.writeFileSync(filePath, content);
});
console.log('Hex colors replaced successfully!');

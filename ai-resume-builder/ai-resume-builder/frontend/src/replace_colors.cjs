const fs = require('fs');
const path = require('path');

const p = 'z:/ai-resume-builder (2)/ai-resume-builder/ai-resume-builder/frontend/src/components';
const files = fs.readdirSync(p).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(p, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/slate-/g, 'zinc-');
  content = content.replace(/blue-/g, 'pink-');
  content = content.replace(/indigo-/g, 'rose-');
  fs.writeFileSync(filePath, content);
});
console.log('Colors replaced successfully!');

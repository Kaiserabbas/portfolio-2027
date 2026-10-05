const fs = require('fs');

// Patch certifications.js
let c = fs.readFileSync('src/data/certifications.js', 'utf8');
// Rename export to static and add import + merged export
c = c.replace('export const certifications = [', 
  "import adminAdditions from './admin-additions.json';\n\nconst staticCertifications = [");
c = c.trimEnd() + `\n\n// Merge admin-panel-added certifications\nexport const certifications = [\n  ...staticCertifications,\n  ...(adminAdditions.certifications || []),\n];\n`;
fs.writeFileSync('src/data/certifications.js', c);
console.log('certifications.js patched. Last 150 chars:', JSON.stringify(c.slice(-150)));

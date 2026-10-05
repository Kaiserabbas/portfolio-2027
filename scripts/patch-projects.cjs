const fs = require('fs');
let c = fs.readFileSync('src/data/projects.js', 'utf8');

const suffix = `\n// Merge admin-panel-added projects (from admin-additions.json committed via GitHub API)\nexport const projects = [\n  ...staticProjects,\n  ...(adminAdditions.projects || []),\n];\n`;

// Remove trailing whitespace/newlines then append
c = c.trimEnd() + '\n' + suffix;

fs.writeFileSync('src/data/projects.js', c);
console.log('Done. Last 200 chars:', JSON.stringify(c.slice(-200)));

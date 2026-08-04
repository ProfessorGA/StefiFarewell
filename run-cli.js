const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Determine which node binary to use
let nodeBin = 'node'; // Default to global node

if (process.platform === 'win32') {
  // If on Windows and local node20.exe exists, use it!
  const localNode = path.join(__dirname, 'node20.exe');
  if (fs.existsSync(localNode)) {
    nodeBin = localNode;
  }
}

// Path to the Angular CLI entrypoint
const cliPath = path.join(__dirname, 'node_modules', '@angular', 'cli', 'bin', 'ng.js');
const args = [cliPath, ...process.argv.slice(2)];

// Execute the command directly (shell: false) to prevent path spacing issues
const result = spawnSync(nodeBin, args, { stdio: 'inherit' });
process.exit(result.status ?? 0);

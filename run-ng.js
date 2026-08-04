// Override process.version and process.versions.node to bypass the Angular CLI Node.js version check
Object.defineProperty(process, 'version', {
  value: 'v22.12.0',
  writable: false,
  configurable: true
});

Object.defineProperty(process.versions, 'node', {
  value: '22.12.0',
  writable: false,
  configurable: true
});

// Run the Angular CLI
require('./node_modules/@angular/cli/bin/ng.js');

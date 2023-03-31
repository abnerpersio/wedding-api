const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  target: 'node16',
  platform: 'node',
  logLevel: 'info',
});

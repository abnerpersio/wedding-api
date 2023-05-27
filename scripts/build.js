const { build } = require('esbuild');
const { copy } = require('esbuild-plugin-copy');

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  format: 'cjs',
  target: 'node16',
  platform: 'node',
  logLevel: 'info',
  plugins: [
    copy({
      assets: [
        {
          from: ['./node_modules/.prisma/**/*'],
          to: ['./.prisma'],
        },
      ],
    }),
  ],
});

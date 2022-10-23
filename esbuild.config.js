const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./build/index.js'],
    outfile: 'prod/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: 'linked',
    metafile: true,
    target: 'es2021',
    legalComments: 'none',
    keepNames: true,
  })
  .catch(() => process.exit(1));

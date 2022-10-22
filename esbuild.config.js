const esbuild = require('esbuild');
const EsBuildDecorators = require('esbuild-plugin-typescript-decorators')

esbuild
  .build({
    entryPoints: ['./build/index.js'],
    outfile: 'bundle/index.js',
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

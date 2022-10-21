const esbuild = require('esbuild');
const EsBuildDecorators = require('esbuild-plugin-typescript-decorators')

esbuild
  .build({
    external: ['pg-native'],
    entryPoints: ['./src/index.ts'],
    outfile: 'build/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: 'linked',
    metafile: true,
    target: 'es2021',
    legalComments:'none',
    keepNames: true,
    tsconfig: 'tsconfig.json',
    plugins: [
      EsBuildDecorators.esbuildDecorators()
    ]
  })
  .catch(() => process.exit(1));

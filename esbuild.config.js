const esbuild = require('esbuild');
const EsBuildDecorators = require('esbuild-plugin-typescript-decorators')

esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: 'build/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: 'linked',
    target: 'es2022',
    keepNames: true,
    tsconfig: 'tsconfig.json',
    plugins: [
      EsBuildDecorators.esbuildDecorators()
    ]
  })
  .catch(() => process.exit(1));

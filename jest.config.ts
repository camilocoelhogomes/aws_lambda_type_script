/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  verbose: true,
  collectCoverage: true,

  coverageDirectory: 'coverage',

  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  setupFiles: ['./src/test/config.ts'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
};

export default config;

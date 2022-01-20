import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const packageJson = require('./package.json');

/** @type {import('rollup').RollupOptions} */
const options = {
  input: 'src/index.ts',
  plugins: [typescript(), resolve(), terser()],
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      compact: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      compact: true,
    },
  ],
};

export default options;

import {Config} from 'bili';

const config: Config = {
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src'],
      },
    },
  },
  input: 'src/index.ts',
  babel: {
    minimal: true,
  },
  output: {
    minify: true,
    sourceMap: false,
    format: 'esm-min',
    fileName: 'index.js',
  },
};

export default config;

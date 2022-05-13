import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default [
  // ES Modules
  {
    input: 'src/index.ts',
    output: {
      file: 'out/time-picker.es.js',
      format: 'es'
    },
    plugins: [typescript({ module: 'esnext' }), babel({ extensions: ['.ts'] })]
  }
];

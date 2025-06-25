import { defineConfig } from 'rolldown';

const entries = {
  'hex': 'src/hex.js',
}

export default defineConfig({
  input: entries,
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].js',
    chunkFileNames: 'chunk-[name].js',
  },
});

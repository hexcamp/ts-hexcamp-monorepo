import { defineConfig } from 'rolldown';

const entries = {
  'hello': 'src/hello.js',
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

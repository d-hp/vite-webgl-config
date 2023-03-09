const isCodeSandbox =
  'SANDBOX-URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default {
  root: 'src/',
  publicDir: '../static/',
  base: './',
  server: {
    host: true,
    open: !isCodeSandbox,
    port: 7777,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
};

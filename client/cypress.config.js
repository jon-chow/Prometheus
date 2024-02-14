import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer:{
      framework: 'react',
      bundler: 'vite',
    }
  },
  e2e: {
    baseUrl: 'http://localhost:4321',
    supportFile: false,
    screenshotOnRunFailure: false
  }
});

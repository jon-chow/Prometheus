import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  },
  e2e: {
    baseUrl: 'http://localhost:4321',
    supportFile: false,
    screenshotOnRunFailure: false
  },
  browsers: [
    {
      name: 'electron',
      channel: 'stable',
      family: 'chromium',
      displayName: 'Electron',
      version: '114.0.5735.289',
      path: '',
      majorVersion: 114
    }
  ]
});

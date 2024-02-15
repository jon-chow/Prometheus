import type { Preview } from '@storybook/react';

import '../src/global.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    },
    
  }
};

export default preview;

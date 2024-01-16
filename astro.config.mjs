import { defineConfig } from 'astro/config';

import qwikdev from '@qwikdev/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [qwikdev(), react()]
});

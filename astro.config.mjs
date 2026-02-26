import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: "/docs/guidelines",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      transformers: [
        {
          pre(node) {
            if (this.options.meta?.__raw?.includes('badcode')) {
              this.addClassToHast(node, 'badcode');
            }
          },
          span(node) {
            const style = node.properties?.style;
            if (typeof style === 'string') {
              node.properties.style = style.replace(/#6A737D/gi, '#d1d5db');
            }
          },
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

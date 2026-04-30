import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guidelines = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guidelines' }),
  schema: z.object({
    title: z.string(),
    sectionId: z.string(),
    order: z.number(),
    subsections: z.array(z.object({
      id: z.string(),
      title: z.string(),
    })).optional(),
  }),
});

export const collections = { guidelines };

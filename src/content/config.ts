import { defineCollection, z } from 'astro:content';

const guidelines = defineCollection({
  type: 'content',
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

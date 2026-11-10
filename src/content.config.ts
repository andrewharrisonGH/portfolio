import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(100),
    draft: z.boolean().default(true),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
    repository: z.url().optional(),
    demonstration: z.url().optional(),
  }),
});

export const collections = { projects };

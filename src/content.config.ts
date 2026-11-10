import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    subtitle: z.string().optional(),
    kind: z.string().default('Project'),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(100),
    draft: z.boolean().default(true),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
    repository: z.url().optional(),
    demonstration: z.url().optional(),
    demo: z.enum(['rotation']).optional(),
    results: z.array(z.object({
      dataset: z.string(),
      baseline: z.number(),
      augmented: z.number(),
    })).optional(),
  }),
});

export const collections = { projects };

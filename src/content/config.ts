import { z, defineCollection } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  release_notes: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      semver: z.string(),
    }),
  }),
};

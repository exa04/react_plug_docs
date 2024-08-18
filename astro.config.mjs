import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "React-Plug",
      logo: {
        light: "./src/assets/logo.svg",
        dark: "./src/assets/logo_dark.svg",
        replacesTitle: true,
      },
      customCss: ["./src/styles/custom.css", "./src/fonts/inter.css"],
      social: {
        github: "https://github.com/exa04/react_plug",
      },
      components: {
        SocialIcons: "./src/components/HeaderLinks.astro",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            { label: "Quick Start", slug: "guides/quick-start" },
            { label: "Getting Started", slug: "guides/getting-started" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      tableOfContents: {
        maxHeadingLevel: 4,
      },
    }),
  ],
});

/** @type { import('@storybook/server-webpack5').StorybookConfig } */
const config = {
  stories: ["../docroot/**/*.mdx", "../docroot/**/*.stories.json"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/server-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [], // Static directory locations for use in Storybook. Eg. using fonts or example pictures in Storybook
 };
 
 export default config;
const config = {
  stories: ["../web/themes/**/*.stories.@(json|yml)", "../web/themes/**/*.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@lullabot/storybook-drupal-addon",
    {
      name: "@storybook/addon-styling",
      options: {
        scssBuildRule: {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "icss",
                },
              },
            },
            {
              loader: "sass-loader",
            },
          ],
        },
      },
    },
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
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    server: {
      // Replace this with your Drupal site URL, or an environment variable.
      url: 'http://<%= storybookUrl %>',
    },
    globals: {
      drupalTheme: '<%= themeName %>',
      supportedDrupalThemes: {
        <%= themeMachineName %>: {title: '<%= themeName %>'}, 
        claro: {title: 'Claro'},
        olivero: {title: 'Olivero'},
      },
    },
  },
};

export default preview;
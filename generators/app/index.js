"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const fs = require("fs");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.env.options.skipInstall = true;
  }

  _storybookInstall() {
    if (fs.existsSync(this.destinationPath(this.props.storybookPath))) {
      this.fs.copyTpl(
        this.templatePath("storybook/_package.json"),
        this.destinationPath(this.props.storybookPath + "/package.json"),
        {
          storybookUrl: this.props.storybookUrl,
        }
      );

      this.fs.copyTpl(
        this.templatePath("storybook/config/main.js"),
        this.destinationPath(this.props.storybookPath + "/.storybook/main.js")
      );

      this.fs.copyTpl(
        this.templatePath("storybook/config/preview.js"),
        this.destinationPath(
          this.props.storybookPath + "/.storybook/preview.js"
        ),
        {
          themeName: this.props.themeName,
          themeMachineName: this.props.themeMachineName,
          storybookUrl: this.props.storybookUrl,
        }
      );
    }
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the badass ${chalk.bgBlack.hex("#bada55")(
          "drupal-theme"
        )} generator!`
      )
    );

    const prompts = [
      {
        name: "themeName",
        message: "Enter your new theme name",
        default: _.startCase(this.appname),
      },
      {
        name: "themeMachineName",
        message: "Enter your theme machine name",
        default(answers) {
          return _.snakeCase(answers.themeName);
        },
      },
      {
        name: "themeDescription",
        message: "Enter your theme description",
        default() {
          return "My awesome theme";
        },
      },
      {
        name: "themePackage",
        message: "Enter your theme package",
        default() {
          return "Custom";
        },
      },
      {
        type: "confirm",
        name: "includeBootstrap",
        message: "Do you want to include Bootstrap?",
        default: false,
      },
      {
        type: "confirm",
        name: "sdc",
        message: "Do you want to include Single Directory Components(SDC)?",
        default: true,
      },
      {
        when(response) {
          return response.sdc;
        },
        type: "confirm",
        name: "storybook",
        message: "Do you want to include Storybook?",
        default: true,
      },
      {
        when(response) {
          return response.storybook;
        },
        type: "input",
        name: "storybookPath",
        message:
          "Enter the root path relative to the current path for Storybook installation",
        default: "../../../../",
      },
      {
        when(response) {
          return response.storybook;
        },
        type: "input",
        name: "storybookUrl",
        message: "Enter the URL for the storybook",
        default: "mysite.lndo.site",
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Copy the theme files.
    this.fs.copyTpl(
      this.templatePath("theme/_theme.info.yml"),
      this.destinationPath(this.props.themeMachineName + ".info.yml"),
      {
        themeName: this.props.themeName,
        themeDescription: this.props.themeDescription,
        themeMachineName: this.props.themeMachineName,
        themePackage: this.props.themePackage,
        includeBootstrap: this.props.includeBootstrap,
      }
    );

    this.fs.copyTpl(
      this.templatePath("theme/_theme.theme"),
      this.destinationPath(this.props.themeMachineName + ".theme"),
      {
        themeName: this.props.themeName,
        themeMachineName: this.props.themeMachineName,
      }
    );

    this.fs.copyTpl(
      this.templatePath("theme/_theme.breakpoints.yml"),
      this.destinationPath(this.props.themeMachineName + ".breakpoints.yml"),
      {
        themeMachineName: this.props.themeMachineName,
      }
    );

    this.fs.copyTpl(
      this.templatePath("theme/_theme.libraries.yml"),
      this.destinationPath(this.props.themeMachineName + ".libraries.yml"),
      {
        includeBootstrap: this.props.includeBootstrap,
        sdc: this.props.sdc,
      }
    );

    this.fs.copyTpl(
      this.templatePath("theme/logo.svg"),
      this.destinationPath("logo.svg")
    );

    this.fs.copyTpl(
      this.templatePath("theme/screenshot.png"),
      this.destinationPath("screenshot.png")
    );

    // Copy the twig files.
    this.fs.copyTpl(
      this.templatePath("theme/_templates/**/*"),
      this.destinationPath("templates"),
      this.props,
      { globOptions: { dot: true } }
    );

    // Copy the JS files
    this.fs.copyTpl(
      this.templatePath("theme/_src/js/**/*"),
      this.destinationPath("src/js"),
      this.props,
      { globOptions: { dot: true } }
    );

    // Copy the SCSS files
    this.fs.copyTpl(
      this.templatePath("theme/_src/scss/**/*"),
      this.destinationPath("src/scss"),
      this.props,
      {},
      {
        globOptions: {
          dot: true,
          ignore: ["**/base/**", "**/base-sdc/**"],
        },
      }
    );

    // Copy Base SCSS files as per options
    if (this.props.sdc) {
      this.fs.copyTpl(
        this.templatePath("theme/_src/scss/base-sdc/**/*"),
        this.destinationPath("src/scss/base"),
        this.props
      );
    } else {
      this.fs.copyTpl(
        this.templatePath("theme/_src/scss/base/**/*"),
        this.destinationPath("src/scss/base"),
        this.props
      );
    }

    // Copy the build files.
    this.fs.copyTpl(
      this.templatePath("theme/editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copyTpl(
      this.templatePath("theme/eslintignore"),
      this.destinationPath(".eslintignore")
    );
    this.fs.copyTpl(
      this.templatePath("theme/eslintrc"),
      this.destinationPath(".eslintrc"),
      {
        sdc: this.props.sdc,
      }
    );
    this.fs.copyTpl(
      this.templatePath("theme/prettierrc.json"),
      this.destinationPath(".prettierrc.json")
    );
    this.fs.copyTpl(
      this.templatePath("theme/stylelintrc.json"),
      this.destinationPath(".stylelintrc.json"),
      {
        sdc: this.props.sdc,
      }
    );
    this.fs.copyTpl(
      this.templatePath("theme/postcss.config.js"),
      this.destinationPath("postcss.config.js")
    );
    this.fs.copyTpl(
      this.templatePath("theme/gitignore"),
      this.destinationPath(".gitignore"),
      {
        sdc: this.props.sdc,
      }
    );
    this.fs.copyTpl(
      this.templatePath("theme/babelrc"),
      this.destinationPath(".babelrc")
    );
    this.fs.copyTpl(
      this.templatePath("theme/_package.json"),
      this.destinationPath("package.json"),
      {
        themeName: _.camelCase(this.props.themeName),
        themeDescription: this.props.themeDescription,
        includeBootstrap: this.props.includeBootstrap,
        sdc: this.props.sdc,
      }
    );

    if (this.props.sdc) {
      const globOptions = { dot: true };
      if (!this.props.storybook) {
        globOptions.ignore = ["**/*.stories.twig"];
      }

      this.fs.copyTpl(
        this.templatePath("theme/_components/**/*"),
        this.destinationPath("components"),
        {
          themeMachineName: this.props.themeMachineName,
        },
        {},
        { globOptions }
      );

      if (this.props.storybook) {
        this._storybookInstall();
      }
    }
  }
};

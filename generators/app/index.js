"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");

module.exports = class extends Generator {
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
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Copy the theme files.
    this.fs.copyTpl(
      this.templatePath("_theme.info.yml"),
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
      this.templatePath("_theme.theme"),
      this.destinationPath(this.props.themeMachineName + ".theme"),
      {
        themeName: this.props.themeName,
        themeMachineName: this.props.themeMachineName,
      }
    );

    this.fs.copyTpl(
      this.templatePath("_theme.breakpoints.yml"),
      this.destinationPath(this.props.themeMachineName + ".breakpoints.yml"),
      {
        themeMachineName: this.props.themeMachineName,
      }
    );

    this.fs.copyTpl(
      this.templatePath("_theme.libraries.yml"),
      this.destinationPath(this.props.themeMachineName + ".libraries.yml"),
      {
        includeBootstrap: this.props.includeBootstrap,
      }
    );

    this.fs.copyTpl(
      this.templatePath("logo.svg"),
      this.destinationPath("logo.svg")
    );

    this.fs.copyTpl(
      this.templatePath("screenshot.png"),
      this.destinationPath("screenshot.png")
    );

    // Copy the twig files.
    this.fs.copyTpl(
      this.templatePath("_templates/**/*"),
      this.destinationPath("templates"),
      this.props,
      { globOptions: { dot: true } }
    );

    // Copy the SASS & JS files
    this.fs.copyTpl(
      this.templatePath("_src/**/*"),
      this.destinationPath("src"),
      this.props,
      { globOptions: { dot: true } }
    );

    // Copy the build files.
    this.fs.copyTpl(
      this.templatePath("editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copyTpl(
      this.templatePath("eslintignore"),
      this.destinationPath(".eslintignore")
    );
    this.fs.copyTpl(
      this.templatePath("eslintrc"),
      this.destinationPath(".eslintrc")
    );
    this.fs.copyTpl(
      this.templatePath("prettierrc.json"),
      this.destinationPath(".prettierrc.json")
    );
    this.fs.copyTpl(
      this.templatePath("stylelintrc.json"),
      this.destinationPath(".stylelintrc.json")
    );
    this.fs.copyTpl(
      this.templatePath("postcss.config.js"),
      this.destinationPath("postcss.config.js")
    );
    this.fs.copyTpl(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copyTpl(
      this.templatePath("babelrc"),
      this.destinationPath(".babelrc")
    );
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        themeName: _.camelCase(this.props.themeName),
        themeDescription: this.props.themeDescription,
        includeBootstrap: this.props.includeBootstrap,
      }
    );
  }

  default() {
    this.env.options.nodePackageManager = "yarn";
  }
};

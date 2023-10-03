#!/usr/bin/env node

const yeoman = require("yeoman-environment");
const env = yeoman.createEnv();

env.register(
  require.resolve("../generators/app/index.js"),
  "drupal-theme-init"
);
env.run("drupal-theme-init");

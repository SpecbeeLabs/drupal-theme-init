"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("drupal-theme-init:app", () => {
  beforeAll(() =>
    helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      themeName: "Drupal",
      themeMachineName: "drupal",
      themeDescription: "Drupal theme",
      themePackage: "Custom",
    })
  );

  it("creates files", () => {
    assert.file([
      "drupal.info.yml",
      "drupal.theme",
      "drupal.breakpoints.yml",
      "drupal.libraries.yml",
      "package.json",
    ]);
  });

  it("creates expected info file", () => {
    assert.fileContent("drupal.info.yml", "name: Drupal");
    assert.fileContent("drupal.info.yml", "description: Drupal theme");
    assert.fileContent("drupal.info.yml", "package: Custom");
    assert.fileContent("drupal.info.yml", "- drupal/global");
    assert.fileContent("drupal.info.yml", "base theme: stable");
  });
});

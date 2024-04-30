# Storybook with SDC!

In the current implementation of storybook with Drupal alongside SDC, there is a limitation of the storybook with respect to the installion. It can only be installed within the root folder of the Drupal installation.

However, there are certain steps independant of the theme generator, which will help in setting up Storybook in its current form and still be accessed.  

## Drupal part

### Requirements

- Drupal 10.1 or above
- Core SDC module is installed

### Steps

Install the [Storybook](https://www.drupal.org/project/storybook) module:
```
composer require 'drupal/storybook:^1.0@beta'
drush pm:enable --yes storybook
```
Setup **development.services.yml** for CORS:
```
parameters:
  # ...
  twig.config:
    debug: true
    cache: false
  # Remember to disable development mode in production!
  storybook.development: true
  cors.config:
    enabled: true
    allowedHeaders: ['*']
    allowedMethods: ['*']
    allowedOrigins: ['*']
    exposedHeaders: false
    maxAge: false
    supportsCredentials: true
services:
  # ...
```
Rebuild the Drupal Cache:

`drush cache:rebuild`
 
## Storybook part

### Requirements
- Node 20 or above

### Steps

After scaffolding storybook related files in the generator, install the required packages for storybook.

- Do a yarn/npm install at the **package.json** path for the storybook.
- Build the storybook with the command available in **package.json**. 
```
npm run storybook
OR
yarn storybook
```
- Storybook will start in http://localhost:6006 or the host mentioned in **package.json**. 
- Create stories as per examples given in Storybook module and run the following command  to generate the stories
```
drush storybook:generate-all-stories
```
- To override already generated stories.json files
```
drush storybook:generate-all-stories --force
```
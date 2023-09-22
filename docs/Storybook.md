# Storybook with SDC!

In the current implementation of storybook with Drupal alongside SDC, there is a limitation of the storybook with respect to the installion. It can only be installed within the root folder of the Drupal installation. Hence, the theme generator will not be able to handle SDC.

However, there are certain steps independant of the theme generator, which will help in setting up Storybook in its current form and still be accessed.  

## Drupal part
Assuming an installation of Drupal 10.1 or later and SDC is enabled with Drupal Theme init, install CL Server module:
```
composer require "drupal/cl_server:^2.0.0@beta"
drush pm:enable --yes cl_server
```
In **settings.local.php**, add the following code:
```
# Disable caches during development. This allows finding new components without clearing caches.
$settings['cache']['bins']['discovery'] = 'cache.backend.null';
# Then disallow exporting config for 'cl_server'. Instructions are at the bottom of the file.
$settings['config_exclude_modules'] = ['devel', 'stage_file_proxy', 'cl_server'];
```
Setup **development.services.yml** for CORS:
```
parameters:
  # ...
  twig.config:
    debug: true
    cache: false
  cors.config:
    enabled: true
    allowedHeaders: ['*']
    allowedMethods: []
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

After scaffolding storybook related files in the generator, install the required packages for storybook.

- Do a yarn/npm install at the **package.json** path for the storybook.
- Build the storybook with the command available in **package.json**. 
```
npm run storybook
OR
yarn storybook
```
- Storybook will start in http://localhost:6006 or the host mentioned in **package.json**. 
- You might see an error. This is a 403 because you need to allow the CL Server render endpoint for the anonymous user. So you need to go to the Drupal permissions page and grant permission to the anonymous user to access the component rendering endpoint. Note that this permission will not be exported into configuration because you excluded cl_server above in **settings.local.php**.
- Now you can restart the Storybook server. Kill the storybook process and run it again.

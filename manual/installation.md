# Instalation Guide

You must follow the next steps:
* Donwload the project sources: `git clone http://gitlab.amplia.es/opengate-ux/opengate-javascript-api.git`
* Donwload dependencies: `npm install`
* Run web to localhost: `gulp`


You could be installed some packages before run `gulp` command.

You will execute the next commands to install the minimal add-ons:
* `npm install -g gulp-cli`

The node version what we are using is: `v4.4.7`
The npm version what we are using is: `3.10.3`

We hope that you will enjoy our opengateJS api.

## Development Guide
### Gulp tasks available

* **clean**: Remove dist folder
* **clean-doc**: Remove documentation folder
* **generate-doc**: Generate javascript documentation by esdoc plugin
* **npm**: Invoke **clean** task and after that compile sources as nodejs dependency
*  **bower**:Invoke **clean** task and after that compile sources as browser dependency
*  **bower:min**:Invoke **clean** task and after that compile and minimize sources as browser dependency 
* **compile**: Invoke **clean** task and after that compile sources as nodejs and browser dependency
* **build**: Invoke **compile** and **generate-doc** tasks.
* **default**: Invoke **watch-src**
* **watch-src**: Listen to any src/** and execute **compile** task
* **watch-test-client**: Listen to any test/client/** and execute **test-client** task
* **test-client**: Execute any **client** test defined into test/client by mocha and phantomJS plugin
* **cucumber**: Execute any **server** test defined into features/*.feature by cucumber plugin
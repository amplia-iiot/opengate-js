# OpenGate.js API

**OpenGate.js** is an EC6 JavaScript library that helps you integrate **OpenGate** easily in your JavaScript projects. Although it's an EC6 project it compiles into compliant EC5 JavaScript thanks to [Babel](https://babeljs.io/) and [`gulp`](http://gulpjs.com/), therefore you can use **OpenGate.js** in your browser application and in your Node.js server.

## Features

* The library is [isomorphic](http://isomorphic.net/), therefore you can use it in both client and server sides.
* [OpenGate North API](https://www.amplia-iiot.com/documentation/latest/api-north/opengate-api-north.html) (NAPI) supported.
  * Provision
  * Searches
  * Operations
* [OpenGate South API](https://www.amplia-iiot.com/documentation/latest/api-south/opengate-api-south.html) (SAPI) supported.
* Fluent API design.

## Documentation

To generate the API documentation you can execute `gulp build` and open the generated HTML on: **documentation/index.html**

## Generate version

Can generate version of the project with the jenkins job http://constructor.amplia.es:8080/jenkins/job/og-ux_generate_release_from_github/

1. Click on "Build with Parameters"
2. Select "incrementVersion"
3. Introduce Project "opengate-js"
4. Click on button Ejecución

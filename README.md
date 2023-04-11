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

Once the version is generated, update dependencies:

1. Update into package.json
```bash
$ yarn upgrade opengate-js@[version]
```

2. Update the version into the project  
```js
import {} from 'opengate-js/dist/opengate-api-bower-[version]'
```

## Tests

Before running the tests you must configure the following values:

- features/support/world.js
-- this.test_url_north
-- this.test_url_south
-- this.apikey - API_KEY of the user used to create the different entities in the test
-- this.YOUR_EMAIL - email of the user used to create the different entities in the test. If it is not configured here, it must be configured in each of the features to be executed if necessary
-- this.YOUR_PASSWORD - password of the user used to create the different entities in the test. If it is not configured here, it must be configured in each of the features to be executed if necessary

- features/feaures/**.feature
-- require-real-apikey: API_KEY of the user used to create the different entities in the test
-- YOUR_EMAIL: email of the user used to create the different entities in the test. If it is not configured here, it must be configured in features/suppport/world.js file
-- YOUR_PASSWORD: password of the user used to create the different entities in the test. If it is not configured here, it must be configured in features/suppport/world.js file

You can run the tests by running the following command:
```bash
$ gulp cucumber [--tags @[tags]]
```
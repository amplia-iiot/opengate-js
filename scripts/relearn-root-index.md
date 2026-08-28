+++
title = "OpenGate JS"
description = "Installation and usage guide for OGAPI.js, OpenGate's JavaScript client library, for Node.js and web/Bower environments, plus its full API reference."
weight = 10
+++

# Installation and Usage

## Instalation

First of all you must install the library in your project. You can use npm or yarn to install the package.

If you use npm, you can install the package as follows:

```bash
npm install opengate-js
```

If you use yarn, you can install the package as follows:

```bash
yarn add opengate-js
```

## Node.js (NPM)

To use the API in a Node.js environment, install the package and instantiate it as follows:

```javascript
var OpengateAPI = require('opengate-js');

var ogapi = new OpengateAPI({
    url: 'your-api-url',
    port: 'your-port',
    version: 'your-version',
    apiKey: 'your-api-key',
    jwt: 'your-jwt',
    south: {
        url: 'your-south-api-url'
    }
});
```

## Web (Bower)

To use the API in a web environment, include the script and instantiate it as follows:

```javascript
import {} from 'opengate-js/dist/opengate-api-bower-16.0.0';

var ogapi = new window.OpenGateAPI({
    url: 'your-api-url',
    port: 'your-port',
    version: 'your-version',
    apiKey: 'your-api-key',
    jwt: 'your-jwt',
    south: {
        url: 'your-south-api-url'
    }
});
```

> Note that opengate-api-bower uses babel to transpile the code to ES5 code.

## API Reference

{{% children sort="weight" depth="10" %}}

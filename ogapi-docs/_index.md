+++
title = "OpenGate JS"
weight = 10
+++

# Installation and Usage

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
// Ensure opengate-api-bower.js is included in your HTML
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

## API Reference

{{% children sort="weight" depth="10" %}}

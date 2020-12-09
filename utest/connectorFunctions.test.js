const _ = require('lodash')
const Ogapi = require('../dist/opengate-api-npm')
const catalog = [{
    "name": "CoAP",
    "connectorSchemaFields": {
        "uriUplink": {
            "type": "string"
        },
        "uriDownLink": {
            "type": "string"
        },
        "manufacturer": {
            "type": "string"
        },
        "model": {
            "type": "string"
        }
    }
}]
const connectorFunctionsCatalog = [
    {
      "name": "MQTT_TEMPLATE",
      "connector": "MQTT",
      "connectorFields": {
        "topicUplink": "???",
        "topicDownLink": "???",
        "manufacturer": "???",
        "model": "????"
      },
      "functions": {
        "decoder": "function() {}",
        "converter": "function() {}",
        "validator": "function() {}",
        "encoder": "function() {}"
      }
    }
  ]
const search = [
    {
      "functions": {
        "converter": "a",
        "validator": "a",
        "decoder": "a",
        "encoder": "a"
      },
      "connector": "MQTT",
      "organization": "gtrrz.victor",
      "name": "test1",
      "channel": "default_channel"
    }
  ]

describe('connectorFunctions', () => {
    test('GET ConnectorFunctionsCatalog', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                get: {
                    '/catalogs/connectorFunctions': {
                        statusCode: 200, body: connectorFunctionsCatalog
                    }
                }
            }
        })
        const response = await _ogapi.newConnectorFunctionsCatalog().getTemplates()
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual(connectorFunctionsCatalog);
    });

    test('GET ConnectorsCatalog', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                get: {
                    '/catalogs/conectors': {
                        statusCode: 200, body: catalog
                    }
                }
            }
        })
        const response = await _ogapi.newConnectorsCatalog().getTemplates()
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual([{
            "name": "CoAP",
            "connectorSchemaFields": {
                "uriUplink": {
                    "type": "string"
                },
                "uriDownLink": {
                    "type": "string"
                },
                "manufacturer": {
                    "type": "string"
                },
                "model": {
                    "type": "string"
                }
            }
        }]);
    });

    test('POST searching with filter', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                post: {
                    '/connectorFunctions/search': {
                        statusCode: 200, body: search
                    }
                }
            }
        })
        const response = await _ogapi.connectorFunctionsSearchBuilder()
            .filter({
                "functions.converter": "a"
            }).build().execute()
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual(search);
    })

    test('POST searching with descending sorting', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                post: {
                    '/connectorFunctions/search': {
                        statusCode: 200, body: search
                    }
                }
            }
        })
        const response = await _ogapi
            .connectorFunctionsSearchBuilder()
            .addSortDescendingBy("name")
            .build()
            .execute()
        expect(response.statusCode).toBe(200);        
        expect(response.data).toEqual(search);
    })
    
    test('POST searching with ascending sorting', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                post: {
                    '/connectorFunctions/search': {
                        statusCode: 200, body: search
                    }
                }
            }
        })
        const response = await _ogapi
            .connectorFunctionsSearchBuilder()
            .addSortAscendingBy("name")
            .build()
            .execute()
        expect(response.statusCode).toBe(200);    
        expect(response.data).toEqual(search);
    })

    test('POST new ConnectorFunction with the minimal data needed', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                post: {
                    '/connectorFunctions': {
                        statusCode: 201
                    }
                },
                get: {
                    '/catalogs/conectors': {
                        statusCode: 200, body: catalog
                    }
                }
            }
        })
        const response = await _ogapi.connectorFunctionsBuilder()
            .withName('test-ogapi')
            .withConnector('CoAP')
            .withChannel('default_channel')
            .withOrganization('gtrrz.victor')
            .create()
        expect(response.statusCode).toBe(201);
    })

    test('POST new ConnectorFunction with an unknown connector', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                get: {
                    '/catalogs/conectors': {
                        statusCode: 200, body: catalog
                    }
                }
            }
        })
        let error
        try {
            await _ogapi.connectorFunctionsBuilder()
                .withName('test-ogapi')
                .withConnector('NOT_EXISTS')
                .withChannel('default_channel')
                .withOrganization('gtrrz.victor')
                .create()
        } catch (err) {
            error = err
        }
        expect(
            error
        ).toMatch(/Invalid connector name/)
    })

    test('POST new ConnectorFunction with a known connector but unknown connectorField', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                get: {
                    '/catalogs/conectors': {
                        statusCode: 200, body: catalog
                    }
                }
            }
        })
        let error
        try {
            await _ogapi.connectorFunctionsBuilder()
                .withName('test-ogapi')
                .withConnector('CoAP')
                .withConnectorField('NOT_VALID', 'value1')
                .withChannel('default_channel')
                .withOrganization('gtrrz.victor')
                .create()
        } catch (err) {
            [error] = err
        }
        expect(
            error.message
        ).toBe("is not allowed to have the additional property \"NOT_VALID\"")
    })

    test('PUT a existing ConnectorFunction with a different connector name', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                put: {
                    '/connectorFunctions/gtrrz.victor/default_channel/test-ogapi': {
                        statusCode: 200, body: {}
                    }
                }
            }
        })
        const response = await _ogapi.connectorFunctionsBuilder()
            .withName('test-ogapi')
            .withConnector('CoAP')
            .withChannel('default_channel')
            .withOrganization('gtrrz.victor')
            .update()

        expect(
            response.statusCode
        ).toBe(200)
    })

    test('GET a existing ConnectorFunction', async () => {
        const responseGet = {
            "name": "test-ogapi",
            "connector": "CoAP",
            "channel": "default_channel",
            "organization": "gtrrz.victor"
        }
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                get: {
                    '/connectorFunctions/gtrrz.victor/default_channel/test-ogapi': {
                        statusCode: 200, body: responseGet
                    }
                }
            }
        })
        const response = await _ogapi
            .newConnectorFunctionFinder()
            .findByOrganizationAndChannelAndName('gtrrz.victor', 'default_channel', 'test-ogapi')
        expect(
            response.statusCode
        ).toBe(200)
        expect(
            response.data
        ).toEqual(responseGet)
    })

    test('DELETE a existing ConnectorFunction', async () => {
        const _ogapi = new Ogapi({
            'url': process.env.url,
            mocks: {
                del: {
                    '/connectorFunctions/gtrrz.victor/default_channel/test-ogapi': {
                        statusCode: 200
                    }
                }
            }
        })
        
        const response = await _ogapi.connectorFunctionsBuilder()
        .withName('test-ogapi')
        .withChannel('default_channel')
        .withOrganization('gtrrz.victor')
        .delete()
        expect(
            response.statusCode
        ).toBe(200)
    })

});
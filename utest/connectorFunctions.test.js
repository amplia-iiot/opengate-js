const _ = require('lodash')
const Ogapi = require('../dist/opengate-api-npm')
const ogapi = new Ogapi({
    'apiKey': process.env.apikey,
    'url': process.env.url,
    'timeout': 20000,
})

describe('connectorFunctions', () => {
    beforeEach(async () => {
        try {
            await ogapi.connectorFunctionsBuilder()
                .withName('test-ogapi')
                .withConnector('MQTT')
                .withChannel('default_channel')
                .withOrganization('gtrrz.victor')
                .delete() // This organization should be the same as process.env.apikey user's organization
        } catch (err) { }
    })

    test('GET ConnectorFunctionsCatalog', async () => {
        const response = await ogapi.newConnectorFunctionsCatalog().getTemplates()
        expect(response.statusCode).toBe(200);
        expect(_.isArray(response.data)).toBe(true);
    });

    test('GET ConnectorsCatalog', async () => {
        const response = await ogapi.newConnectorsCatalog().getTemplates()
        expect(response.statusCode).toBe(200);
        expect(_.isArray(response.data)).toBe(true);
    });

    test('POST searching with filter', async () => {
        const response = await ogapi.connectorFunctionsSearchBuilder()
            .filter({
                "functions.converter": "a"
            }).build().execute()
        expect(response.statusCode).toBe(200);
        expect(_.isArray(response.data)).toBe(true);
    })
    test('POST searching with descending sorting', async () => {
        const response = await ogapi
            .connectorFunctionsSearchBuilder()
            .addSortDescendingBy("name")
            .build()
            .execute()
        expect(response.statusCode).toBe(200);
        expect(_.isArray(response.data)).toBe(true);
    })
    test('POST searching with ascending sorting', async () => {
        const response = await ogapi
            .connectorFunctionsSearchBuilder()
            .addSortAscendingBy("name")
            .build()
            .execute()
        expect(response.statusCode).toBe(200);
        expect(_.isArray(response.data)).toBe(true);
    })

    test('POST new ConnectorFunction with the minimal data needed', async () => {
        const response = await ogapi.connectorFunctionsBuilder()
            .withName('test-ogapi')
            .withConnector('MQTT')
            .withChannel('default_channel')
            .withOrganization('gtrrz.victor')
            .create()
        expect(response.statusCode).toBe(201);
    })

    test('POST new ConnectorFunction with an unknown connector', async () => {
        let error
        try {
            await ogapi.connectorFunctionsBuilder()
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
        let error
        try {
            await ogapi.connectorFunctionsBuilder()
                .withName('test-ogapi')
                .withConnector('MQTT')
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
        await ogapi.connectorFunctionsBuilder()
            .withName('test-ogapi')
            .withConnector('MQTT')
            .withChannel('default_channel')
            .withOrganization('gtrrz.victor')
            .create()

        const response = await ogapi.connectorFunctionsBuilder()
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
        await ogapi.connectorFunctionsBuilder()
            .withName('test-ogapi')
            .withConnector('MQTT')
            .withChannel('default_channel')
            .withOrganization('gtrrz.victor')
            .create()

        const response = await ogapi
            .newConnectorFunctionFinder()
            .findByOrganizationAndChannelAndName('gtrrz.victor', 'default_channel', 'test-ogapi')
        expect(
            response.statusCode
        ).toBe(200)
        expect(
            response.data
        ).toEqual({ 
            "name": "test-ogapi", 
            "connector": "MQTT", 
            "channel": "default_channel", 
            "organization": "gtrrz.victor" 
        })
    })

});
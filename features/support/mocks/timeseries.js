let isCreate = false
const body = {
    "identifier": "60f67f8130e775669ca9bab4",
    "name": "timeserie_name",
    "description": "My timeserie to get inventory data",
    "timeBucket": 3600,
    "identifierColumn": "Identifier",
    "bucketColumn": "Bucket date",
    "retention": 3600000,
    "origin": "2021-01-01T00:00:00.000Z",
    "context": [{
            "path": "provision.device.identifier._current.value",
            "alias": "Prov identifier",
            "filter": "YES",
            "sort": true
        },
        {
            "path": "device.model._current.value.manufacturer",
            "alias": "Manufacturer",
            "filter": "ALWAYS",
            "sort": false
        },
        {
            "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",
            "alias": "ICC",
            "filter": "NO",
            "sort": false
        }
    ],
    "columns": [{
        "path": "device.communicationModules[0].subscription.traffic.sentBytes._current.value",
        "alias": "Daily sent bytes",
        "filter": "NO",
        "sort": false,
        "aggregationFunction": "SUM"
    }]
}
module.exports = {
    createDelete: {
        post: {
            '/provision/organizations': function (req) {
                const organization = req.body.name
                return {
                    statusCode: 201,
                    status: 201,
                    header: {
                        location: 'https://mock/north/v80/provision/organizations/' + organization
                    }
                }
            },
            '/timeseries/provision/organizations/:organization': function (req) {
                const requiredFields = ['name', 'timeBucket', 'columns', 'identifierColumn']
                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                const organization = req.params.organization
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                const body = req.body
                requiredFields.forEach(requiredField => {
                    if (!body[requiredField]) {
                        errors[0].context.push({
                            value: "undefined",
                            name: requiredField
                        })
                    }
                });
                if (isCreate) {
                    errors.push({
                        code: 1,
                        "message": "Entity exists"
                    })
                }
                if (req.body.name === 'existsTimeseries') {
                    isCreate = true
                }
                if (errors[0].context.length > 0 || errors.length > 1) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 201,
                    status: 201,
                    header: {
                        location: 'https://mock/north/v80/timeseries/provision/organizations/' + organization + '/timesericreatepost'
                    }
                }
            }
        },
        del: {
            '/provision/organizations/:organization': {
                statusCode: 200,
                status: 200
            },
            '/timeseries/provision/organizations/:organization/:id': function (req) {
                const organization = req.params.organization
                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                const id = req.params.id
                if (!id) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "timeserieId"
                    })
                }
                if (errors[0].context.length > 0) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 200,
                    status: 200
                }
            }
        },
        get: {
            '/timeseries/provision/organizations/:organization': function (req) {
                const organization = req.params.organization
                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                if (errors[0].context.length > 0) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 200,
                    status: 200,
                    body: {
                        "timeseries": [{
                            "identifier": "timesericreatepost",
                            "name": "timeserie_name",
                            "description": "My timeserie to get inventory data",
                            "timeBucket": 3600,
                            "identifierColumn": "Identifier",
                            "bucketColumn": "Bucket date",
                            "retention": 3600000,
                            "origin": "2021-01-01T00:00:00.000Z"
                        }]
                    }
                }
            },
            '/timeseries/provision/organizations/:organization/:id': function (req) {
                const organization = req.params.organization
                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                const id = req.params.id
                if (!id) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "timeserieId"
                    })
                }
                if (errors[0].context.length > 0) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 200,
                    status: 200,
                    body: {
                        "identifier": id,
                        "name": "timeserie_name",
                        "description": "My timeserie to get inventory data",
                        "timeBucket": 3600,
                        "identifierColumn": "Identifier",
                        "bucketColumn": "Bucket date",
                        "retention": 3600000,
                        "origin": "2021-01-01T00:00:00.000Z",
                        "context": [{
                            "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",
                            "name": "ICC value",
                            "filter": "NO",
                            "type": "integer",
                            "sort": true
                        }],
                        "columns": [{
                            "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",
                            "name": "ICC value",
                            "filter": "NO",
                            "type": "integer",
                            "sort": true,
                            "aggregationFunction": "LAST"
                        }]
                    }
                }
            }
        }
    },
    find: {
        post: {
            '/provision/organizations': function (req) {
                const organization = req.body.name
                return {
                    statusCode: 201,
                    status: 201,
                    header: {
                        location: 'https://mock/north/v80/provision/organizations/' + organization
                    }
                }
            },
            '/timeseries/provision/organizations/:organization': function (req) {
                const organization = req.params.organization
                const name = req.body.name
                return {
                    statusCode: 201,
                    status: 201,
                    header: {
                        location: 'https://mock/north/v80/timeseries/provision/organizations/' + organization + '/' + name
                    }
                }
            }
        },
        del: {
            '/provision/organizations/:organization': {
                statusCode: 200,
                status: 200
            },
            '/timeseries/provision/organizations/:organization/:id': {
                statusCode: 200,
                status: 200
            }
        },
        get: {
            '/timeseries/provision/organizations/:organization': function (req) {
                const organization = req.params.organization
                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                if (errors[0].context.length > 0) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 200,
                    status: 200,
                    body: {
                        "timeseries": [{
                            "identifier": body.identifier,
                            "name": body.name,
                            "description": body.description,
                            "timeBucket": body.timeBucket,
                            "identifierColumn": body.identifierColumn,
                            "bucketColumn": body.bucketColumn,
                            "retention": body.retention,
                            "origin": body.origin
                        }]
                    }
                }
            },
            '/timeseries/provision/organizations/:organization/:identifier': function (req) {
                const organization = req.params.organization
                const identifier = req.params.identifier

                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                if (!identifier) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "identifier"
                    })
                }
                if (errors[0].context.length > 0) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 200,
                    status: 200,
                    body: {
                        "identifier": body.identifier,
                        "name": body.name,
                        "description": body.description,
                        "timeBucket": body.timeBucket,
                        "identifierColumn": body.identifierColumn,
                        "bucketColumn": body.bucketColumn,
                        "retention": body.retention,
                        "origin": body.origin,
                        "context": body.context,
                        "columns": body.columns
                    }
                }
            }
        }
    },
    filterFields: {
        post: {
            '/timeseries/provision/organizations/:organization': function (req) {
                const organization = req.params.organization
                return {
                    statusCode: 201,
                    status: 201,
                    header: {
                        location: 'https://mock/north/v80/timeseries/provision/organizations/' + organization + '/60f67f8130e775669ca9bab4'
                    }
                }
            },
            '/timeseries/provision/organizations/:organization/:identifier/data': function (req) {
                const organization = req.params.organization
                const identifier = req.params.identifier
                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                if (!identifier) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "identifier"
                    })
                }
                if (errors[0].context.length > 0) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 200,
                    status: 200,
                    body: {
                        "page": {
                            "number": 26
                        },
                        "columns": [
                            "Time bucket date",
                            "Prov identifier",
                            "Manufacturer",
                            "ICC",
                            "Daily sent bytes",
                            "Daily received bytes",
                            "Last presence",
                            "Average Signal strength"
                        ],
                        "data": [
                            [
                                "2021-04-06T12:00:00.000Z",
                                "MyDevice1",
                                "OpenGate",
                                "icc1",
                                23500,
                                532,
                                "IP",
                                75
                            ],
                            [
                                "2021-04-06T12:01:00.000Z",
                                "MyDevice1",
                                "OpenGate",
                                "icc1",
                                3500,
                                14532,
                                "IP",
                                65
                            ]
                        ]
                    }
                }
            }
        },
        get: {
            '/timeseries/provision/organizations/:organization/:identifier': function (req) {
                const identifier = req.params.identifier
                return {
                    statusCode: 200,
                    status: 200,
                    body: {
                        "identifier": identifier,
                        "name": body.name,
                        "description": body.description,
                        "timeBucket": body.timeBucket,
                        "identifierColumn": body.identifierColumn,
                        "bucketColumn": body.bucketColumn,
                        "retention": body.retention,
                        "origin": body.origin,
                        "context": body.context,
                        "columns": body.columns
                    }
                }
            }
        },
        del: {
            '/timeseries/provision/organizations/:organization/:id': {
                statusCode: 200,
                status: 200
            }
        }
    },
    'searching': {
        post: {
            '/timeseries/provision/organizations/:organization/:identifier/data': function (req) {
                const organization = req.params.organization
                const identifier = req.params.identifier
                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                if (!identifier) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "identifier"
                    })
                }
                if (errors[0].context.length > 0) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 200,
                    status: 200,
                    body: {
                        "page": {
                            "number": 26
                        },
                        "columns": [
                            "Time bucket date",
                            "Prov identifier",
                            "Manufacturer",
                            "ICC",
                            "Daily sent bytes",
                            "Daily received bytes",
                            "Last presence",
                            "Average Signal strength"
                        ],
                        "data": [
                            [
                                "2021-04-06T12:00:00.000Z",
                                "MyDevice1",
                                "OpenGate",
                                "icc1",
                                23500,
                                532,
                                "IP",
                                75
                            ],
                            [
                                "2021-04-06T12:01:00.000Z",
                                "MyDevice1",
                                "OpenGate",
                                "icc1",
                                3500,
                                14532,
                                "IP",
                                65
                            ]
                        ]
                    }
                }
            }
        },
        del: {
            '/timeseries/provision/organizations/:organization/:identifier/data': function (req) {
                const organization = req.params.organization
                const identifier = req.params.identifier
                const body = req.body
                console.log(body)
                const errors = [{
                    "code": 0,
                    "message": "Error on post",
                    "context": []
                }]
                if (!organization) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organization"
                    })
                }
                if (!identifier) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "identifier"
                    })
                }
                if (errors[0].context.length > 0) {
                    return {
                        statusCode: 400,
                        status: 400,
                        body: errors
                    }
                }
                return {
                    statusCode: 200,
                    status: 200
                }
            }
        }
    }
}
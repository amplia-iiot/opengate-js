let isCreate = false
let postBody

function postOrganizationPlan(req, saveBody) {
    const requiredFields = ['name', 'maxStorageLifeTime', 'maxDeviceAmount']
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
            code: 0,
            "message": "Entity exists"
        })
        isCreate = false
    } else if (req.body.name === 'existsOrganizationPlan') {
        isCreate = true
    }

    if (errors[0].context.length > 0 || errors.length > 1) {
        return {
            statusCode: 400,
            status: 400,
            body: errors
        }
    }
    if (saveBody) {
        postBody = req.body
    }
    return {
        statusCode: 201,
        status: 201,
        header: {
            location: 'https://mock/north/v80/provision/organizations/' + organization + '/0bb30c4b-2953-4a8d-b084-3e2e0bb25a76'
        }
    }
}

function deletePlan(req){
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
            name: "organizationsPlansId"
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

module.exports = {
    createDelete: {
        post: {
            '/north/v80/provision/organizations': function (req) {
                const organization = req.body.name
                return {
                    statusCode: 201,
                    status: 201,
                    header: {
                        location: 'https://mock/north/v80/provision/organizations/' + organization
                    }
                }
            },
            '/north/v80/provision/organizations/:organization/organizationPlans': function (req) {
                return postOrganizationPlan(req)
            }
        },
        put: {
            '/north/v80/provision/organizations/:organization/organizationPlans/:id': function (req) {
                const requiredFields = ['name', 'maxStorageLifeTime', 'maxDeviceAmount']
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
                const id = req.params.id
                if (!id) {
                    errors[0].context.push({
                        value: "undefined",
                        name: "organizationsPlansId"
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
                if (errors[0].context.length > 0 || errors.length > 1) {
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
        del: {
            '/north/v80/provision/organizations/:organization': {
                statusCode: 200,
                status: 200
            },
            '/north/v80/provision/organizations/:organization/organizationPlans/:id': function (req) {
                return deletePlan(req)
            }
        },
        get: {
            '/north/v80/provision/organizations/:organization/organizationPlans': function (req) {
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
                    body: bodyGETOrganizationPlans
                }
            },
            '/north/v80/provision/organizations/:organization/organizationPlans/:id': function (req) {
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
                        name: "organizationsPlansId"
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
                    body: bodyGETOrganizationPlan
                }
            }
        }
    },
    find: {
        post: {
            '/north/v80/provision/organizations': function (req) {
                const organization = req.body.name
                return {
                    statusCode: 201,
                    status: 201,
                    header: {
                        location: 'https://mock/north/v80/provision/organizations/' + organization
                    }
                }
            },
            '/north/v80/provision/users': function (req) {
                const organization = req.body.name
                return {
                    statusCode: 201,
                    status: 201,
                    header: {
                        location: 'https://mock/north/v80/provision/users/' + organization
                    }
                }
            },
            '/north/v80/provision/organizations/:organization/organizationPlans': function (req) {
                return postOrganizationPlan(req, true)
            }
        },
        del: {
            '/north/v80/provision/organizations/:organization': {
                statusCode: 200,
                status: 200
            },
            '/north/v80/provision/users/:user': {
                statusCode: 200,
                status: 200
            },
            '/north/v80/provision/organizations/:organization/organizationPlans/:id': function (req) {
                return deletePlan(req)
            }
        },
        get: {
            '/north/v80/provision/organizations/:organization/organizationPlans': function (req) {
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
                        "plans": [postBody]
                    }
                }
            },
            '/north/v80/provision/organizations/:organization/organizationPlans/:identifier': function (req) {
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
                    body: postBody
                }
            },
            '/north/v80/provision/organizations/:organization/organizationPlans?visibility=assignable': function (req) {
                return {
                    statusCode: 200,
                    status: 200,
                    body: {plans: [postBody]}
                }
            },
            '/north/v80/provision/organizations/:organization/organizationPlans?visibility=administrable': function (req) {
                return {
                    statusCode: 200,
                    status: 200,
                    body: {plans: [postBody]}
                }
            }
        }
    }
}
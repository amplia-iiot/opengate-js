// features/step_definitions/when_step_definitions.js
var request = require('superagent')
var GenericFinder = require(process.cwd() + '/dist/src/GenericFinder');
var {
    When,
    Given
} = require('cucumber');

When(/^I want "([^"]*)"( (\d*) minutes| for this url "([^"]*)" for)? (a|of a) operation$/, function (action, nothing, minutes, data, exclude) {
    var _this = this;

    function digestResponseData(response) {
        //console.log('digestResponseData', response)
        //Guardamos el identificador anterior por si hiciera falta para el siguiente paso
        var id = _this.responseData.id;
        var location = _this.responseData.location;
        var data = _this.responseData.data;

        _this.responseData = response;

        if (id && !_this.responseData.id) {
            _this.responseData.id = id;
        }
        if (data.id) {
            if (_this.responseData.data) {
                if (!_this.responseData.data.id)
                    _this.responseData.data.id = data.id;
            } else {
                _this.responseData.data = {
                    id: data.id
                };
            }
        }
        if (location && !_this.responseData.location) {
            _this.responseData.location = location;
        }
        this.error = undefined;
    }

    function digestErrorData(response) {
        console.error('digestErrorData', response)
        var cache = [];
        var error = JSON.stringify(response, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = null; // Enable garbage collection

        _this.error = error;
        _this.responseData = response;

    }

    try {
        var findMethod;
        switch (action) {
            case "active":
                findMethod = "active";
                break;
            case "pause":
                findMethod = "pause";
                break;
            case "execute now":
                findMethod = "executeNow";
                break;
            case "cancel":
                findMethod = "cancel";
                break;
            case "execute later":
                findMethod = "executeLater";
                break;
            case "change callback":
                findMethod = "changeCallback";
                break;
            case "active periodicity":
                findMethod = "activePeriodicity";
                break;
            case "pause periodicity":
                findMethod = "pausePeriodicity";
                break;
            case "cancel periodicity":
                findMethod = "cancelPeriodicity";
                break;
            default:
                throw new Error("Not exists action " + action);
        }
        var util = this.util[findMethod];
        return util.call(this.util, (data || (minutes * 1))).then(digestResponseData).catch(digestErrorData);
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
        throw new Error(JSON.stringify(err));
    }
});

When(/^I try to find an operation for its id of periodicity and save its id$/, function () {
    var _this = this;
    _this.error = undefined;

    function digestResponseData(response) {
        //console.log('digestResponseData', response)
        _this.responseData = {
            data: response.data[0],
            statusCode: response.statusCode,
            location: undefined
        };
        _this.error = undefined;
    }

    function digestErrorData(error) {
        console.error('digestErrorData', err)
        _this.error = error;
        _this.responseData = error;

    }

    var id;
    if (_this.responseData.data && _this.responseData.data.id) {
        id = _this.responseData.data.id;
    } else if (_this.responseData.location) {
        id = _this.responseData.location.substring(_this.responseData.location.lastIndexOf("/") + 1);
    } else if (_this.responseData.id) {
        id = _this.responseData.id;
    }
    try {
        return new GenericFinder(this.ogapi, "operation/tasks", "job", "Jobs not found")._withId(id + "/jobs")._execute().then(digestResponseData).catch(digestErrorData);
    } catch (err) {
        console.error('ERROR: ', err)
        return;
    }

});

When(/^I try to find by operation's id$/, function () {
    var _this = this;
    this.error = undefined;

    function digestResponseData(response) {
        //console.log('digestResponseData', response)
        var id = _this.responseData.id;
        var location = _this.responseData.location;

        _this.responseData = response;

        if (id && !_this.responseData.id) {
            _this.responseData.id = id;
        }
        if (location && !_this.responseData.location) {
            _this.responseData.location = location;
        }

        this.error = undefined;
    }

    function digestErrorData(response) {
        console.error('digestErrorData', response)
        _this.error = response;
        _this.responseData = response;

    }

    try {
        var responseData = this.responseData;
        var location = responseData.location;
        var id;
        if (location) {
            id = location.substring(location.lastIndexOf("/") + 1);
        } else if (responseData.id) {
            id = responseData.id;
        } else {
            id = responseData.data.id;
        }
        var findMethod = _this.model_match(_this.currentModel).setters(_this.currentEntity).id;
        if (this.limit) {
            return this.util[findMethod](id, this.limit.size * 1, this.limit.start * 1).then(digestResponseData).catch(digestErrorData);
        }
        return this.util[findMethod](id).then(digestResponseData).catch(digestErrorData);
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
        return;
    }
});

When(/^I build it with filter by operation's id$/, function (callback) {
    this.error = undefined;

    try {
        var data;
        if (this.responseData.statusCode)
            data = this.responseData.statusCode;
        else if (this.responseData[1])
            data = this.responseData[1];
        var jobId = data.id;
        this.build = this.util.onDevices().filter({
            "and": [{
                "like": {
                    "job.id": jobId
                }
            }]
        }).build();
    } catch (err) {
        this.error = err;
        throw err;
    }
    callback();
});

When(/^I build it$/, function (callback) {
    this.error = undefined;

    try {
        this.build = this.util.build();
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
    }
    callback();
});

When(/^I add a filter and with$/, function (table, callback) {
    this.error = undefined;
    var _this = this;

    try {
        var filterBuilder = this.ogapi.newFilterBuilder();
        var data = table.hashes();

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                filterBuilder = filterBuilder.and(this.ogapi.EX[element.operator](element.key, element.value));
            }
            this.util.filter(filterBuilder);
        }
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
    }
    callback();
});


When(/^I build it with select...$/, function (table, callback) {
    this.error = undefined;
    var _this = this;
    try {
        var data = table.hashes();
        var selectBuilder = this.ogapi.newSelectBuilder();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                var selectElement = _this.ogapi.SE.element(element.datastreamId, JSON.parse(element.fields));
                selectBuilder = selectBuilder.add(selectElement);
            }
        }
        this.util.select(selectBuilder);
        this.build = this.util.build();
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
    }
    callback();
});

When(/^I build it with flattened response$/, function (callback) {
    this.error = undefined;

    try {
        this.build = this.util.flattened().build();
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
    }
    callback();
});

When(/^I build it with flattened and disable order response$/, function (callback) {
    this.error = undefined;

    try {
        this.build = this.util.flattened().disableDefaultSorted().build();
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
    }
    callback();
});

When(/^I build it with flattened, disable order and disable case sensitivie response$/, function (callback) {
    this.error = undefined;

    try {
        this.build = this.util.flattened().disableDefaultSorted().disableCaseSensitive().build();
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
    }
    callback();
});

When(/^I build it with summary response$/, function (callback) {
    this.error = undefined;

    try {
        this.build = this.util.summary().build();
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
    }
    callback();
});

When(/^I add group by$/, function (group, callback) {
    this.error = undefined;

    try {
        this.build = this.util.group(JSON.parse(group));
    } catch (err) {
        this.error = err;
    }
    callback();
});

When(/^I execute it$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log("catchResponse", data);
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error("catchErrorResponse", err);
        _this.responseData = undefined;
        _this.error = err;

    }

    try {
        return this.build.execute().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});

When(/^I delete data$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log("catchResponse", data);
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error("catchErrorResponse", err);
        _this.responseData = undefined;
        _this.error = err;

    }

    try {
        return this.build.delete().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});

When(/^I download csv it$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        _this.responseData = err;
        _this.error = err;

    }

    try {
        return this.build.downloadCsv().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});



When(/^I execute with async paging it$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;
    _this.data = [];

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        _this.responseData = err;
        _this.error = err;

    }

    function catchNotification(notification) {
        //console.log('catchNotification', notification)
        _this.error = undefined;
        _this.responseData = undefined;
        _this.data.push(notification);
    }

    try {
        return this.build.executeWithAsyncPaging(_this.util.resource).then(catchResponse, null, catchNotification).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});

When(/^I execute with async paging it and cancel it$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;
    _this.data = [];

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        _this.responseData = err;
        _this.error = err;

    }

    function catchNotification(notification) {
        //console.log('catchNotification', notification)
        _this.error = undefined;
        _this.responseData = undefined;
        _this.data.push(notification);
        _this.build.cancelAsyncPaging();
    }

    try {
        return this.build.executeWithAsyncPaging(_this.util.resource).then(catchResponse, null, catchNotification).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});

When(/^I execute with async paging it and cancel it with custom message$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;
    _this.data = [];

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        _this.responseData = err;
        _this.error = err;

    }

    function catchNotification(notification) {
        //console.log('catchNotification', notification)
        _this.error = undefined;
        _this.responseData = undefined;
        _this.data.push(notification);
        _this.build.cancelAsyncPaging('cancel with custom message');
    }

    try {
        return this.build.executeWithAsyncPaging(_this.util.resource).then(catchResponse, null, catchNotification).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});

When(/^I update periodicity$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        var cache = [];
        var error = JSON.stringify(err.data.errors, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = null; // Enable garbage collection
        _this.responseData = err;
        _this.error = error;

    }

    try {
        return this.build.updatePeriodicity().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});

When(/^I create it$/, {timeout: 60 * 1000}, function () {

    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log("catchResponse", data);
        _this.responseData = data;
        _this.location = _this.responseData.location;
        _this.error = undefined;

    }

    function catchErrorResponse(err) {
        console.error("catchErrorResponse", err)
        _this.responseData = err;

        if (err.errors) {
            _this.error = err.errors;
        } else if (err.data.errors) {
            _this.error = err.data.errors;
        } else {
            _this.error = err;
        }

    }

    try {
        if (_this.filePath) {
            return _this.util.create(_this.filePath).then(catchResponse).catch(catchErrorResponse);
        } else {
            return _this.util.create().then(catchResponse).catch(catchErrorResponse);
        }
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;

        return;
    }
});


When(/^I "([^"]*)" it with bulk$/, function (action) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.location = _this.responseData.location;
        _this.error = this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        _this.responseData = err;
        if (err.errors) {
            _this.error = err.errors;
        } else if (err.data.errors) {
            _this.error = err.data.errors;
        } else {
            _this.error = err;
        }

    }

    try {
        if (_this.fileData) {
            return _this.util[action](_this.fileData).then(catchResponse).catch(catchErrorResponse);
        }
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});

When(/^I "([^"]*)" it with bulk execution$/, {
    timeout: 60 * 1000
}, function (action) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.location = _this.responseData.location;
        _this.error = this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        _this.responseData = err;
        if (err.errors) {
            _this.error = err.errors;
        } else if (err.data.errors) {
            _this.error = err.data.errors;
        } else {
            _this.error = err;
        }

    }

    try {
        if (_this.fileData) {
            return _this.util[action](_this.filePath, 'xls').then(catchResponse).catch(catchErrorResponse);
        }
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});

When(/^I "([^"]*)" it with bulk and response with format csv$/, function (action) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        _this.responseData = err;
        _this.error = err;
    }

    try {
        if (_this.fileData) {
            return _this.util[action](_this.fileData, true).then(catchResponse).catch(catchErrorResponse);
        }
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        return;
    }
});
When(/^I delete it with identfier from location$/, function () {

    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log("OK");
        //console.log(JSON.stringify(data));
        _this.responseData = data;
        _this.error = undefined;
        //console.log(data);
    }

    function catchErrorResponse(err) {
        //console.log("NOK");
        //console.log(JSON.stringify(err));
        _this.responseData = err;
        _this.error = err;

    }
    var id;
    try {
        if (this.responseData) {
            if (this.responseData.location)
                id = this.responseData.location.substring(this.responseData.location.lastIndexOf("/") + 1);
            else if (this.responseData.data)
                id = this.responseData.data.id;
            else if (this.responseData[0])
                id = this.responseData[0].id;
        } else if (this.location) {
            id = this.location.substring(this.location.lastIndexOf("/") + 1);
        }

        _this.util.withIdentifier(id)
        return _this.util.delete().then(catchResponse).catch(catchErrorResponse);

    } catch (err) {
        //console.error(err);
        _this.responseData = err;
        _this.error = err;
        //this.expect(this.error).to.be.undefined;
        return;
    }
});

When(/^I delete it$/, { timeout: 60 * 1000 }, function () {

    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data);
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err);
        _this.responseData = err;
        _this.error = err;

    }

    try {
        ;
        return _this.util.delete().then(catchResponse).catch(catchErrorResponse);

    } catch (err) {
        console.error('ERROR: ', err);
        _this.responseData = err;
        _this.error = err;
        return;
    }
});

When(/^I delete it with location as a identifier$/, function () {

    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data);
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err);
        _this.responseData = err;
        _this.error = err;

    }

    try {
        var id = this.location.substring(this.location.lastIndexOf("/") + 1);
        return _this.util.withIdentifier(id).delete().then(catchResponse).catch(catchErrorResponse);

    } catch (err) {
        console.error('ERROR: ', err);
        _this.responseData = err;
        _this.error = err;
        return;
    }
});

When(/^I delete it all$/, function () {

    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data)
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err)
        _this.responseData = err;
        _this.error = err;

    }

    try {
        return _this.util.deleteAll().then(catchResponse).catch(catchErrorResponse);

    } catch (err) {
        console.error('ERROR: ', err);
        _this.responseData = err;
        _this.error = err;
        return;
    }
});

When(/^I update it with identfier from location$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        _this.responseData = data;
        _this.error = undefined;
        //console.log(JSON.stringify(_this.data));
    }

    function catchErrorResponse(err) {
        _this.responseData = err;
        _this.error = err;

    }
    var id
    try {
        if (this.responseData) {
            if (this.responseData.location)
                id = this.responseData.location.substring(this.responseData.location.lastIndexOf("/") + 1);
            else if (this.responseData.data)
                id = this.responseData.data.id;
            else if (this.responseData[0])
                id = this.responseData[0].id;
        } else if (this.location) {
            id = this.location.substring(this.location.lastIndexOf("/") + 1);
        }

        _this.util.withIdentifier(id)
        return _this.util.update().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        this.error = err;
        //console.log(err);
        return;
    }
});

When(/^I update it$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', _this.data);
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err);
        _this.responseData = err;
        _this.error = err;

    }

    try {
        return _this.util.update().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;

        return;
    }
});

When(/^I request reset password$/, function () {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data);
        _this.responseData = data;
        _this.error = undefined;

    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err);
        _this.responseData = err;
        _this.error = err;

    }

    try {
        return _this.util.requestResetPassword().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;

        return;
    }
});

When(/^I read reset password mail and save token mock$/, function () {
    var _this = this;

    _this.values = {
        token: 'akdjfkasdjfklsadjflkjasld'
    };
})

When(/^I read reset password mail and save token$/, { timeout: 30000 }, async function () {
    var _this = this;
    
    await new Promise(async (callback, error) => {
        _this.error = undefined;
        _this.responseData = undefined;
        _this.values = {
            token: undefined
        };

        const setEmailUserUrl = 'set_email_user';
        const getEmailListUrl = 'get_email_list';
        const fetchEmailUrl = 'fetch_email';

        const configUserEmail = {
            email_user: 'ogapi',
            lang: 'en',
            sid_token: undefined,
            email_addr: undefined,
            email_id: undefined
        }

        try {
            request.get(_this.guerrillaApi).query({
                f: setEmailUserUrl,
                email_user: configUserEmail.email_user,
                lang: 'en'
            }).end((err, response) => {
                if(err){
                    console.log(err);
                    _this.error = err;
                    error(JSON.stringify(err));
                }else{
                    configUserEmail.sid_token = response.body.sid_token
                    request.get(_this.guerrillaApi).query(
                        {
                            f: getEmailListUrl,
                            offset: 0,
                            sid_token: configUserEmail.sid_token
                        }
                    )
                    .end((err, response) => {
                        if(err){
                            console.log(err);
                            _this.error = err;
                            error(JSON.stringify(err));
                        }else{
                            const list = response.body && response.body.list || []
                            const email = list[0]
                            configUserEmail.email_id = email && email.mail_id
                            request.get(_this.guerrillaApi).query({
                                f: fetchEmailUrl,
                                email_id: configUserEmail.email_id,
                                sid_token: configUserEmail.sid_token
                            })
                            .end((err, response) => {
                                if(err){
                                    console.log(err);
                                    _this.error = err;
                                    error(JSON.stringify(err))
                                }else{
                                    const getEmail = response.body.mail_body || ''
                                    const getToken = getEmail.match(/tokenId=([^&>;]*)"/) && getEmail.match(/tokenId=([^&>;]*)"/)[1];
                                    if (!getToken) {
                                        error('Token or email not exists!!!');
                                    }
                                    _this.values.token = getToken;
                                    callback();
                                }
                            })
                        }
                    })
                }
            })
        } catch (err) {
            console.log(err);
            _this.error = err;
            error(JSON.stringify(err));
        }
    })
});


When(/^I update password with "([^"]*)"$/, function (field) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data);
        _this.responseData = data;
        _this.error = undefined;

    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err);
        _this.responseData = err;
        _this.error = err;

    }

    try {
        return _this.util.changePassword(field).then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;

        return;
    }
});

When(/^I update apiKey with "([^"]*)"$/, function (field) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data);
        _this.responseData = data;
        _this.error = undefined;

    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err);
        _this.responseData = err;
        _this.error = err;

    }

    try {
        return _this.util.changeApiKey(field).then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;

        return;
    }
});

When(/^I update password with "([^"]*)" and token$/, function (password) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;
    var token = _this.values && _this.values.token
    function catchResponse(data) {
        //console.log('catchResponse', data);
        _this.responseData = data;
        _this.error = undefined;

    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err);
        _this.responseData = err;
        _this.error = err;

    }

    try {

        return _this.util.updatePassword(password, token).then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;

        return;
    }
});

When(/^I get filter fields...$/, function (table, callback) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.log('catchResponse', data);
        _this.responseData = data;
        _this.error = undefined;
        callback()
    }

    function catchErrorResponse(err) {
        console.error("catchErrorResponse", err);
        _this.responseData = undefined;
        _this.error = err;
        callback()
    }

    try {
        var data = table.hashes();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var withMethod = this.model_match(this.currentModel).setters(this.currentEntity)[data[i].field];
                this.util[withMethod](data[i].content).then(catchResponse).catch(catchErrorResponse);
            }
        } else {
            this.error = "No params found";
            callback()
        }
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;
        callback()
    }
});

When(/^I clone it with...$/, function (table) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        _this.responseData = err;
        _this.error = err;

    }

    try {
        var args = [];

        var data = table.hashes();

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].param.toLowerCase() === "true" || data[i].param.toLowerCase() === "false")
                    args.push(JSON.parse(data[i].param));
                else
                    args.push(data[i].param);
            }

            return _this.util.cloneTo.apply(_this.util, args).then(catchResponse).catch(catchErrorResponse);
        } else {
            this.error = "No params found";
            return;
        }

    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err;

        return;
    }

});



When(/^I get allowed Datastreams fields$/, function (callback) {
    var _this = this;
    _this.responseData = this.util.getAllowedDatastreams();
    callback();
});

Given(/^I can found "([^"]*)" as datastream name$/, function (dsName, callback) {
    // Write code here that turns the phrase above into concrete actions
    if (this.responseData.filter(function (item) {
        return item.identifier === dsName;
    }).length === 0) {
        throw new Error('Datastream not found. DSName:' + dsName);
    }
    callback();
});

Given(/^I can not found "([^"]*)" as datastream name$/, function (dsName, callback) {
    // Write code here that turns the phrase above into concrete actions
    if (this.responseData.filter(function (item) {
        return item.identifier === dsName;
    }).length === 0) {
        callback();
    }
    throw new Error('Datastream found. DSName:' + dsName);
});


When(/^I delete all$/, function () {

    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse(data) {
        //console.error('catchResponse', data);
        _this.responseData = data;
        _this.error = undefined;
    }

    function catchErrorResponse(err) {
        console.error('catchErrorResponse', err);
        _this.responseData = err;
        _this.error = err;

    }

    try {
        return _this.util.deleteAll().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        _this.responseData = err;
        _this.error = err;
        return;
    }
});
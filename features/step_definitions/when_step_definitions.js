// features/step_definitions/when_step_definitions.js

var GenericFinder = require(process.cwd() + '/dist/src/GenericFinder');
var assert = require('chai').assert;

module.exports = function() {

    this.When(/^I want "([^"]*)"( (\d*) minutes| for this url "([^"]*)" for)? (a|of a) operation$/, function(action, nothing, minutes, data, exclude) {
        var _this = this;

        function digestResponseData(response) {
            //Guardamos el identificador anterior por si hiciera falta para el siguiente paso
            var id = _this.responseData.id;
            var location = _this.responseData.location;
            var data = _this.responseData.data;

            _this.responseData = response;

            if (id && !_this.responseData.id) {
                _this.responseData["id"] = id;
            }
            if (data.id) {
                if (_this.responseData.data) {
                    if (!_this.responseData.data.id)
                        _this.responseData.data["id"] = data.id
                } else {
                    _this.responseData["data"] = { id: data.id };
                }
            }
            if (location && !_this.responseData.location) {
                _this.responseData["location"] = location;
            }
        }

        function digestErrorData(response) {

            var cache = [];
            var error = JSON.stringify(response, function(key, value) {
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
            //console.log("I WANT ERROR: " + error);
            _this.error = response;
            _this.responseData = response;
        }

        try {
            var findMethod = undefined;
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
            //console.log("DATA: " + data);
            //console.log("MINUTES: " + minutes);
            return util.call(this.util, (data || (minutes * 1))).then(digestResponseData).catch(digestErrorData);
        } catch (err) {
            //console.log(err)
            this.error = err;
            throw err;
        }
    });

    this.When(/^I try to find an operation for its id of periodicity and save its id$/, function() {
        var _this = this;
        _this.error = undefined;

        function digestResponseData(response) {
            _this.responseData = { data: response.data[0], statusCode: response.statusCode, location: undefined };
        }

        function digestErrorData(error) {
            //console.log("STEP GENERIC_FINDER ERROR: " + JSON.stringify(error));
            _this.error = error;
            _this.responseData = error;
        }

        var id = undefined;
        if (_this.responseData.data && _this.responseData.data.id) {
            id = _this.responseData.data.id;
        } else if (_this.responseData.location) {
            id = _this.responseData.location.substring(_this.responseData.location.lastIndexOf("/") + 1);
        } else if (_this.responseData.id) {
            id = _this.responseData.id;
        }
        //console.log("ID: " + id);
        return new GenericFinder(this.ogapi, "operation/tasks", "job", "Jobs not found")._withId(id + "/jobs")._execute().then(digestResponseData).catch(digestErrorData);

    });

    this.When(/^I try to find by operation's id$/, function() {
        var _this = this;
        this.error = undefined;

        function digestResponseData(response) {
            //console.log("FIND BY EXECUTION ID RESPONSE: " + JSON.stringify(response));
            //Guardamos el id y/o location por si hiciera falta en el siguiente step
            var id = _this.responseData.id;
            var location = _this.responseData.location;

            _this.responseData = response;

            if (id && !_this.responseData.id) {
                _this.responseData["id"] = id;
            }
            if (location && !_this.responseData.location) {
                _this.responseData["location"] = location;
            }

        }

        function digestErrorData(response) {
            //console.log("FIND BY EXECUTION ID ERROR: " + JSON.stringify(response));
            _this.error = response;
            _this.responseData = response;
        }

        try {
            var responseData = this.responseData;
            var location = responseData.location;
            var id = undefined;
            //console.log("RESPONSE_DATA: " + JSON.stringify(responseData));
            if (location) {
                id = location.substring(location.lastIndexOf("/") + 1);
            } else if (responseData.id) {
                id = responseData.id;
            } else {
                id = responseData.data.id;
            }
            //console.log("_ID_:" + id);
            var findMethod = _this.model_match(_this.currentModel).setters(_this.currentEntity)["id"];
            //console.log("_METHOD_:" + findMethod);
            if (this.limit) {
                //console.log("LIMIT: " + JSON.stringify(this.limit));
                return this.util[findMethod](id, this.limit.size * 1, this.limit.start * 1).then(digestResponseData).catch(digestErrorData);
            }
            return this.util[findMethod](id).then(digestResponseData).catch(digestErrorData);
        } catch (err) {
            this.error = err;
            //console.log("ERROR: " + err);
            return;
        }
    });

    this.When(/^I build it with filter by operation's id$/, function(callback) {
        this.error = undefined;

        try {
            var data = undefined;
            if (this.responseData.statusCode)
                data = this.responseData.statusCode;
            else if (this.responseData[1])
                data = this.responseData[1];
            var jobId = data.id;
            this.build = this.util.onDevices().filter({ "and": [{ "like": { "job.id": jobId } }] }).build();
        } catch (err) {
            this.error = err;
            throw err;
        }
        callback();
    });

    this.When(/^I build it$/, function(callback) {
        this.error = undefined;

        try {
            //console.log("UTIL: " + this.util);
            this.build = this.util.build();
        } catch (err) {
            this.error = err;
            //console.log(this.error);
        }
        callback();
    });

    this.When(/^I execute it$/, function() {
        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function catchResponse(data) {
            console.log("EXECUTE RESPONSE: " + JSON.stringify(data));
            _this.responseData = data;
            _this.error = undefined;
        }

        function catchErrorResponse(err) {
            //console.log("EXECUTE ERROR: " + JSON.stringify(err));
            _this.responseData = err;
            _this.error = err;
            //console.log(_this.error);
        }

        try {
            return this.build.execute().then(catchResponse).catch(catchErrorResponse);
        } catch (err) {
            //console.log(err);
            this.error = err;
            return;
        }
    });

    this.When(/^I execute with async paging it$/, function() {
        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;
        _this.data = [];

        function catchResponse(data) {
            //console.log("EXECUTE RESPONSE: " + JSON.stringify(data));
            _this.responseData = data;
            _this.error = undefined;
            //console.log(data);
        }

        function catchErrorResponse(err) {
            //console.log("EXECUTE ERROR: " + JSON.stringify(err));
            _this.responseData = err;
            _this.error = err;
            //console.log(_this.error);
        }

        function catchNotification(notification) {
            console.log("EXECUTE NOTIFICATION: " + JSON.stringify(notification));
            _this.error = undefined;
            _this.responseData = undefined;
            _this.data.push(notification);
        }

        try {
            return this.build.executeWithAsyncPaging(_this.util.resource).then(catchResponse, null, catchNotification).catch(catchErrorResponse);
        } catch (err) {
            console.log(err);
            this.error = err;
            return;
        }
    });


    this.When(/^I update periodicity$/, function() {
        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function catchResponse(data) {
            //console.log("EXECUTE RESPONSE: " + JSON.stringify(data));
            _this.responseData = data;
            _this.error = undefined;
        }

        function catchErrorResponse(err) {
            var cache = [];
            var error = JSON.stringify(err.data.errors, function(key, value) {
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
            //console.log("EXECUTE ERROR: " + error);
            _this.responseData = err;
            _this.error = err;
            //console.log(_this.error);
        }

        try {
            return this.build.updatePeriodicity().then(catchResponse).catch(catchErrorResponse);
        } catch (err) {
            //console.log(err);
            this.error = err;
            return;
        }
    });

    this.When(/^I create it$/, function() {

        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function catchResponse(data) {
            console.log("OK");
            console.log("data: " + JSON.stringify(data));
            _this.responseData = data;
            _this.location = _this.responseData.location;
            _this.error = undefined;
        }

        function catchErrorResponse(err) {
            console.log("NOK");
            console.log("ERROR: " + JSON.stringify(err));
            _this.responseData = err;
            if (err.errors) {
                _this.error = err.errors;
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
            this.error = err;
            console.log(err);
            return;
        }
    });


    this.When(/^I delete it$/, function() {

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

        try {
            //console.log("location:" + location);
            //console.log("this.location:" + _this.location);
            return _this.util.delete().then(catchResponse).catch(catchErrorResponse);

        } catch (err) {
            //console.log("asdlkfaslkdfjasl:" + err);
            _this.responseData = err;
            _this.error = err;
            //this.expect(this.error).to.be.undefined;
            return;
        }
    });

    this.When(/^I update it$/, function() {
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
            return _this.util.update().then(catchResponse).catch(catchErrorResponse);
        } catch (err) {
            this.error = err;
            console.log(err);
            return;
        }
    });

    this.When(/^I get filter fields$/, function() {
        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function catchResponse(data) {
            //console.log("EXECUTE RESPONSE: " + JSON.stringify(data));
            _this.responseData = data;
            _this.error = undefined;
        }

        function catchErrorResponse(err) {
            //console.log("EXECUTE ERROR: " + JSON.stringify(err));
            _this.responseData = err;
            _this.error = err;
            //console.log(_this.error);
        }

        try {
            return this.util.then(catchResponse).catch(catchErrorResponse);
        } catch (err) {
            //console.log(err);
            this.error = err;
            return;
        }
    });

    this.When(/^I clone it with...$/, function(table) {
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
            let args = [];

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
            this.error = err;
            //console.log(err);
            return;
        }

    });

};
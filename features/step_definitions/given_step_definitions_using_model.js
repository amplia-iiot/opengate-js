var OpengateAPI = require(process.cwd() + '/dist/opengate-api-npm');
var { Given } = require('cucumber');
var { JSDOM } = require("jsdom");
var fs = require('fs');
var assert = require('chai').assert;
global.window = new JSDOM().window;
global.FormData = window.FormData;
global.Blob = window.Blob;
global.File = window.File;
global.Uint8Array = window.Uint8Array;
global.FileReader = window.FileReader

Given(/^an ogapi "([^"]*)" util$/, function (utilName, callback) {
    this.util = this.utilsModel.util(utilName, this.ogapi);
    callback();
});

Given(/^an ogapi "([^"]*)" util with responseId$/, function (utilName, callback) {
    var id;

    if (this.responseData.location)
        id = this.responseData.location.substring(this.responseData.location.lastIndexOf("/") + 1);
    else if (this.responseData.data)
        id = this.responseData.data.id;
    else if (this.responseData[0])
        id = this.responseData[0].id;
    this.util = this.utilsModel.util(utilName, this.ogapi, id);
    callback();
});

Given(/^an ogapi "([^"]*)" util with "([^"]*)" and responseId$/, function (utilName, param1, callback) {
    var id;

    if (this.responseData.location)
        id = this.responseData.location.substring(this.responseData.location.lastIndexOf("/") + 1);
    else if (this.responseData.data)
        id = this.responseData.data.id;
    else if (this.responseData[0])
        id = this.responseData[0].id;
    this.util = this.utilsModel.util(utilName, this.ogapi, param1, id);
    callback();
});

Given(/^an ogapi "([^"]*)" util with...$/, function (utilName, table, callback) {
    this.error = undefined;
    try {
        var args = [utilName, this.ogapi];
        var data = table.hashes();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var param = data[i].param;
                try {
                    param = JSON.parse(param);
                } catch (err) {
                    console.error('ERROR: ', err)
                }
                if (!isNaN(param))
                    param = param * 1;

                if(param === 'from_location_previous_response'){
                    param = this.location.substring(this.location.lastIndexOf("/") + 1);
                }
                
                args.push(param);
            }
            this.util = this.utilsModel.util.apply(null, args);
        } else {
            this.error = "No params found";
        }
    } catch (err) {
        this.error = err;
        assert.ifError(this.error);
    }
    callback();
});


Given(/^the entity of type "([^"]*)" with "([^"]*)"$/, function (utilName, param) {
    // Write code here that turns the phrase above into concrete actions        
    var _this = this;
    this.util = this.utilsModel.util(utilName, this.ogapi, param);
    try {
        return this.util.then(function (builder) {
            _this.util = builder;
        }).catch(function (err) {

        });
    } catch (err) {
        return;
    }
});

Given(/^an ogapi "([^"]*)" util with "([^"]*)"$/, function (utilName, param, callback) {
    this.util = this.utilsModel.util(utilName, this.ogapi, param);
    callback();
});

Given(/^an ogapi "([^"]*)" util with "([^"]*)" and "([^"]*)"$/, function (utilName, param1, param2, callback) {
    if(param2 === 'from_location_previous_response'){
        param2 = this.location.substring(this.location.lastIndexOf("/") + 1);
    }
    this.util = this.utilsModel.util(utilName, this.ogapi, param1, param2);
    callback();
});

Given(/^an ogapi "([^"]*)" util as "([^"]*)"$/, function (utilName, utilAlias, callback) {
    var newUtil = this.utilsModel.util(utilName, this.ogapi);
    if (!this.extraUtils) this.extraUtils = {};
    this.extraUtils[utilAlias] = newUtil;
    callback();
});

Given(/^I want to (create|find|read|delete|update|search) (a|an) "([^"]*)"$/, function (model, dummyWildcard, entity, callback) {
    this.currentModel = model;
    this.currentEntity = entity;
    callback();
});

Given(/^I want to (create|find|read|delete|update|search) (a|an) "([^"]*)" and the start limit by "([^"]*)" and size limit by "([^"]*)"$/, function (model, dummyWildcard, entity, start, size, callback) {
    this.currentModel = model;
    this.currentEntity = entity;
    this.limit = {
        'size': size,
        'start': start
    };
    callback();
});

Given(/^the "([^"]*)" "([^"]*)" on util "([^"]*)"$/, function (setterName, setterValue, utilAlias, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.extraUtils[utilAlias][method](setterValue);
    } catch (err) {
        this.error = err;
    }
    callback();
});

Given(/^the "([^"]*)" '(.*)' json on util "([^"]*)"$/, function (setterName, setterValue, utilAlias, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.extraUtils[utilAlias][method](JSON.parse(setterValue));
    } catch (err) {
        this.error = err;
    }
    callback();
});

Given(/^the "([^"]*)" "([^"]*)" build on util "([^"]*)"$/, function (setterName, setterValue, utilAlias, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.extraUtils[utilAlias][method](this.extraUtils[setterValue].build());
    } catch (err) {
        this.error = err;
    }
    callback();
});

Given(/^the "([^"]*)" (\d+) on util "([^"]*)"$/, function (setterName, setterValue, utilAlias, callback) {
    this.error = undefined;
    try {
        setterValue = setterValue * 1;
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.extraUtils[utilAlias][method](setterValue);
    } catch (err) {
        this.error = err;
    }

    callback();
});

Given(/^the util "([^"]*)" on util "([^"]*)" into "([^"]*)"$/, function (fromUtilAlias, toUtilAlias, setterName, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.extraUtils[toUtilAlias][method](this.extraUtils[fromUtilAlias]);
    } catch (err) {
        this.error = err;
    }
    callback();
});

Given(/^the util "([^"]*)" into "([^"]*)"$/, function (utilAlias, setterName, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](this.extraUtils[utilAlias]);
    } catch (err) {
        this.error = err;
    }

    callback();
});


Given(/^the "([^"]*)" with util "([^"]*)" and with...$/, function (setterName, utilAlias, table, callback) {
    this.error = undefined;
    try {
        var args = [];
        var data = table.hashes();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var param = data[i].param;
                try {
                    param = JSON.parse(param);
                } catch (err) {
                    console.error('ERROR: ', err)
                }
                if (!isNaN(param))
                    param = param * 1;
                args.push(param);
            }
            args.push(this.extraUtils[utilAlias]);
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util = this.util[method].apply(this.util, args);
        } else {
            this.error = "No params found";
        }
    } catch (err) {
        this.error = err;
        assert.ifError(this.error);
    }
    callback();
});

Given(/^the "([^"]*)" with util build "([^"]*)" and with...$/, function (setterName, utilAlias, table, callback) {
    this.error = undefined;
    try {
        var args = [];
        var data = table.hashes();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var param = data[i].param;
                try {
                    param = JSON.parse(param);
                } catch (err) {
                    console.error('ERROR: ', err)
                }
                if (!isNaN(param))
                    param = param * 1;
                args.push(param);
            }
            args.push(this.extraUtils[utilAlias].build());
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util = this.util[method].apply(this.util, args);
        } else {
            this.error = "No params found";
        }
    } catch (err) {
        this.error = err;
        assert.ifError(this.error);
    }
    callback();
});

Given(/^the "([^"]*)" with null value$/, function (setterName, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](null);
    } catch (err) {
        this.error = err;
        assert.ifError(this.error);
    }

    callback();
});

Given(/^the "([^"]*)" with (true|false) value$/, function (setterName, booleanValue, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](booleanValue === 'false' ? false : true);
    } catch (err) {
        this.error = err;
        assert.ifError(this.error);
    }

    callback();
});

Given(/^the "([^"]*)" "([^"]*)"$/, function (setterName, setterValue, callback) {
    this.error = undefined;
    try {
        var value = setterValue
        if(setterValue === "from the saved variable"){
            value = this.values && this.values[setterName]
        }
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](value);
    } catch (err) {
        this.error = err;
        assert.ifError(this.error);
    }
    callback();
});

Given(/^the "([^"]*)" with file "([^"]*)"$/, function (setterName, fileName, callback) {
    // Write code here that turns the phrase above into concrete actions
    //var file = fs.readFileSync(__dirname + fileName);
    
    var file = fs.createReadStream(__dirname + fileName);

    if (!file) {
        callback(false, "not found");
    }

    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        //this.util[method](new Blob(file));
        this.util[method](file);
    } catch (err) {
        this.error = err;
        assert.ifError(this.error);
    }

    callback();
});


Given(/^the$/, function (table, callback) {
    var data = table.hashes();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            try {
                var setterName = data[i].method;
                var setterValue = data[i].value;
                var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
                this.util[method](JSON.parse(setterValue));
            } catch (err) {
                console.error('ERROR: ', err)
                this.error = err;
            }
        }
    }
    callback();
});

Given(/^the "([^"]*)" with...$/, function (setterName, table, callback) {
    this.error = undefined;
    try {
        var args = [];
        var data = table.hashes();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var param = data[i].param;
                try {
                    param = JSON.parse(param);
                } catch (err) {
                    console.error('ERROR: ', err)
                }
                if (!isNaN(param)) {
                    param = param * 1;
                }
                args.push(param);
            }
            
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            
            this.util = this.util[method].apply(this.util, args);
        } else {
            this.error = "No params found";
        }
    } catch (err) {
        this.error = err;
        console.error('ERROR: ', err)
    }
    callback();
});

Given(/^the "([^"]*)" on util "([^"]*)" with...$/, function (setterName, utilAlias, table, callback) {
    this.error = undefined;
    try {
        var args = [];
        var data = table.hashes();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var param = data[i].param;
                try {
                    param = JSON.parse(param);
                } catch (err) {
                    console.error('ERROR: ', err)
                }
                if (!isNaN(param))
                    param = param * 1;

                args.push(param);
            }
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util = this.extraUtils[utilAlias][method].apply(this.extraUtils[utilAlias], args);
        } else {
            this.error = "No params found";
        }
    } catch (err) {
        this.error = err;
        assert.ifError(this.error);
    }
    callback();
});

Given(/^the "([^"]*)" (\d+)$/, function (setterName, setterValue, callback) {
    this.error = undefined;
    try {
        setterValue = setterValue * 1;
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](setterValue);
    } catch (err) {
        this.error = err;
    }

    callback();
});

Given(/^the "([^"]*)" (\d+)\.(\d+)$/, function (setterName, setterValue1, setterValue2, callback) {
    this.error = undefined;
    try {
        /*jshint -W061 */
        setterValue = eval(setterValue1 + "." + setterValue2);
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](setterValue);
    } catch (err) {
        this.error = err;
    }

    callback();
});

Given(/^the "([^"]*)" \-(\d+)$/, function (setterName, setterValue, callback) {
    this.error = undefined;
    try {
        setterValue = setterValue * 1;
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](setterValue);
    } catch (err) {
        this.error = err;
    }

    callback();
});

Given(/^the "([^"]*)" (false|true)$/, function (setterName, setterValue, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](setterValue.toLowerCase() === 'true');
    } catch (err) {
        this.error = err;
    }

    callback();
});

Given(/^the "([^"]*)"$/, function (setterName, setterValue, callback) {
    this.error = undefined;
    try {
        setterValue = setterValue.raw()[0];
        var myArr = Array.prototype.slice.apply(setterValue);
        try {
            myArr = JSON.parse(myArr);
        } catch (errDumm) { }
        if (myArr.constructor !== Array) {
            myArr = [myArr];
        }
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](myArr);
    } catch (err) {
        console.error('ERROR: ', err)
        this.error = err;
    }

    callback();
});


Given(/^the "([^"]*)" "([^"]*)" and "([^"]*)"$/, function (setterName, setterValue1, setterValue2, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](setterValue1, setterValue2);
    } catch (err) {
        this.error = err;
    }

    callback();
});

Given(/^the "([^"]*)" with (\d+) and (\d+)$/, function (setterName, setterValue1, setterValue2, callback) {
    this.error = undefined;
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method](setterValue1, setterValue2);
    } catch (err) {
        this.error = err;
    }

    callback();
});

Given(/^I read the file from "([^"]*)" for provision tickets$/, function (fileName, callback) {
    // Write code here that turns the phrase above into concrete actions
    var _this = this;
    var file = fs.readFileSync(__dirname + fileName, 'utf8');
    if (_this.responseData) {
        var body = _this.responseData.body;
        var text = _this.responseData.data && _this.responseData.data.text;
        var id = [];
        if (body) {
            body.forEach(function (element) {
                var location = element.location;
                id.push(location.substring(location.lastIndexOf("/") + 1));
            });
        } else if (text) {
            var locations = text.split('\n');
            locations.shift();
            locations.pop();
            locations.forEach(function (location) {
                var _location = location.substring(location.lastIndexOf("/") + 1);
                _location = _location.substring(0, _location.indexOf(';'));
                id.push(_location);
            });
        }
        if (id.length === 0) {
            id = _this.id;
        } else {
            _this.id = id;
        }

        var extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        switch (extension) {
            case 'json':
                var fileJ = JSON.parse(file);
                fileJ.entities.forEach(function (ticket, index) {
                    var _current = {
                        "_current": {
                            "value": id[index]
                        }
                    };
                    //flattened
                    if (ticket["provision.administration.organization"]) {
                        ticket["provision.administration.identifier"] = {
                            "_value": _current
                        };
                        ticket["provision.ticket.identifier"] = {
                            "_value": _current
                        };
                    } else {
                        ticket.provision.administration.identifier = _current;
                        ticket.provision.ticket.identifier = _current;
                    }
                });
                file = JSON.stringify(fileJ);
                break;
            case 'csv':
                var fileCSV = file.split('\n');
                var newFile = '';
                fileCSV.forEach(function (line, index) {
                    var idIndex = index - 1;
                    if (index === 0) {
                        line = line.concat(';provision.ticket.identifier;provision.administration.identifier').replace(/[\n\r]+/g, '');
                        newFile = line + '\n';
                    } else if (id[idIndex]) {
                        line = line.concat(';' + id[idIndex] + ';' + id[idIndex]).replace(/[\n\r]+/g, '');
                        newFile += line + '\n';
                    }
                });
                file = newFile;
                break;
            default:
                break;
        }
    }
    if (file) {
        this.fileData = file;
        this.filePath = __dirname + fileName;
    } else {
        callback(false, "not found");
    }
    callback();
});

Given(/^I read the file from "([^"]*)"$/, function (fileName, callback) {
    // Write code here that turns the phrase above into concrete actions
    var file = fs.readFileSync(__dirname + fileName, 'utf8');

    if (file) {
        this.fileData = file;
        this.filePath = __dirname + fileName;
    } else {
        callback(false, "not found");
    }
    callback();

});


Given(/^I download and read the file from "([^"]*)"$/, function (fileName, callback) {
    // Write code here that turns the phrase above into concrete actions
    if (this.responseData.data) {
        let writeStream = fs.createWriteStream(__dirname + fileName);
        writeStream.write(this.responseData.data.body)
        writeStream.on('finish', () => {
        // for client-side
        /*var bytes = this.responseData.data.body.buffer
        var blob = new Blob([bytes], {type: "application/vnd.ms-excel"})
        var fileReader = new FileReader()
        fileReader.onload = function(event){
            console.log(JSON.stringify(fileReader.result));
        };
        fileReader.readAsText(blob)*/
            var file = fs.readFileSync(__dirname + fileName, 'utf8');
            if (file) {
                callback();
            } else {
                callback(false, "not found");
            }
        });
        writeStream.end();
        
    }
    

});

Given(/^an apikey user by "([^"]*)" and...$/, function (apikey, table, callback) {
    var config = {
        'apiKey': this.apikey || apikey,
        'url': this.test_url_north,
        'timeout': 60000,
        south: {
            'url': this.test_url_south
        }
    };

    var data = table.hashes();
    if(data.length >0){
        for (var i = 0; i < data.length; i ++){
            var d = data[i]
            try{
                config[d.key] = JSON.parse(d.value)
            }catch(error){
                config[d.key] = d.value
            }
        }
    }

    this.ogapi = new OpengateAPI(config);

    callback();
});

Given(/^an apikey user by "([^"]*)"$/, function (apikey, callback) {
    var config = {
        'apiKey': this.apikey || apikey,
        'url': this.test_url_north,
        'timeout': 60000,
        south: {
            'url': this.test_url_south
        }
    };

    this.ogapi = new OpengateAPI(config);

    callback();
});

Given (/^an email "([^"]*)" and password "([^"]*)" the user logs in$/, function(email, password) {
    const _this = this
    _this.error = undefined;
    _this.responseData = undefined;
    var config = {
        'url': this.test_url_north,
        'timeout': 60000,
        south: {
            'url': this.test_url_south
        }
    };

    this.ogapi = new OpengateAPI(config);
    const _email = this[email] || email
    const _password = this[password] || password
    return this.ogapi.usersBuilder().login(_email, _password).then(function(response){
        _this.responseData = response;
        _this.error = undefined;
        const _user = response.data.user
        _this.ogapi.Napi._options.jwt = _user.jwt
        console.log('JWT', _this.ogapi.Napi._options.jwt)
    }).catch((err)=>{
        console.log(err)
        console.error("ERROR, NO LOGIN!!!", err);
        _this.error = err;
        _this.responseData = err;
        throw err;
    })

    
})

Given(/^an jwt user by "([^"]*)"$/, function (jwt, callback) {
    var config = {
        'jwt': this.jwt || jwt,
        'url': this.test_url_north,
        'timeout': 60000,
        south: {
            'url': this.test_url_south
        }
    };

    this.ogapi = new OpengateAPI(config);

    callback();
});

Given('an user remove her authorization options', function (callback) {
    var config = {
        'url': this.test_url_north,
        'timeout': 60000,
        south: {
            'url': this.test_url_south
        }
    };

    this.ogapi = new OpengateAPI(config);

    callback();
});


Given(/^with mock "([^"]*)" for "([^"]*)"$/, function (mock, identifier, callback) {
    var config = {
        'apiKey': this.apikey,
        'url': this.test_url_north,
        'timeout': 60000,
        south: {
            'url': this.test_url_south
        }
    };
    var mocks = this.mocksModel[mock][identifier]
    config.mocks = mocks
    this.ogapi = new OpengateAPI(config);

    callback();
});

Given(/^I want to search into "([^"]*)"$/, function (setterName, callback) {
    var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
    this.util[method]();
    callback();
});

Given(/^I want to search into "([^"]*)" and throw error 'is not a function'$/, function (setterName, callback) {
    try {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method]();
        callback(false, "this.util[method] is a function");
    } catch (err) {
        callback();
    }
});

Given(/^I create (a|an) "([^"]*)" from current "([^"]*)" using previous file and params:$/, function (dummyWc1, setterName, currentEntity, table) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse1 (data) {
        //console.log("catchResponse", data);
        _this.responseData = data;
        _this.location = _this.responseData.location;
        _this.error = undefined;
    }

    function catchErrorResponse1 (err) {
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

    var model = "create";
    var element;

    try {
        var method = _this.model_match(_this.currentModel).setters(currentEntity)[setterName];
        element = _this.util[method](_this.uploadProgress);

        var data = table.hashes();

        for (var i = 0; i < data.length; i++) {
            // se valida si se inyectan validators
            var submethod = _this.model_match(model).setters(setterName)[data[i].field];

            element = element[submethod](data[i].content);
        }

        return element.create(_this.filePath).then(catchResponse1).catch(catchErrorResponse1);
    } catch (err) {
        console.error('ERROR: ', err);
        _this.error = err;
    }
});

Given(/^I (create|delete) (a|an) "([^"]*)" from current "([^"]*)" using params:$/, function (selectedAction, dummyWc1, setterName, currentEntity, table) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function catchResponse (data) {
        //console.log("catchResponse", data);
        _this.responseData = data;
        _this.location = _this.responseData.location;
        _this.error = undefined;
    }

    function catchErrorResponse (err) {
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

    var model = "create";
    var element;

    try {
        var method = _this.model_match(_this.currentModel).setters(currentEntity)[setterName];
        element = _this.util[method](_this.uploadProgress);

        var data = table.hashes();


        for (var i = 0; i < data.length; i++) {
            // se valida si se inyectan validators
            var submethod = _this.model_match(model).setters(setterName)[data[i].field];

            element = element[submethod](data[i].content);
        }

        return element[selectedAction]().then(catchResponse).catch(catchErrorResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        _this.error = err;
    }
});
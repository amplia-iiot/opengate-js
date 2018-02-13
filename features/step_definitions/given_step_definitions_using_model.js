var OpengateAPI = require(process.cwd() + '/dist/opengate-api-npm');
var jsdom = require("jsdom");
var fs = require('fs');
var assert = require('chai').assert;
global.window = jsdom.jsdom().defaultView;
global.FormData = window.FormData;
global.Blob = window.Blob;

module.exports = function() {
    this.Given(/^an ogapi "([^"]*)" util$/, function(utilName, callback) {
        this.util = this.utilsModel.util(utilName, this.ogapi);
        callback();
    });

    this.Given(/^an ogapi "([^"]*)" util with responseId$/, function(utilName, callback) {
        var id;

        if (this.responseData.location)
            id = this.responseData.location.substring(this.responseData.location.lastIndexOf("/") + 1);
        else if (this.responseData.data)
            id = this.responseData.data.id;
        else if (this.responseData[0])
            id = this.responseData[0].id;
        //console.log("ID_: " + JSON.stringify(id));
        this.util = this.utilsModel.util(utilName, this.ogapi, id);
        callback();
    });

    this.Given(/^an ogapi "([^"]*)" util with...$/, function(utilName, table, callback) {
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
                        //console.info("No json");
                    }
                    if (!isNaN(param))
                        param = param * 1;
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


    this.Given(/^the entity of type "([^"]*)" with "([^"]*)"$/, function(utilName, param) {
        // Write code here that turns the phrase above into concrete actions        
        var _this = this;
        this.util = this.utilsModel.util(utilName, this.ogapi, param);
        try {
            return this.util.then(function(builder) {
                _this.util = builder;
            }).catch(function(err) {

            });
        } catch (err) {
            return;
        }
    });

    this.Given(/^an ogapi "([^"]*)" util with "([^"]*)"$/, function(utilName, param, callback) {
        this.util = this.utilsModel.util(utilName, this.ogapi, param);
        callback();
    });

    this.Given(/^an ogapi "([^"]*)" util as "([^"]*)"$/, function(utilName, utilAlias, callback) {
        var newUtil = this.utilsModel.util(utilName, this.ogapi);
        if (!this.extraUtils) this.extraUtils = {};
        this.extraUtils[utilAlias] = newUtil;
        callback();
    });

    this.Given(/^I want to (create|find|read|delete|update|search) (a|an) "([^"]*)"$/, function(model, dummyWildcard, entity, callback) {
        this.currentModel = model;
        this.currentEntity = entity;
        callback();
    });

    this.Given(/^I want to (create|find|read|delete|update|search) (a|an) "([^"]*)" and the start limit by "([^"]*)" and size limit by "([^"]*)"$/, function(model, dummyWildcard, entity, start, size, callback) {
        this.currentModel = model;
        this.currentEntity = entity;
        this.limit = { 'size': size, 'start': start };
        callback();
    });

    this.Given(/^the "([^"]*)" "([^"]*)" on util "([^"]*)"$/, function(setterName, setterValue, utilAlias, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.extraUtils[utilAlias][method](setterValue);
        } catch (err) {
            this.error = err;
        }
        callback();
    });

    this.Given(/^the "([^"]*)" '(.*)' json on util "([^"]*)"$/, function(setterName, setterValue, utilAlias, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.extraUtils[utilAlias][method](JSON.parse(setterValue));
        } catch (err) {
            this.error = err;
        }
        callback();
    });

    this.Given(/^the "([^"]*)" "([^"]*)" build on util "([^"]*)"$/, function(setterName, setterValue, utilAlias, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.extraUtils[utilAlias][method](this.extraUtils[setterValue].build());
        } catch (err) {
            this.error = err;
        }
        callback();
    });

    this.Given(/^the "([^"]*)" (\d+) on util "([^"]*)"$/, function(setterName, setterValue, utilAlias, callback) {
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

    this.Given(/^the util "([^"]*)" on util "([^"]*)" into "([^"]*)"$/, function(fromUtilAlias, toUtilAlias, setterName, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.extraUtils[toUtilAlias][method](this.extraUtils[fromUtilAlias]);
        } catch (err) {
            this.error = err;
        }
        callback();
    });

    this.Given(/^the util "([^"]*)" into "([^"]*)"$/, function(utilAlias, setterName, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util[method](this.extraUtils[utilAlias]);
        } catch (err) {
            this.error = err;
        }

        callback();
    });


    this.Given(/^the "([^"]*)" with util "([^"]*)" and with...$/, function(setterName, utilAlias, table, callback) {
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
                        //console.info("No json");
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

    this.Given(/^the "([^"]*)" with util build "([^"]*)" and with...$/, function(setterName, utilAlias, table, callback) {
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
                        //console.info("No json");
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

    this.Given(/^the "([^"]*)" "([^"]*)"$/, function(setterName, setterValue, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util[method](setterValue);
        } catch (err) {
            this.error = err;
            //console.log(err);
            //assert.ifError(this.error);
        }

        callback();
    });

    this.Given(/^the$/, function(table, callback) {
        var data = table.hashes();
        // this.currentModel = model;
        //this.currentEntity = entity;
        //console.log(this.currentEntity);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                try {
                    var setterName = data[i].method;
                    var setterValue = data[i].value;
                    //console.log(setterName);
                    //console.log(JSON.parse(setterValue));
                    var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
                    this.util[method](JSON.parse(setterValue));
                } catch (err) {
                    this.error = err;
                    //console.log(err);
                }
            }
        }
        callback();
    });

    this.Given(/^the "([^"]*)" with...$/, function(setterName, table, callback) {
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
                        //console.info("No json")M
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
            //assert.ifError(this.error);
        }
        callback();
    });

    this.Given(/^the "([^"]*)" on util "([^"]*)" with...$/, function(setterName, utilAlias, table, callback) {
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
                        //console.info("No json")M
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

    this.Given(/^the "([^"]*)" (\d+)$/, function(setterName, setterValue, callback) {
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

    this.Given(/^the "([^"]*)" (\d+)\.(\d+)$/, function(setterName, setterValue1, setterValue2, callback) {
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

    this.Given(/^the "([^"]*)" \-(\d+)$/, function(setterName, setterValue, callback) {
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

    this.Given(/^the "([^"]*)" (false|true)$/, function(setterName, setterValue, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util[method](setterValue.toLowerCase() === 'true');
        } catch (err) {
            this.error = err;
        }

        callback();
    });

    this.Given(/^the "([^"]*)"$/, function(setterName, setterValue, callback) {
        this.error = undefined;
        //console.log(setterName);
        try {
            setterValue = setterValue.raw()[0];
            var myArr = Array.prototype.slice.apply(setterValue);
            try {
                myArr = JSON.parse(myArr);
            } catch (errDumm) {}
            if (myArr.constructor !== Array) {
                myArr = [myArr];
            }
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util[method](myArr);
        } catch (err) {
            this.error = err;
        }

        callback();
    });


    this.Given(/^the "([^"]*)" "([^"]*)" and "([^"]*)"$/, function(setterName, setterValue1, setterValue2, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util[method](setterValue1, setterValue2);
        } catch (err) {
            this.error = err;
        }

        callback();
    });

    this.Given(/^the "([^"]*)" with (\d+) and (\d+)$/, function(setterName, setterValue1, setterValue2, callback) {
        this.error = undefined;
        try {
            var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
            this.util[method](setterValue1, setterValue2);
        } catch (err) {
            this.error = err;
        }

        callback();
    });

    this.Given(/^I read the file from "([^"]*)"$/, function(fileName, callback) {
        // Write code here that turns the phrase above into concrete actions
        var file = fs.readFileSync(__dirname + fileName, 'utf8');

        //var file = fs.createReadStream(__dirname + fileName);
        if (file) {
            this.fileData = file;
            this.filePath = __dirname + fileName;
        } else {
            callback(false, "not found");
        }
        callback();

    });

    this.Given(/^an apikey user by "([^"]*)"$/, function(apikey, callback) {
        var config = {
            'apiKey': this.test_api_key || apikey,
            'url': this.test_url_north,
            'timeout': 20000,
            south: {
                'url': this.test_url_south
            }
        };

        this.ogapi = new OpengateAPI(config);

        callback();
    });

    this.Given(/^I want to search into "([^"]*)"$/, function(setterName, callback) {
        var method = this.model_match(this.currentModel).setters(this.currentEntity)[setterName];
        this.util[method]();
        callback();
    });


};
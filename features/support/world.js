// features/support/world.js
var chai, chaiAsPromised, OpengateAPI, utilsModel, findModel, findCreateModel, findDeleteModel, searchingModel;

//var formData = require('form-data');
chai = require('chai');
chai_as_promised = require('chai-as-promised');
OpengateAPI = require(process.cwd() + '/dist/opengate-api-npm');
utilsModel = require('./utils_model');
findModel = require('./find_model');
findCreateModel = require('./create_provision_model');
findDeleteModel = require('./delete_provision_model');
searchingModel = require('./searching_model');

var APIKEY = 'require-real-apikey';

function World() {
    this.test_url_north = 'REQUIRE-URL_NORT';
    this.test_url_south = 'REQUIRE-URL_SOUTH';
    chai.use(chai_as_promised);
    this.expect = chai.expect;

    // Own dependencies with the model
    //this.formData = formData;
    this.utilsModel = utilsModel;
    this.findModel = findModel;
    this.findCreateModel = findCreateModel;
    this.findDeleteModel = findDeleteModel;
    this.searchingModel = searchingModel;

    this.model_match = function(model) {
        return {
            'create': this.findCreateModel,
            'update': this.findCreateModel,
            'delete': this.findDeleteModel,
            'read': this.findModel,
            'find': this.findModel,
            'search': this.searchingModel
        }[model];
    };

    var _this = this;

    _this.___lastPercent = 0;

    this.uploadProgress = function(arg) {
        if (arg.loaded && arg.total) {
            _this.___lastPercent = (arg.loaded * 100) / arg.total;
        }
    };
}

module.exports = function() {
    this.World = World;
};
// features/support/world.js
var chai, OpengateAPI, utilsModel, findModel, findCreateModel, findDeleteModel, searchingModel;

//var formData = require('form-data');
var {setWorldConstructor} = require('cucumber');
chai = require('chai');
chai_as_promised = require('chai-as-promised');
OpengateAPI = require(process.cwd() + '/dist/opengate-api-npm');
utilsModel = require('./utils_model');
findModel = require('./find_model');
findCreateModel = require('./create_provision_model');
findDeleteModel = require('./delete_provision_model'); 
searchingModel = require('./searching_model');
mocksModel = require('./mocks/mockModel')

function World() {
    this.test_url_north = process.env.API_NORTH_INTERNAL || 'API_NORTH_INTERNAL';
    this.test_url_south = process.env.API_SOUTH_INTERNAL || 'API_SOUTH_INTERNAL';
    this.apikey = process.env.API_KEY || 'API_KEY';
    this.guerrillaApi = 'https://api.guerrillamail.com/'
    this.guerillaPath = 'ajax.php'
    chai.use(chai_as_promised);
    this.expect = chai.expect;
    // Own dependencies with the model
    this.utilsModel = utilsModel;
    this.findModel = findModel;
    this.findCreateModel = findCreateModel;
    this.findDeleteModel = findDeleteModel;
    this.searchingModel = searchingModel;
    this.mocksModel = mocksModel;

    this.model_match = function (model) {
        return {
            'create': this.findCreateModel,
            'update': this.findCreateModel,
            'delete': this.findDeleteModel,
            'deleteAll': this.findDeleteModel,
            'read': this.findModel,
            'find': this.findModel,
            'search': this.searchingModel
        } [model];
    };

    var _this = this;

    _this.___lastPercent = 0;

    this.uploadProgress = function (arg) {
        if (arg.loaded && arg.total) {
            _this.___lastPercent = (arg.loaded * 100) / arg.total;
        }
    };
}

setWorldConstructor(World);

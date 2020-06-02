'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _BaseParameterBuilderWithParent = require('./BaseParameterBuilderWithParent');

var _BaseParameterBuilderWithParent2 = _interopRequireDefault(_BaseParameterBuilderWithParent);

// import jsf from 'json-schema-faker';

// jsf.option('useDefaultValue', true);
// jsf.option('alwaysFakeOptionals', true);

/**
* This class generates all operation parameters builders by "parameters" attribute that there is into config operation json
*/

var ParameterBuilderFactory =
/**
* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
* @param {!object} parameters - this is configuration about parameter operation.
* @param {!BaseOperationBuilder} parent - this is a instance of BaseOperationBuilder
*/
function ParameterBuilderFactory(ogapi, parameters, parent) {
	_classCallCheck(this, ParameterBuilderFactory);

	var _ogapi = ogapi;
	var _parent = parent;

	// const paramsExample = jsf.generate(parameters);

	// for(let i in paramsExample){
	// 	// let param = paramsExample[i];
	// 	// this[createBuilderName(param)] = function (value) {
	// 	// 	return new BaseParameterBuilderWithParent(_ogapi, param, _parent);
	// 	// };
	// 	console.log('parameter-' + i)
	// }

	// Ejemplo, name = "profile" => return "newProfileParamBuilder"
	function createBuilderName(name) {
		var firstChar = name[0].toUpperCase();
		return "new" + firstChar + name.slice(1) + "ParamBuilder";
	}
};

exports['default'] = ParameterBuilderFactory;
module.exports = exports['default'];
//# sourceMappingURL=ParameterBuilderFactory.js.map

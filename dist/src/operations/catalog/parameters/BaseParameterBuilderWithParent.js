'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

/**
* This class generate a builder by a dynamic content about specific parameter to an operation.
*/

var BaseParameterBuilderWithParent = (function () {
	/**
 * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
 * @param {!object} config - this is configuration about parameter operation.
 * @param {!BaseOperationBuilder} parent - this is a instance of BaseOperationBuilder
 */

	function BaseParameterBuilderWithParent(ogapi, config, parent) {
		_classCallCheck(this, BaseParameterBuilderWithParent);

		this._parent = parent;
		this._build = config.type === "array" ? [] : undefined;
		this._config = config;
		this[createSetterNameMethod(config)] = this._appendParameterValue;
		// Ejemplo config.type=array and config.name = apn, return "addApn"
		// Ejemplo config.type=anyString and config.name = apn, return "withApn"
		function createSetterNameMethod(config) {
			var prefixOptions = (function (config) {
				var prefix = undefined;
				switch (config.type) {
					case 'array':
						prefix = 'add';
						break;
					default:
						prefix = 'with';
						break;
				}
				return prefix;
			})(config);

			return prefixOptions + config.name[0].toUpperCase() + config.name.slice(1);
		}
	}

	_createClass(BaseParameterBuilderWithParent, [{
		key: '_appendParameterValue',
		value: function _appendParameterValue(value) {
			if (!this._isTypeValueAllow(value)) {
				console.warn("Parameter <'" + this._config.name + "'> not allow type of value setted <'" + typeof value + "'>. Only are allowed this type: " + this._getType());
				return this;
			}
			if (!this._isAllowValue(value)) {
				console.warn("Parameter <'" + this._config.name + "'> not allow value setted <'" + value + "'>. Only are allowed this configuration:" + JSON.stringify(this._config.attributes));
				return this;
			}
			if (this._config.type === "array") {
				this._build.push(value);
			} else {
				this._build = value;
			}
			return this;
		}
	}, {
		key: '_isString',
		value: function _isString() {
			return this._config.type === "string" || this._config.subtype === "string";
		}
	}, {
		key: '_isObject',
		value: function _isObject() {
			return this._config.type === "object" || this._config.subtype === "object";
		}
	}, {
		key: '_isNumber',
		value: function _isNumber() {
			return this._config.type === "number" || this._config.subtype === "number";
		}
	}, {
		key: '_isArray',
		value: function _isArray() {
			return this._config.type === "array" || this._config.subtype === "array";
		}
	}, {
		key: '_isBoolean',
		value: function _isBoolean() {
			return this._config.type === "boolean" || this._config.subtype === "boolean";
		}
	}, {
		key: '_isDate',
		value: function _isDate() {
			return this._config.type === "date" || this._config.subtype === "date";
		}
	}, {
		key: '_isTime',
		value: function _isTime() {
			return this._config.type === "time" || this._config.subtype === "time";
		}
	}, {
		key: '_getType',
		value: function _getType() {
			if (this._isArray()) {
				return "array";
			}
			if (this._isString() || this._isDate() || this._isTime()) {
				return "string";
			}
			if (this._isObject()) {
				return "object";
			}
			if (this._isNumber()) {
				return "number";
			}
			if (this._isBoolean()) {
				return "boolean";
			}
			return "unknown";
		}
	}, {
		key: '_isTypeValueAllow',
		value: function _isTypeValueAllow(value) {
			var isAllowed = true;
			var type = typeof value;
			if ((this._isString() || this._isTime() || this._isDate()) && type !== "string") {
				isAllowed = false;
			}
			if (this._isNumber() && type !== "number") {
				isAllowed = false;
			}
			if (this._isObject() && type !== "object") {
				isAllowed = false;
			}
			if (this._isBoolean() && type !== "boolean") {
				isAllowed = false;
			}
			return isAllowed;
		}
	}, {
		key: '_isAllowValue',
		value: function _isAllowValue(value) {
			if (typeof this._config.attributes !== "undefined") {
				var attrs = this._config.attributes;
				if (typeof attrs.list !== "undefined") {
					return typeof attrs.list.find(function (item) {
						return item == this;
					}, value) !== "undefined";
				}
				/*if (typeof attrs.validator !== "undefined"){
    	let format = attrs.validator;
    	let isValid = moment(value,format,true).format()
    	if (isValid === "Invalid date"){
    		return false;
    	}
    }*/
			}
			return true;
		}

		/**
  * This has all knowledge to make a object.
  * @return {object}
  */
	}, {
		key: 'build',
		value: function build() {
			if (this._config.required && (typeof this._build === "undefined" || this._build.length === 0)) throw new Error("Parameter <'" + this._config.name + "'> is required and their value is not defined");
			var parameter = {
				name: this._config.name,
				value: _defineProperty({}, this._getType(), this._build)
			};
			if (typeof this._build === "undefined" || this._build.length === 0) {
				parameter = undefined;
			}
			return parameter;
		}

		/**
  * This method will invoke build and then it will append the parameter to operationBuilder with the correct way
  * @return {BaseOperationBuilder}
  */
	}, {
		key: 'buildAndAppend',
		value: function buildAndAppend() {
			var paramObject = this.build();
			if (typeof paramObject !== "undefined") {
				var index = this._parent._build.parameters.findIndex(function (param) {
					return param.name == this.name;
				}, paramObject);
				if (index === -1) {
					this._parent._build.parameters.push(paramObject);
				} else {
					this._parent._build.parameters[index] = paramObject;
				}
			}
			return this._parent;
		}
	}]);

	return BaseParameterBuilderWithParent;
})();

exports['default'] = BaseParameterBuilderWithParent;
module.exports = exports['default'];
//# sourceMappingURL=BaseParameterBuilderWithParent.js.map

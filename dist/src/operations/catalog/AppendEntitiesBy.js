'use strict';

/**
* Util used into BaseOperationBuilder to append entities the three different ways. By filter, By tags, By entityList
*/
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppendEntitiesBy = (function () {
	/**
 * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
 * @param {!BaseOperationBuilder} parent - this is a instance of BaseOperationBuilder
 */

	function AppendEntitiesBy(ogapi, parent) {
		_classCallCheck(this, AppendEntitiesBy);

		this._ogapi = ogapi;
		this._parent = parent;
	}

	/**
 * Append filter to operation target
 * @param {!FilterBuilder} filter 
 * @param {!string} resourceType 
 * @return {BaseOperationBuilder}
 */

	_createClass(AppendEntitiesBy, [{
		key: "filter",
		value: function filter(_filter, resourceType) {
			var resourceTypeFound = this._parent._config.applicableTo.find(function (type) {
				return type == this;
			}, resourceType);
			if (typeof resourceTypeFound === "undefined") {
				throw new Error("Entity type <'" + resourceType + "'> not allowed to operation <'" + this._parent._config.name + "'>. Entity types allowed <'" + JSON.stringify(this._parent._config.applicableTo) + "'>");
			}
			this._parent._resourceTypeWhenFilter = resourceType;
			if (typeof this._parent._build.target !== "undefined") console.warn("An Operation only allow one kind of way to append entities. " + "Filter | Tag | List of entities. Now Filter will remove the last way appended .");
			if (typeof _filter._filterTemplate !== "undefined") {
				this._parent._build.target = {
					filter: _filter._filterTemplate.filter
				};
			} else {
				this._parent._build.target = {
					filter: _filter
				};
			}
			return this._parent;
		}

		/**
  * Append entity list to operation target
  * @param {!EntityListBuilder} entities 
  * @return {BaseOperationBuilder}
  */
	}, {
		key: "list",
		value: function list(entities) {
			var _this = this;

			if (typeof entities === "undefined" || entities.constructor !== Array) {
				throw new Error("Parameter entities must be typeof Array");
			}
			if (typeof this._parent._build.target !== "undefined") console.warn("An Operation only allow one kind of way to append entities. " + "Filter | Tag | List of entities. Now  List of entities will remove the last way appended .");

			this._parent._build.target = {
				append: {}
			};

			entities.forEach(function (entity) {
				if (entity.constructor === String) {
					if (!_this._parent._build.target.append.entities) {
						_this._parent._build.target.append.entities = [];
					}
					_this._parent._build.target.append.entities.push(entity);
				} else {
					if (entity.id && entity.parameters) {
						if (!_this._parent._build.target.append.entitiesWithParameters) {
							_this._parent._build.target.append.entitiesWithParameters = [];
						}
						_this._parent._build.target.append.entitiesWithParameters.push(entity);
					} else {
						throw new Error("Entity parameters must include id and parameters: " + JSON.stringify(entity));
					}
				}
			});
			return this._parent;
		}

		/**
  * Set tag to operation target
  * @param {!string} tag 
  * @return {BaseOperationBuilder}
  */
	}, {
		key: "tag",
		value: function tag(_tag) {
			if (typeof this._parent._build.target !== "undefined") console.warn("An Operation only allow one kind of way to append entities. " + "Filter | Tag | List of entities. Now Tag will remove the last way appended .");
			this._parent._build.target = {
				append: {
					tags: [_tag]
				}
			};
			return this._parent;
		}
	}]);

	return AppendEntitiesBy;
})();

exports["default"] = AppendEntitiesBy;
module.exports = exports["default"];
//# sourceMappingURL=AppendEntitiesBy.js.map

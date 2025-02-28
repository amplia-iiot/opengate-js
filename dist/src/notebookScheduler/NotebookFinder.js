'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GenericFinder2 = require('../GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

/**
 *   This class allow make get request to planner resource into Opengate North API.
 */

var NotebookFinder = (function (_GenericFinder) {
    _inherits(NotebookFinder, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function NotebookFinder(ogapi) {
        _classCallCheck(this, NotebookFinder);

        _get(Object.getPrototypeOf(NotebookFinder.prototype), 'constructor', this).call(this, ogapi, 'notebooks', 'list', 'Notebook not found', 'planner');
    }

    /**
    * Download a complete list of notebooks for the user. This execute a GET http method
    * @test
    *   ogapi.newNotebooksFinder().findAll().then().catch();
    * @return {Promise} 
    */

    _createClass(NotebookFinder, [{
        key: 'findAll',
        value: function findAll() {
            return this._execute();
        }

        /**
         * @return {String} This returns a string with the URL of the request.
         * @private
         */
    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl;
        }
    }]);

    return NotebookFinder;
})(_GenericFinder3['default']);

exports['default'] = NotebookFinder;
module.exports = exports['default'];
//# sourceMappingURL=NotebookFinder.js.map

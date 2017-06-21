'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Datapoint = require('./Datapoint');

var _Datapoint2 = _interopRequireDefault(_Datapoint);

/**
 * This is a base object that allows the user to create a Datastream.
 */

var Datastream = (function () {
    function Datastream() {
        _classCallCheck(this, Datastream);

        this._id = undefined;
        this._feed = undefined;
        this._datapoints = [];
    }

    /**
     * Set the id attribute
     * @param {string} id - required field
     * @return {Datastream}
     */

    _createClass(Datastream, [{
        key: 'withId',
        value: function withId(id) {
            if (typeof id !== 'string' || id.length === 0) throw new Error('Parameter id must be a string and cannot be empty ');
            this._id = id;
            return this;
        }

        /**
         * Set the feed attribute
         * @param {string} feed - optionals field
         * @return {Datastream}
         */
    }, {
        key: 'withFeed',
        value: function withFeed(feed) {
            if (typeof feed !== 'string' || feed.length === 0) throw new Error('Parameter feed must be a string and cannot be empty  ');
            this._feed = feed;
            return this;
        }

        /**
         * Add a datapoint in datapoints
         * @param {Datapoint} datapoint - required field
         * @return {Datastream}
         */
    }, {
        key: 'withDatapoint',
        value: function withDatapoint(datapoint) {
<<<<<<< HEAD
            if (datapoint.constructor.name !== "Datapoint") throw new Error('Parameter datapoint must be a Datapoint type');
=======
            if (!(datapoint instanceof _Datapoint2['default'])) throw new Error('Parameter datapoint must be a Datapoint type');
>>>>>>> release_branch
            this._datapoints.push(datapoint.composeElement());
            return this;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {
            if (this._id === undefined || this._id.length === 0 || this._datapoints.length === 0) {
                throw new Error('Parameter id must be defined and dapoint list must have at least one element');
            }
            var datastream = {
                'id': this._id,
                'feed': this._feed,
                'datapoints': this._datapoints

            };
            return datastream;
        }
    }]);

    return Datastream;
})();

exports['default'] = Datastream;
module.exports = exports['default'];
//# sourceMappingURL=Datastreams.js.map

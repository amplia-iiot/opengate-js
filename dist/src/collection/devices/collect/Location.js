'use strict';

/**
 * This is a base object that allows the user to create a Datapoint.
 */
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Location = (function () {
    function Location() {
        _classCallCheck(this, Location);

        this._timestamp = undefined;
        this._latitude = undefined;
        this._longitude = undefined;
    }

    /**
    * Set the date attribute
    * @param {string} date - optionals field
    * @return {Location}
    */

    _createClass(Location, [{
        key: 'withDateLocation',
        value: function withDateLocation(date) {
            if (typeof date !== 'string' || date.length === 0) throw new Error('Parameter date must be String type and cannot be empty');
            if (this._location === undefined) {
                this._location = {};
            }
            this._location.date = date;
            return this;
        }

        /**
         * Set the latitude attribute
         * @param {number} latitude - optionals field
         * @return {Location}
         */
    }, {
        key: 'withLatitude',
        value: function withLatitude(latitude) {
            if (typeof latitude !== 'number' || latitude.length === 0) throw new Error('Parameter latitude must be number type and cannot be empty');
            if (this._location === undefined) {
                this._location = {};
            }
            this._location.latitude = latitude;
            return this;
        }

        /**
         * Set the longitude attribute
         * @param {number} longitude - optionals field
         * @return {Location}
         */
    }, {
        key: 'withLongitude',
        value: function withLongitude(longitude) {
            if (typeof longitude !== 'number' || longitude.length === 0) throw new Error('Parameter longitude must be number type and cannot be empty');
            if (this._location === undefined) {
                this._location = {};
            }
            this._location.longitude = longitude;
            return this;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {
            if (this._longitude === undefined && this._latitude === undefined) {
                throw new Error('The parameters latitude and longitude are required in location element');
            }
            var location = {
                "timestamp": this._date,
                "coordinates": {
                    "latitude": this._latitude,
                    "longitude": this._longitude
                }
            };
            return location;
        }
    }]);

    return Location;
})();

exports['default'] = Location;
module.exports = exports['default'];
//# sourceMappingURL=Location.js.map

'use strict';

module.exports = {
    /* fields validations */
    _checkType: function _checkType(type, TYPE_ENUM) {
        var not_found = [];
        var found = TYPE_ENUM.find(function (type) {
            return type == this;
        }, type);

        if (typeof found === 'undefined') {
            not_found.push(type);
        }
        if (not_found.length !== 0) {
            throw new Error({ message: 'OGAPI_NOT_ALLOWED_PARAMETER', parameter: JSON.stringify(not_found), allowed: JSON.stringify(TYPE_ENUM) });
        }
        return type;
    },
    _checkISODateTime: function _checkISODateTime(parameter, name) {
        if (typeof parameter !== 'string' || new RegExp("(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))").test(parameter)) {
            throw new Error([{ message: 'OGAPI_ISO_DATE_TIME_PARAMETER', parameter: name }, { message: 'OGAPI_STRING_PATTERN', parameter: name }]);
        }
        try {
            new Date(parameter);
        } catch (err) {
            throw new Error([{ message: 'OGAPI_ISO_DATE_TIME_PARAMETER', parameter: name }, { message: 'OGAPI_STRING_PATTERN', parameter: name }]);
        }
    },
    _checkStringAndPattern: function _checkStringAndPattern(parameter, pattern, name) {
        if (typeof parameter !== 'string' || !new RegExp(pattern).test(parameter)) {
            throw new Error([{ message: 'OGAPI_STRING_PARAMETER', parameter: name }, { message: 'OGAPI_STRING_PATTERN', parameter: name, pattern: pattern }]);
        }
    },
    _checkStringAndLength: function _checkStringAndLength(parameter, length, name) {
        if (typeof parameter !== 'string' || parameter.length > length) {
            throw new Error([{ message: 'OGAPI_STRING_PARAMETER', parameter: name }, { message: 'OGAPI_MAX_LENGTH', parameter: length }]);
        }
    },
    _checkString: function _checkString(parameter, name) {
        if (typeof parameter !== 'string') {
            throw new Error([{ message: 'OGAPI_STRING_PARAMETER', parameter: name }]);
        }
    },
    _checkNumber: function _checkNumber(parameter, name) {
        if (typeof parameter !== 'number') {
            throw new Error([{ message: 'OGAPI_NUMBER_PARAMETER', parameter: name }]);
        }
    },
    _checkArray: function _checkArray(parameter, name) {
        if (!Array.isArray(parameter) || parameter.length === 0) {
            throw new Error({ message: 'OGAPI_ARRAY_PARAMETER', parameter: name });
        }
    },
    _checkObject: function _checkObject(parameter, name) {
        if (typeof parameter !== 'object') {
            throw new Error({ message: 'OGAPI_OBJECT_PARAMETER', parameter: name });
        }
    },
    _checkBoolean: function _checkBoolean(parameter, name) {
        if (typeof parameter !== 'boolean') {
            throw new Error({ message: 'OGAPI_BOOLEAN_PARAMETER', parameter: name });
        }
    },
    _checkURL: function _checkURL(parameter, name) {
        if (typeof parameter !== 'string') {
            throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: name });
        }

        try {
            var url = new URL(parameter);

            if (!['http:', 'https:'].includes(url.protocol)) {
                throw new Error({ message: 'OGAPI_URL_PARAMETER', parameter: name });
            }
        } catch (urlerr) {
            throw new Error({ message: 'OGAPI_URL_PARAMETER', parameter: name });
        }
    }
};
//# sourceMappingURL=check_types.js.map

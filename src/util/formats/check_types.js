/**
 * Builds the error a check throws.
 *
 * These checks used to hand Error an object, or an array of them. Error stringifies whatever it is
 * given, so the thrown message read "[object Object]" and every code and parameter name was lost.
 * The first reason's code now lands in message, its fields land on the error, and when a check
 * offers several reasons the whole list stays reachable as error.reasons.
 *
 * @param {!(object|Array<object>)} reasons - one reason, or the list of them, each with a message.
 * @return {Error} the error, ready to be thrown.
 */
function checkError(reasons) {
    const list = Array.isArray(reasons) ? reasons : [reasons];
    const error = Object.assign(new Error(list[0].message), list[0]);
    if (list.length > 1) {
        error.reasons = list;
    }
    return error;
}

module.exports = {
    /* fields validations */
    _checkType: function(type, TYPE_ENUM) {
        let not_found = [];
        let found = TYPE_ENUM.find(function(type) {
            return type == this;
        }, type);

        if (typeof found === 'undefined') {
            not_found.push(type);
        }
        if (not_found.length !== 0) {
            throw checkError({ message: 'OGAPI_NOT_ALLOWED_PARAMETER', parameter: JSON.stringify(not_found), allowed: JSON.stringify(TYPE_ENUM) });
        }
        return type;
    },
    _checkISODateTime: function(parameter, name){
        if (typeof parameter !== 'string' || new RegExp("(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))").test(parameter) ) {
            throw checkError([{ message: 'OGAPI_ISO_DATE_TIME_PARAMETER', parameter: name }, { message: 'OGAPI_STRING_PATTERN', parameter: name }]);
        }
        try {
            new Date(parameter)
        } catch(err){
            throw checkError([{ message: 'OGAPI_ISO_DATE_TIME_PARAMETER', parameter: name }, { message: 'OGAPI_STRING_PATTERN', parameter: name }]);
        }
    },
    _checkStringAndPattern: function(parameter, pattern, name) {
        if (typeof parameter !== 'string' || !new RegExp(pattern).test(parameter) ) {
            throw checkError([{ message: 'OGAPI_STRING_PARAMETER', parameter: name }, { message: 'OGAPI_STRING_PATTERN', parameter: name, pattern: pattern }]);
        }
    },
    _checkStringAndLength: function(parameter, length, name) {
        if (typeof parameter !== 'string' || parameter.length > length) {
            throw checkError([{ message: 'OGAPI_STRING_PARAMETER', parameter: name }, { message: 'OGAPI_MAX_LENGTH', parameter: length }]);
        }
    },
    _checkString: function(parameter, name) {
        if (typeof parameter !== 'string') {
            throw checkError([{ message: 'OGAPI_STRING_PARAMETER', parameter: name }]);
        }
    },
    _checkNumber: function(parameter, name) {
        if (typeof parameter !== 'number') {
            throw checkError([{ message: 'OGAPI_NUMBER_PARAMETER', parameter: name }]);
        }
    },
    _checkArray: function(parameter, name) {
        if (!Array.isArray(parameter) || parameter.length === 0) {
            throw checkError({ message: 'OGAPI_ARRAY_PARAMETER', parameter: name });
        }
    },
    _checkObject: function(parameter, name) {
        if (typeof parameter !== 'object') {
            throw checkError({ message: 'OGAPI_OBJECT_PARAMETER', parameter: name });
        }
    },
    _checkBoolean: function(parameter, name) {
        if (typeof parameter !== 'boolean') {
            throw checkError({ message: 'OGAPI_BOOLEAN_PARAMETER', parameter: name });
        }
    },
    _checkURL: function(parameter, name) {
        if (typeof parameter !== 'string') {
            throw checkError({ message: 'OGAPI_STRING_PARAMETER', parameter: name });
        }

        try {
            let url = new URL(parameter)

            if (!['http:','https:'].includes(url.protocol)) {
                throw checkError({ message: 'OGAPI_URL_PARAMETER', parameter: name });
            }
        } catch (urlerr) {
            throw checkError({ message: 'OGAPI_URL_PARAMETER', parameter: name });
        }
    }
}
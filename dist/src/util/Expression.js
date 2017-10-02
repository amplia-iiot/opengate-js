'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Expression = (function () {
  function Expression() {
    _classCallCheck(this, Expression);
  }

  _createClass(Expression, null, [{
    key: 'eq',

    /**
     * @example
     * Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25")
     *
     *
     *returns:
     *
     *	{
     *	  eq : {
     *	    "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
     *	  }
     *	}
     * @return {object} This returns a json with the query of the operator "eq" built.
     * @param {String} key - This is the name of the field
     * @param {String} value - This is the value of the field
     */
    value: function eq(key, value) {
      return { eq: _defineProperty({}, key, value) };
    }

    /**
     * @example
     * Ex.neq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25")
     *
     *
     *returns:
     *
     *	{
     *	  neq : {
     *	    "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
     *	  }
     *	}
     * @return {object} This returns a json with the query of the operator "neq" built.
     * @param {String} key - This is the name of the field
     * @param {String} value - This is the value of the field
    */
  }, {
    key: 'neq',
    value: function neq(key, value) {
      return { neq: _defineProperty({}, key, value) };
    }

    /**
     * @example
     * Ex.like("collected.serialNumber", "SN")
     *
     *
     *returns:
     *
     *	{
     *	  like : {
     *	    "collected.serialNumber": "SN"
     *	  }
     *	}
     * @return {object} This returns a json with the query of the operator "like" built.
     * @param {String} key - This is the name of the field
     * @param {String} value - This is the value of the field
     */
  }, {
    key: 'like',
    value: function like(key, value) {
      return { like: _defineProperty({}, key, value) };
    }

    /**
     * @example
     * Ex.gt("collected.imei", "123456786543210")
     *
     *
     *returns:
     *
     *	{
     *	  gt : {
     *	    "collected.imei": "123456786543210"
     *	  }
     *	}
     * @return {object} This returns a json with the query of the operator "gt" built.
     * @param {String} key - This is the name of the field
     * @param {String} value - This is the value of the field
     */
  }, {
    key: 'gt',
    value: function gt(key, value) {
      return { gt: _defineProperty({}, key, value) };
    }

    /**
     * @example
     * Ex.lt("collected.imei", "123456786543210")
     *
     *
     *returns:
     *
     *	{
     *	  lt : {
     *	    "collected.imei": "123456786543210"
     *	  }
     *	}
     * @return {object} This returns a json with the query of the operator "lt" built.
     * @param {String} key - This is the name of the field
     * @param {String} value - This is the value of the field
     */
  }, {
    key: 'lt',
    value: function lt(key, value) {
      return { lt: _defineProperty({}, key, value) };
    }

    /**
     * @example
     * Ex.gte("collected.imei", "123456786543210")
     *
     *
     *	{
     *	  gte : {
     *	    "collected.imei": "123456786543210"
     *	  }
     *	}
     * @return {object} This returns a json with the query of the operator "gte" built.
     * @param {String} key - This is the name of the field
     * @param {String} value - This is the value of the field
     */
  }, {
    key: 'gte',
    value: function gte(key, value) {
      return { gte: _defineProperty({}, key, value) };
    }

    /**
     * @example
     * Ex.lte("collected.imei", "123456786543210")
     *
     *
     *	{
     *	  lte : {
     *	    "collected.imei": "123456786543210"
     *	  }
     *	}
     * @return {object} This returns a json with the query of the operator "lte" built.
     * @param {String} key - This is the name of the field
     * @param {String} value - This is the value of the field
     */
  }, {
    key: 'lte',
    value: function lte(key, value) {
      return { lte: _defineProperty({}, key, value) };
    }

    /**
     * @example
     * Ex.in("entityId", ["e64ccd08-e302-4b65-b19d-e38eeb7b2d24","e64ccd08-e302-4b65-b19d-e38eeb7b2d25"])
     *
     *
     *	{
     *	  in : {
     *	    "entityId": ["e64ccd08-e302-4b65-b19d-e38eeb7b2d24","e64ccd08-e302-4b65-b19d-e38eeb7b2d25"]
     *	  }
     *	}
     * @return {object} This returns a json with the query of the operator "in" built.
     * @param {String} key - This is the name of the field
     * @param {String} value - This is the value of the field
     */
  }, {
    key: 'in',
    value: function _in(key, value) {
      return { 'in': _defineProperty({}, key, value) };
    }

    /**
     * @example
     * Ex.or(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
     *
     * 
     *returns:
     *
     *	{
     *	  or : [
     *	    {
     *	      like: {
     *	        "collected.serialNumber": "SN"
     *	      }
     *	    },  
     *	    {
     *	      eq: {
     *	        "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
     *	      }
     *	    }
     *	  ]
     *	}
     * @return {object} This returns a json with the query of the logical operator "or" built.
     */
  }, {
    key: 'or',
    value: function or() {
      var filter = { or: [] };

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var i = 0; i < args.length; i++) filter.or.push(args[i]);
      return filter;
    }

    /**
     * @example
     * Ex.and(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
     *
     *
     *returns:
     *
     *	{
     *	  and : [
     *	    {
     *	      like: {
     *	        "collected.serialNumber": "SN"
     *	      }
     *	    },  
     *	    {
     *	      eq: {
     *	        "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
     *	      }
     *	    }
     *	  ]
     *	}
     * @return {object} This returns a json with the query of the logical operator "and" built.
     */
  }, {
    key: 'and',
    value: function and() {
      var filter = { and: [] };

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      for (var i = 0; i < args.length; i++) filter.and.push(args[i]);
      return filter;
    }
  }]);

  return Expression;
})();

exports['default'] = Expression;
module.exports = exports['default'];
//# sourceMappingURL=Expression.js.map

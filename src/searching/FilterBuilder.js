'use strict';

import Ex from './../util/Expression'

export default class FilterBuilder {

    /**
     * @example
     * var fb = ogapi.newFilterBuilder()
     */
    constructor() {
        this._filterTemplate = { filter: {} }
    }

    /**
     * @example
     * fb.or(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
     * @param {[Expression]} args - The parameters will be operators of the class Expression
     */
    or(...args) {
        if (typeof this._filterTemplate.filter.or === "undefined")
            this._filterTemplate.filter.or = [];

        if (typeof this._filterTemplate.filter.and !== "undefined") {
            console.warn('The filter not allow both elements [and,or], the item "and" are going to be removed.');
            delete this._filterTemplate.filter.and;
        }

        for (var i = 0; i < args.length; i++)
            this._filterTemplate.filter.or.push(args[i])

        return this;
    }

    /**
     * @example
     * fb.and(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
     * @param {[Expression]} args - The parameters will be operators of the class Expression
     */
    and(...args) {
        if (typeof this._filterTemplate.filter.and === "undefined")
            this._filterTemplate.filter.and = [];

        if (typeof this._filterTemplate.filter.or !== "undefined") {
            console.warn('The filter not allow both elements [and,or], the item "or" are going to be removed.');
            delete this._filterTemplate.filter.or;
        }

        for (var i = 0; i < args.length; i++)
            this._filterTemplate.filter.and.push(args[i])

        return this;
    }

}
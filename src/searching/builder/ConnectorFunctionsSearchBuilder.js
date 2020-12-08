'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = 'connectorFunctions/search';
/**
 * Defined a search over ConnectorFunctionsSearchBuilder	
 * @example ogapi.connectorFunctionsSearchBuilder()
 */
export default class ConnectorFunctionsSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, `/${BASE_URL}`));
        this._url = BASE_URL;
    }

    build(){
        const build = super.build()
        build._resource = this._url
        return build
    }
}
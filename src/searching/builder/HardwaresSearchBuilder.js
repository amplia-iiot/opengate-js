'use strict';

 import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
 import FieldFinder from '../../util/searchingFields/FieldFinder';
 
 const BASE_URL = '/catalog/hardwares';
 /**
  * Defined a search over Datastreams	
  * @example ogapi.hardwareSearchBuilder()
  */
 
 export default class HardwaresSearchBuilder extends SearchWithSummaryBuilder {
     /**
      *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
      */
     constructor(parent) {
         super(parent, {}, new FieldFinder(parent, BASE_URL));
         this._url = BASE_URL;
     }
 }
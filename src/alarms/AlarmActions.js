'use strict';

import AlarmAttendBuilder from './actions/AlarmAttendBuilder';
import AlarmCloseBuilder from './actions/AlarmCloseBuilder';

/**
 * This class contains all alarms actions builders
 */
export default class AlarmActions {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     */
    constructor(ogapi) {
        this._ogapi = ogapi;
    }

    /**
     * Create alarm close action builder
     *
     * @example
     *	ogapi.alarms.newCloseBuilder()
     * @return {AlarmCloseBuilder} 
     */
    newCloseBuilder() {
        return new AlarmCloseBuilder(this._ogapi);
    }

    /**
     * Create alarm attend action builder
     *
     * @example
     *	ogapi.alarms.newAttendBuilder()
     * @return {AlarmAttendBuilder} 
     */
    newAttendBuilder() {
        return new AlarmAttendBuilder(this._ogapi);
    }

}
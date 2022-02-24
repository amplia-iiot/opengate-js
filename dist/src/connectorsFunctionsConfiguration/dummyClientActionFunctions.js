/* eslint no-undef:  */

'use strict';

module.exports = {
  publishOnTopic: publishOnTopic,
  doHttpRequest: doHttpRequest,
  printTraceLog: printTraceLog,
  printDebugLog: printDebugLog,
  printInfoLog: printInfoLog,
  printWarnLog: printWarnLog,
  printErrorLog: printErrorLog
};

function publishOnTopic(payload, topic, deviceId) {
  console.log('publishOnTopic:');
  console.log('- payload: ' + payload);
  console.log('- topic: ' + topic);
  console.log('- deviceId: ' + deviceId);
}

function doHttpRequest(request, payload) {
  console.log('doHttpRequest:');
  console.log('- request: ' + request);
  console.log('- payload: ' + payload);
}

function printTraceLog(message) {
  console.log('printTraceLog:');
  console.log('- message: ' + message);
}

function printDebugLog(message) {
  console.log('printDebugLog:');
  console.log('- message: ' + message);
}

function printInfoLog(message) {
  console.log('printInfoLog:');
  console.log('- message: ' + message);
}

function printWarnLog(message) {
  console.log('printWarnLog:');
  console.log('- message: ' + message);
}

function printErrorLog(message) {
  console.log('printErrorLog:');
  console.log('- message: ' + message);
}
//# sourceMappingURL=dummyClientActionFunctions.js.map

# features/execute_operations.feature
@device_builder
@execute_operations
@operations
Feature: Execute ADMINISTRATIVE_STATUS_CHANGE operation
  As a user of JsApi
  I want to execute an ADMINISTRATIVE_STATUS_CHANGE operation
  So that I can change the administrative status to some devices/subscriptions/subscribers/communications module

  Background:
    Given an apikey user by "require-real-apikey"

 
 Scenario: Create a asset that not exists 
    Given an apikey user by "require-real-apikey"
    And an ogapi "devices builder" util 
    And I want to create a "device"
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "device_689_DEMO"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "asset"
    And I delete it
    Then I create it
    And response code should be: 201


  Scenario: Execute operation with default values
    Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute immediately
    And append entities by "" as tag
    And append entities by "{}" as filter with "ASSET" as entityType
    And append entities by:
        |   device_689_DEMO  |
    When I build it
    And I execute it
    Then response code should be: 201
    And response must have attached "device_689_DEMO" as "ASSET" entity
    And response must have attached an entity list with "ASSET" type defined by:
        |   device_689_DEMO  |


  Scenario: Execute ADMINISTRATIVE_STATUS_CHANGE operation without mandatory parameter
    Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And append entities by:
        |   device_689_DEMO  |
    When I build it
    Then throws an error. the error message explain that a parameter with name "admsts" is mandatory


  Scenario: Execute SIM_REPLACEMENT operation with entities that there are not the allowed type
    Given the operation by "SIM_REPLACEMENT"
    And parameter "icc" by "inventado"
    And append entities by:
        |   device_689_DEMO  |
    When I build it
    And I execute it
    Then response error code sould be: 400
    And response specific error code sould be: 1005

  Scenario: Execute ADMINISTRATIVE_STATUS_CHANGE operation and I append two times the same parameter and should have appended the last parameter set
    Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And append entities by:
        |   device_689_DEMO  |        
    And parameter "admsts" by "ACTIVE"
    And parameter "admsts" by "INACTIVE"
    When I build it
    And I execute it
    Then response contains a parameter "admsts" as name and "INACTIVE" as value

  Scenario: Execute SIM_REPLACEMENT but I will override a builder before I set the admsts parameter and the new builder must not be set admsts
    Given the operation by "SIM_REPLACEMENT"
    And parameter "icc" by "inventado"
    And the operation by "SIM_REPLACEMENT"
    And append entities by:
        |   device_689_DEMO  |        
    When I build it   
    Then throws an error equal to "This operation <SIM_REPLACEMENT> there are required parameters who have not been set. Parameters required: [icc]"
    
  Scenario: Execute a UPDATE operation
    Given the operation by "UPDATE"
    And execute immediately
    And append entities by:
        |   device_689_DEMO  |
    And parameter "bundleName" by "nombre"
    And parameter "bundleVersion" by "inventado"
    When I build it
    And I execute it
    Then response error code sould be: 400
    And response specific error code sould be: 1008

  Scenario: Execute a APN_ALLOWED operation with entities that there are not the allowed type
    Given the operation by "APN_ALLOWED"
    And execute immediately
    And append entities by:
        |   device_689_DEMO  |
    And parameter "apn" by:
        |   apn1.customer.es   |
        |   apn3.customer.es   |
        |   apn5.customer.es   |
        |   apn6.customer.es   |
    When I build it
    And I execute it
    Then response error code sould be: 400
    And response specific error code sould be: 1005

#http://cm.amplia.es/jira/browse/OGODM-3229
@OGODM-3229 
  Scenario: Execute a SET_DEVICE_PARAMETERS operation
    Given the operation by "SET_DEVICE_PARAMETERS"
    And execute immediately
    And append entities by:
        |   device_689_DEMO  |
    And parameter "variableList" by:
        |   variableName   |    variableValue   |
        |       var        |          1         |
        |       var        |          2         |
        |       var        |          3         |
    When I build it
    And I execute it
    Then response code should be: 201

#http://cm.amplia.es/jira/browse/OGODM-3229
@OGODM-3229 
  Scenario: Execute a GET_DEVICE_PARAMETERS operation
    Given the operation by "GET_DEVICE_PARAMETERS"
    And execute immediately
    And append entities by:
        |   device_689_DEMO  |
    And parameter "variableList" as object by:
        |   variableName   |
        |       type1        |
        |       type3        |
        |       type2        |
    When I build it
    And I execute it
    Then response code should be: 201

  Scenario: Execute a RATE_PLAN_CHANGE operation with entities that there are not the allowed type
    Given the operation by "RATE_PLAN_CHANGE"
    And execute immediately
    And append entities by:
        |   device_689_DEMO  |
    And parameter "ratePlan" by "DiscountRatePlan2" not allowed
    When I build it
    And I execute it
    Then response error code sould be: 400
    And response specific error code sould be: 1005

  Scenario: Execute a RATE_PLAN_CHANGE operation with entities that there are not the allowed type
    Given the operation by "SERVICE_CONFIGURATION"
    And execute immediately
    And append entities by:
        |   device_689_DEMO  |
    And parameter "dataService" by "true" as boolean
    And parameter "incomingMessages" by "true" as boolean
    And parameter "outgoingMessages" by "true" as boolean
    And parameter "outgoingMessagesMode" by "WHITE_LIST"
    And parameter "outgoingMessagesList" by "outgoingMessagesList-param"
    And parameter "incomingDataCalls" by "false" as boolean
    And parameter "outgoingDataCalls" by "false" as boolean
    And parameter "outgoingDataCallsMode" by "WHITE_LIST"
    And parameter "outgoingDataCallsList" by "outgoingDataCallsList-param"
    And parameter "incomingVoiceCalls" by "false" as boolean
    And parameter "outgoingVoiceCalls" by "false" as boolean
    And parameter "outgoingVoiceCallsMode" by "BLACK_LIST"
    And parameter "outgoingVoiceCallsList" by "outgoingVoiceCallsList-param"
    When I build it
    And I execute it
    Then response error code sould be: 400
    And response specific error code sould be: 1005

  Scenario: Execute a SET_CLOCK_EQUIPMENT operation
    Given the operation by "SET_CLOCK_EQUIPMENT"
    And execute immediately
    And append entities by:
        |   device_689_DEMO  |
    And parameter "date" by "2016-09-16T05"
    And parameter "time" by "53:43T+02:0016"
    And parameter "dst" by "123" as number
    And parameter "timezone" by "4" as number
    When I build it
    And I execute it
    Then response code should be: 201
    And response contains a parameter "date" as name and "2016-09-16T05" as value
    And response contains a parameter "timezone" as name and "4" as value

     
 Scenario: Create a asset that not exists 
    Given an apikey user by "require-real-apikey"
    And an ogapi "devices builder" util 
    And I want to create a "device"
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "device_689_DEMO"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "asset"
    And I delete it
    And response code should be: 200
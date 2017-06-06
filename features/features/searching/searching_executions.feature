# features/searching_executions.feature
@operations
@search
@search_executions
Feature: Searching operation's executions
  As a user of JsApi
  I want to search operation's executions

  Background:
    Given an apikey user by "require-real-apikey"

Scenario: Create a asset that not exists for operation 
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

#http://cm.amplia.es/jira/browse/OUW-528
@OUW-528
  Scenario: Execute operation with default values and find execution
    Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute immediately
    #And append entities by "" as tag
    #And append entities by "{}" as filter with "ASSET" as entityType
    And append entities by:
        |   device_689_DEMO  |
    When I build it
    And I execute it
    Then response code should be: 201
    And response must have attached "device_689_DEMO" as "ASSET" entity
    And response must have attached an entity list with "ASSET" type defined by:
        |   device_689_DEMO  |
    And an ogapi "executions search" util
    When I build it with filter by operation's id
    And I execute it
    Then response code should be: 200


Scenario: Delete asset for operation
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
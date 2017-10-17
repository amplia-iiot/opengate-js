# features/searching_executions.feature
@device_builder
@operations
@search
@search_executions
@searching
@searching_executions
Feature: Searching operation's executions
  As a user of JsApi
  I want to search operation's executions

  Background:
    Given an apikey user by "require-real-apikey"

Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "executions_organization"
    And the "description" "device organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1 
    Then I delete it
    And I create it
    And response code should be: 201

 Scenario: I want to create the entity 
    Given the entity of type "devices builder" with "executions_organization" 
    Then I get allowed Datastreams fields    
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                 | parent      |
		| provision.administration.channel                                  | simple             |  default_channel        |             |
        | provision.administration.organization                             | simple             |  executions_organization    |          |
        | provision.administration.serviceGroup                             | simple             |  emptyServiceGroup      |             |
        | provision.device.identifier                                       | simple             |  device_executions_tests           |             |
        | provision.device.operationalStatus                                | simple             |  TEST                 |             |   
        | provision.device.administrativeState                              | simple             |  TESTING                 |             |
        | provision.device.name                                             | simple             |  OGUX Device GATEWAY tester           |             |
        | provision.device.description                                      | simple             |  OGUX Device tester full GATEWAY description           |             |
        | provision.device.specificType                                     | simple             |  CONCENTRATOR           |             |
    Then I delete it
    And I create it
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
        |   device_executions_tests  |
    When I build it
    And I execute it
    Then response code should be: 201
    And response must have attached "device_executions_tests" as "ASSET" entity
    And response must have attached an entity list with "ASSET" type defined by:
        |   device_executions_tests  |
    And an ogapi "executions search" util
    When I build it with filter by operation's id
    And I execute it
    Then response code should be: 200


 Scenario: I want to delete the entity 
    Given the entity of type "devices builder" with "executions_organization" 
    When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                 | parent      |
		| provision.administration.channel                                  | simple             |  default_channel        |             |
        | provision.administration.organization                             | simple             |  executions_organization    |          |
        | provision.device.identifier                                       | simple             |  device_executions_tests           |             |
    Then I delete it

  Scenario: Deleting an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "executions_organization"
    Then I delete it

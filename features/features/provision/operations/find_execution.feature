# features/find_execution.feature
@provision
@find_execution
@operations
@finder
@operation
Feature: Find an operation 
  As a user of JsApi
  I want to find an opreation
  So I can check if a operation exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"

Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "find_execution_organization"
    And the "description" "find execution organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1 
    Then I create it
    And response code should be: 201

  Scenario: I want to create an entity 
    Given the entity of type "devices builder" with "find_execution_organization" 
    And I get allowed Datastreams fields
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                           | parent      |
		| provision.administration.channel                                  | simple             |  default_channel                  |             |
        | provision.administration.organization                             | simple             |  find_execution_organization   |             |
        | provision.administration.serviceGroup                             | simple             |  emptyServiceGroup                |             |
        | provision.device.identifier                                       | simple             |  find_execution_device         |             |
        | provision.device.operationalStatus                                | simple             |  NORMAL                           |             |   
        | provision.device.administrativeState                              | simple             |  ACTIVE                           |             |

    Then I create it
    And response code should be: 201


Scenario: Execute operation with default values and find operation
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute immediately
    And append entities by:
        |   find_execution_device  |
    When I build it
    And I execute it
    Then response code should be: 201
    And an ogapi "operation finder" util
    And I want to read a "operation"
    When I try to find by operation's id
    Then I can see into the result an "operation type" as "ADMINISTRATIVE_STATUS_CHANGE"

  Scenario: Find a operation that not exists
    Given an ogapi "operation finder" util
    And I want to read a "operation"
 	When I try to find by...
     | field    | content    |
     | id       | not_exists |
     Then response code should be: 200  

  Scenario: I want to delete the entity 
    Given the entity of type "devices builder" with "find_execution_organization" 
    And I get allowed Datastreams fields
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with... 
		| datastream                                 | typeFunction       |   value                             | parent      |
        | provision.device.identifier                | simple             |  find_execution_device           |             |
    And I delete it
    Then response code should be: 200

  Scenario: Deleting an organization
   Given an ogapi "organizations builder" util
   Then I want to delete an "organization"
   And the "name" "find_execution_organization"
   Then I delete it
   And response code should be: 200
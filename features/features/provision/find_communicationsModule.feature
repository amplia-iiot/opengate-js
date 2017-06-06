# features/find_communicationsModule.feature

@finder
@find_provision
@communicationsModule
Feature: Find a communications module
  As a user of JsApi
  I want to find a communications module
  So I can check if a communications module exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"

 #http://cm.amplia.es/jira/browse/OUW-525
 @OUW-525
  Scenario: Find a communications module that exists
	Given an ogapi "devices builder" util
	And I want to create a "device"
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_GATEWAY_FIND"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    Then I delete it
    And I create it
	And response code should be: 201
    And I want to create a "communications module"
    Given an ogapi "communications modules builder" util
    And the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "STOPPED"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE_FIND"
    And the "name" "OGUX CommunicationsModule tester"
    And the "description" "OGUX CommunicationsModule tester full description"
    And the "specific type" "GENERIC"
    Then I delete it
    And I create it
	And response code should be: 201
    Given I want to create a "relation"
    Then an ogapi "entities relations builder" util
    And the "organization" "base_organization"
    And the "device" "OGUX_EntityKey_GATEWAY_FIND"
    And the "commsModule" "OGUX_EntityKey_COMMS_MODULE_FIND"
    And the "template" "default"
    Then I create it
    Then response code should be: 201
    Given an ogapi "communications module finder" util
    And I want to read a "communications module"
 	When I try to find by... 
		| field   | content            |
		| organization    | base_organization |
		| id    | OGUX_EntityKey_COMMS_MODULE_FIND |
	And response code should be: 200
	Then I can see into the result an "communications module id" as "OGUX_EntityKey_COMMS_MODULE_FIND"
	Given an ogapi "devices builder" util
	And I want to create a "device"
    Given the "organization" "base_organization"
    And the "entity key" "OGUX_EntityKey_GATEWAY_FIND"
    Then I delete it
    Then response code should be: 200
    Given an ogapi "communications modules builder" util
    And the "organization" "base_organization"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE_FIND"
    Then I delete it
    Then response code should be: 200
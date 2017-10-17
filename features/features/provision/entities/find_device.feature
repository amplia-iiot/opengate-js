# features/find_device.feature
@device_builder
@finder
@find_provision
@finddevice
Feature: Find a device
  As a user of JsApi
  I want to find a device
  So I can check if a device exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Find a device that exists
	Given an ogapi "devices builder" util 
    And I want to create a "device"
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_DEVICE_FIND"
    And the "serial number" "OGUX_SerialNumber_DEVICE_FIND"
    And the "name" "OGUX Device DEVICE_FIND tester"
    And the "description" "OGUX Device tester full DEVICE_FIND description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    And I delete it
    Then I create it
    And response code should be: 201
    Given an ogapi "device finder" util
    And I want to read a "device"
 	When I try to find by... 
		| field   | content            |
		| organization    | base_organization |
		| id    | OGUX_EntityKey_DEVICE_FIND |
	And response code should be: 200
	Then I can see into the result an "device id" as "OGUX_EntityKey_DEVICE_FIND"
 	Given an ogapi "devices builder" util 
    And I want to create a "device"
    Given the "organization" "base_organization"
    And the "entity key" "OGUX_EntityKey_DEVICE_FIND"
    And I delete it
    Then response code should be: 200
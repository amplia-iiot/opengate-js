# features/create_delete_device.feature
@create_provision
@device_defaultFeed
Feature: Delete and Create a device
  As a device of JsApi
  I want to create an device
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "devices builder" util 
    And I want to create a "device"

 Scenario: Create and delete a gateway that not exists 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_GATEWAY"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    And I delete it
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200
 
 Scenario: Create a gateway that already exists 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_GATEWAY"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "defaultFeed" "location"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    And I delete it
    Then I create it
    And response code should be: 201
    Then I create it
    And throws an error equal to "Device OGUX_EntityKey_GATEWAY already exists"
    And I delete it
    Then response code should be: 200

 Scenario: Create and delete a asset that not exists 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_ASSET"
    And the "serial number" "OGUX_SerialNumber_ASSET"
    And the "name" "OGUX Device ASSET tester"
    And the "description" "OGUX Device tester full ASSET description"
    And the "type" "asset"
    And the "specific type" "CONTAINER"
    And I delete it
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200
  
    @test
  Scenario: Create an asset with incorrect specific type
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_ASSET"
    And the "type" "asset"
    And the "specific type" "CONCENTRATORE"
    Then I create it
    And an error is thrown

# http://cm.amplia.es/jira/browse/OUW-522
@errors @bug @OGODM-3275 @OUW-522
 Scenario: Create an asset with incorrect hardware
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_GATEWAY"
    And the "type" "asset"
    And the "hardware" "HARDWARE_NOT_EXISTING"
    Then I create it
    And throws an error equal to "Hardware not found"
    
@errors @bug @OGODM-3274   
 Scenario: Create an asset with incorrect software
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_GATEWAY"
    And the "type" "asset"
    And the "software" "SOFTWARE_NOT_EXISTING"
    Then I create it
    And throws an error equal to "Software SOFTWARE_NOT_EXISTING not found"

 Scenario: Try to create a device without the mandatory fields
    When I create it
    Then throws an error equal to "There are required parameters that have not been set. Missing parameters: [organization,type,entityKey]"

 @relations @OUW-476 @OUW-478
 Scenario: Create and delete a gateway with a sigfox comms module 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_sigfox_GATEWAY"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    Then I delete it
    Then I create it
    And response code should be: 201
    Given I want to create a "communications module"
    Then an ogapi "communications modules builder" util
    And the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "entity key" "OGUX_sigfox_COMMS_MODULE"
    And the "name" "OGUX CommunicationsModule tester"
    And the "description" "OGUX CommunicationsModule tester full description"
    And the "specific type" "SIGFOX"
    Then I delete it
    Then I create it
    And response code should be: 201
    Given I want to create a "relation"
    Then an ogapi "entities relations builder" util
    And the "organization" "base_organization"
    And the "device" "OGUX_sigfox_GATEWAY"
    And the "commsModule" "OGUX_sigfox_COMMS_MODULE"
    And the "template" "sigfox"
    Then I create it
    Then response code should be: 201

# http://cm.amplia.es/jira/browse/OUW-522
@errors @bug @OGODM-3275 @OUW-522
 Scenario: Create and delete a gateway with hardware and software
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_GATEWAY_HS"
    And the "serial number" "OGUX_SerialNumber_GATEWAY_HS"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    And the "hardware" "FSU001"
    And the "software" "7d5a5944-d825-4733-9f36-e201e22a8a36"
    And the "certificate" "AmpliaCA"
    And I delete it
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200

#@ignore
 Scenario: Create and delete a gateway with a comms module with a subscriber 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_GATEWAY"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    And I want to create a "communications module"
    Given an ogapi "communications modules builder" util as "commsModule1"
    And the "organization" "base_organization" on util "commsModule1"
    And the "channel" "base_channel" on util "commsModule1"
    And the "administrative state" "TESTING" on util "commsModule1"
    And the "operational status" "STOPPED" on util "commsModule1"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE" on util "commsModule1"
    And the "name" "OGUX CommunicationsModule tester" on util "commsModule1"
    And the "description" "OGUX CommunicationsModule tester full description" on util "commsModule1"
    And the "specific type" "ADSL" on util "commsModule1"
    And I want to create a "_subscriber"
    Given an ogapi "subscribers builder" util as "subscriber1"
    Given the "organization" "base_organization" on util "subscriber1"
    And the "channel" "base_channel" on util "subscriber1"
    And the "administrative state" "TESTING" on util "subscriber1"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE" on util "subscriber1"
    And the "name" "OGUX CommunicationsModule tester" on util "subscriber1"
    And the "icc" "123456789456" on util "subscriber1"
    And the "description" "OGUX CommunicationsModule tester full description" on util "subscriber1"
    And the "specific type" "ADSL" on util "subscriber1"
    Given I want to create a "communications module"
    Given the util "subscriber1" into "subscriber"
    Given I want to create a "device"
    Given the util "commsModule1" into "communications module"
    Then I delete it
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200

#@ignore
 Scenario: Create and delete a gateway with a comms module with a subscription 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "OGUX_EntityKey_GATEWAY"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    And I want to create a "communications module"
    Given an ogapi "communications modules builder" util as "commsModule1"
    And the "organization" "base_organization" on util "commsModule1"
    And the "channel" "base_channel" on util "commsModule1"
    And the "administrative state" "TESTING" on util "commsModule1"
    And the "operational status" "STOPPED" on util "commsModule1"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE" on util "commsModule1"
    And the "name" "OGUX CommunicationsModule tester" on util "commsModule1"
    And the "description" "OGUX CommunicationsModule tester full description" on util "commsModule1"
    And the "specific type" "ADSL" on util "commsModule1"
    And I want to create a "_subscription"
    Given an ogapi "subscriptions builder" util as "subscription1"
    Given the "organization" "base_organization" on util "subscription1"
    And the "channel" "base_channel" on util "subscription1"
    And the "administrative state" "TESTING" on util "subscription1"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE" on util "subscription1"
    And the "name" "OGUX CommunicationsModule tester" on util "subscription1"
    And the "description" "OGUX CommunicationsModule tester full description" on util "subscription1"
    And the "msisdn" "625360041" on util "subscription1"
    And the "imsi" "1234657984512" on util "subscription1"
    And the "homeoperator" "Cableuropa, SAU" on util "subscription1"
    And the "registered operator" "Cableuropa, SAU" on util "subscription1"
    And the "ip address" "172.19.1.224" on util "subscription1"
    And the "mobile phone provider" "Cableuropa, SAU" on util "subscription1"
    And the "specific type" "ADSL" on util "subscription1"
    Given I want to create a "communications module"
    Given the util "subscription1" into "subscription"
    Given I want to create a "device"
    Given the util "commsModule1" into "communications module"
    Then I delete it
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200

#@ignore    
 Scenario: Create and delete a gateway with a comms module with a subscription and subscriber
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "123"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    And I want to create a "communications module"
    Given an ogapi "communications modules builder" util as "commsModule1"
    And the "organization" "base_organization" on util "commsModule1"
    And the "channel" "base_channel" on util "commsModule1"
    And the "administrative state" "TESTING" on util "commsModule1"
    And the "operational status" "STOPPED" on util "commsModule1"
    And the "entity key" "321" on util "commsModule1"
    And the "name" "OGUX CommunicationsModule tester" on util "commsModule1"
    And the "description" "OGUX CommunicationsModule tester full description" on util "commsModule1"
    And the "specific type" "ADSL" on util "commsModule1"
    And I want to create a "_subscription"
    Given an ogapi "subscriptions builder" util as "subscription1"
    Given the "organization" "base_organization" on util "subscription1"
    And the "channel" "base_channel" on util "subscription1"
    And the "administrative state" "TESTING" on util "subscription1"
    And the "entity key" "432" on util "subscription1"
    And the "name" "OGUX CommunicationsModule tester" on util "subscription1"
    And the "description" "OGUX CommunicationsModule tester full description" on util "subscription1"
    And the "msisdn" "625360041" on util "subscription1"
    And the "imsi" "1234657984512" on util "subscription1"
    And the "homeoperator" "Cableuropa, SAU" on util "subscription1"
    And the "registered operator" "Cableuropa, SAU" on util "subscription1"
    And the "ip address" "172.19.1.224" on util "subscription1"
    #And the "mobile phone provider" "Cableuropa, SAU" on util "subscription1"
    And the "specific type" "ADSL" on util "subscription1"
    And I want to create a "_subscriber"
    Given an ogapi "subscribers builder" util as "subscriber1"
    Given the "organization" "base_organization" on util "subscriber1"
    And the "channel" "base_channel" on util "subscriber1"
    And the "administrative state" "TESTING" on util "subscriber1"
    And the "entity key" "12345" on util "subscriber1"
    And the "name" "OGUX CommunicationsModule tester" on util "subscriber1"
    And the "icc" "123456789456" on util "subscriber1"
    And the "description" "OGUX CommunicationsModule tester full description" on util "subscriber1"
    And the "specific type" "ADSL" on util "subscriber1"
    Given I want to create a "communications module"
    Given the util "subscriber1" on util "commsModule1" into "subscriber"
    Given the util "subscription1" on util "commsModule1" into "subscription"
    Given I want to create a "device"
    Given the util "commsModule1" into "communications module"
    Then I delete it
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200
# features/create_delete_commsModule.feature
@create_provision
@communications_module
Feature: Delete and Create an communications module 
  As a device of JsApi
  I want to create an communications module
  So, I can create a new communications module with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "communications modules builder" util 
    And I want to create a "communications module"

 Scenario: Create and delete a comms module that not exists 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "STOPPED"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE"
    And the "imei" "OGUX_Imei_COMMS_MODULE"
    And the "name" "OGUX CommunicationsModule tester"
    And the "description" "OGUX CommunicationsModule tester full description"
    And the "specific type" "GENERIC"
    And I delete it
    Then I create it
    And response code should be: 201
    #And I delete it
    #Then response code should be: 200
 
  Scenario: Create an asset with incorrect specific type
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "STOPPED"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE"
    And the "specific type" "CONCENTRATORE"
    Then I create it
    And an error is thrown

# http://cm.amplia.es/jira/browse/OUW-522
@errors @bug @OGODM-3275 @OUW-522
 Scenario: Create an asset with incorrect hardware
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "STOPPED"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE"
    And the "hardware" "HARDWARE_NOT_EXISTING"
    Then I create it
    And throws an error equal to "Hardware not found"
    
@errors @bug @OGODM-3274
 Scenario: Create an asset with incorrect software
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "STOPPED"
    And the "entity key" "OGUX_EntityKey_COMMS_MODULE_22222"
    And the "software" "SOFTWARE_NOT_EXISTING"
    Then I create it
    And throws an error equal to "Software SOFTWARE_NOT_EXISTING not found"
    
  Scenario: Try to create a comms module without the mandatory fields
    When I create it
    Then throws an error equal to "There are required parameters that have not been set. Missing parameters: [organization,entityKey]"
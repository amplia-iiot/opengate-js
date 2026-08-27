# features/create_certificates.feature
@provision
@create_provision
@create_certificates
@certificates
@fail
Feature: Create a certificate
  As a user of JsApi
  I want to create a certificate
  So I can create a certificate

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "certificates builder" util
    Given I want to create a "certificate"

  Scenario: Checking name parameter type
    And the "name" 1
    Then throws an error equal to "Parameter name must be a string, cannot be empty and has a maximum length of 50"

  Scenario: Checking name parameter length
    And the "name" "name_name_name_name_name_name_name_name_name_name_n"
    Then throws an error equal to "Parameter name must be a string, cannot be empty and has a maximum length of 50"

  Scenario: Checking description parameter type
    And the "description" 1
    Then throws an error equal to "Parameter description must be a string, cannot be empty and has a maximum length of 200"

  Scenario: Checking description parameter length
    And the "description" "name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name"
    Then throws an error equal to "Parameter description must be a string, cannot be empty and has a maximum length of 200"

  Scenario: Checking administrativeState parameter type
    And the "administrativeState" 1
    Then throws an error equal to "Parameter administrativeState must be typeof string and cannot be empty"

  Scenario: Checking administrativeState parameter type
    And the "administrativeState" "NOT_ACTIVE"
    Then does not throws an error

  Scenario: Checking usages parameter type
    And the "usages" 1
    Then throws an error equal to "Parameter usages must be typeof Array and cannot be empty"

  Scenario: Checking usages parameter type
    And the "usages" 1
    Then throws an error equal to "Parameter usages must be typeof Array and cannot be empty"

  Scenario: Checking usages parameter type
    And the "usages"
      |  |
    Then throws an error equal to "Parameter usages must be typeof Array and cannot be empty"

  Scenario: Checking usages parameter type
    And the "usages"
      | DEVICE_COMMUNICATIONS | FILE_VALIDATION | DEVICE_ACCESS |
    Then does not throws an error

  Scenario: Checking tags parameter type
    And the "tags" 1
    Then throws an error equal to "Parameter tags must be typeof Array and cannot be empty"

  Scenario: Checking tags parameter type
    And the "tags"
      | tag1 | tag 2 |
    Then does not throws an error

  Scenario: Checking tags parameter type
    And the "tags"
      |  |
    Then throws an error equal to "Parameter tags must be typeof Array and cannot be empty"

  Scenario: Checking parameters parameter type
    And the "parameters" 1
    Then throws an error equal to "Parameter parameters must be a string, cannot be empty"


  Scenario: Checking hardwares parameter type
    And the "hardwares" 1
    Then throws an error equal to "Parameter hardwares must be typeof Array and cannot be empty"

  Scenario: Checking hardwares parameter type
    And the "hardwares"
      |  |
    Then throws an error equal to "Parameter hardwares must be typeof Array and cannot be empty"

  Scenario: Checking hardwares parameter type
    And the "hardwares"
      | {'sdfs':'dd', 'entity': 'dd'} |
    Then throws an error equal to "The hardware attribute is not well formed, the message [1] not correct. Remember: hardwareId or [manufacturer, model and modelVersion] must be defined"

  Scenario: Checking hardwares parameter type
    And the "hardwares"
      | {'hardwareId':'dd', 'entity': 'dd'} |
    Then throws an error equal to "The hardware attribute is not well formed, the message [1] not correct. Remember: hardwareId or [manufacturer, model and modelVersion] must be defined"

  Scenario: Checking hardwares parameter type
    And the "hardwares"
      | {'hardware':'dd', 'manufacturer': 'dd', 'model':'model'} | {'hardware':'dd', 'manufacturer': 'dd', 'model':'model'} |
    Then throws an error equal to "The hardware attribute is not well formed, the message [1,2] not correct. Remember: hardwareId or [manufacturer, model and modelVersion] must be defined"

  Scenario: Checking hardwares parameter type
    And the "hardwares"
      | {'hardwareId':'dd'} | {'hardware':'dd', 'manufacturer': 'dd', 'model':'model'} |
    Then throws an error equal to "The hardware attribute is not well formed, the message [2] not correct. Remember: hardwareId or [manufacturer, model and modelVersion] must be defined"

  Scenario: Checking hardwares parameter type
    And the "hardwares"
      | {"hardwareId" : "OpenGateSecure"} | {"hardwareId" : "OpenGateSecure"} |
    Then does not throws an error

  Scenario: Create a certificate
    #And the "id" "certificado_cucumber_id"
    And the "name" "certificado_cucumber_name"
    And the "description" "certificado_cucumber_name"
    And the "administrativeState" "ACTIVE"
    And the "usages"
      | CERT_SIGN |
    And the "tags"
      | tag1 | tag2 |
    And the "hardwares"
      | { "hardwareId" : "OpenGateSecure"} |
    And I read the file from "/file_test/root.cer"
    And I create it
    Then does not throws an error



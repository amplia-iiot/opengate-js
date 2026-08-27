# features/create_certificates.feature
@provision
@update_certificates
@certificates
@ignore
@urlParameters

Feature: Create a certificate
  As a user of JsApi
  I want to create a certificate
  So I can create a certificate

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "certificates builder" util
    Given I want to update a "certificate"

  Scenario: Create a certificate
    And the "id" "f0564b4f-4044-4028-a062-0b502a410108"
    And the "name" "root1_update"
    And the "description" "certificado_cucumber_name"
    And the "administrativeState" "ACTIVE"
    And the "usages"
      | CERT_SIGN |
    And the "tags"
      | tag1 | tag2 |
    And the "hardwares"
      | { "hardwareId" : "OpenGateSecure"} |
    And I update it
    Then does not throws an error



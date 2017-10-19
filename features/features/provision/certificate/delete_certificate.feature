# features/delete_certificate.feature
@provision
@create_provision
@delete_provision
@certificates
@ignore
Feature: Delete a certificate
   As a user of JsApi
   I want to delete a certificate

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "certificates builder" util
    #Given I want to create a "certificate"
    #And the "name" "Basic_Certificate"
    #And the "description" "Basic Certificate to CRUD"
    #And the "administrativeState" "ACTIVE"
    #And the "usages" "FILE_VALIDATION"
    And I want to delete a "certificate"

  #Scenario: Delete a certificate that exists
    #And I delete it
    #Then response code should be: 200

  Scenario: Delete a certificate that does not exist
    And I delete it
    Then response code should be: 400
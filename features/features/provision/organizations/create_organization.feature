# features/create_organization.feature
@provision
@create_provision
@organizations
Feature: Create an organization
As a user of JsApi
I want to create or delete an organization

  Background:
    Given an apikey user by "require-real-apikey"
    Given an ogapi "organizations builder" util
    Given I want to create a "organization"

  Scenario: Creating an organization without mandatory fields
    Then I create it
    And throws an error equal to "Parameters name, country code and lang code must be defined"

  Scenario: Creating an organization with an invalid field
    And the "lang code" ""
    Then throws an error equal to "OGAPI_STRING_PARAMETER"

  Scenario: Creating an organization with invalid zoom
    And the "zoom" 21
    And throws an error equal to "Parameter zoom must be a number between 0 and 19"

  Scenario: Creating an organization that NOT exists with all params
    And the "name" "JsApiFullOrganization"
    And the "description" "JsApi tests organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "plan" "BASIC"
    And the "only assigned domain certificates" false
    And the "location" with 1 and 1
    And the "domain" "base_organization"
    Then I delete it
    Then I create it
    And response code should be: 201
    Then I delete it
    And response code should be: 200

  Scenario: Creating an organization with parent domain before create
    And an ogapi "domains builder" util
    Given I want to create a "domain"
    And the "name" "domain_test_ogapi"
    And the "description" "Domian created for testing ogapi"
    And the "parentDomain" "base_organization"
    And I create it
    Then response code should be: 201
    And an ogapi "organizations builder" util
    Given I want to create a "organization"
    And the "name" "JsApiFullOrganization"
    And the "domain" "domain_test_ogapi"
    And the "country code" "ES"
    And the "lang code" "es"
    And I delete it
    And I create it
    Then response code should be: 201
    And I delete it
    Then response code should be: 200
    And an ogapi "domains builder" util
    Given I want to delete a "domain"
    And the "name" "domain_test_ogapi"
    And I delete it
    Then response code should be: 200

  Scenario: Creating an organization that NOT exists with mandatory params
    And the "name" "JsApiPartialOrganization"
    And the "country code" "ES"
    And the "lang code" "es"
    And I delete it
    And I create it
    Then response code should be: 201

  Scenario: Updating an organization with domain
    And the "name" "JsApiPartialOrganization"
    And the "country code" "ES"
    And the "lang code" "es"
    And I delete it
    And I create it
    Then response code should be: 201
    And the "domain" "base_organization"
    And I update it
    Then throws an error equal to "The domain parameter is not allowed in the update"
    And I delete it
    Then response code should be: 200


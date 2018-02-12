# features/feature/create_delete_read_domain.feature
@provision
@crd_domain
@create_provision
@domain
Feature: Create a domain
As a user of JsApi
I want to create a domain
So I can create a domain

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "domains builder" util
    Given I want to create a "domain"

  Scenario: Checking name parameter type
    And the "name" 1
    Then throws an error equal to "OGAPI_NAME_PARAMETER_MAX_LENGTH_50"

  Scenario: Checking name parameter length
    And the "name" "name_name_name_name_name_name_name_name_name_name_name"
    Then throws an error equal to "OGAPI_NAME_PARAMETER_MAX_LENGTH_50"

  Scenario: Checking description parameter type
    And the "description" 1
    Then throws an error equal to "OGAPI_DESCRIPTION_PARAMETER_MAX_LENGTH_250"

  Scenario: Checking description parameter length
    And the "description" "name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name"
    Then throws an error equal to "OGAPI_DESCRIPTION_PARAMETER_MAX_LENGTH_250"

  Scenario: Checking parentDomain parameter type
    And the "parentDomain" 1
    Then throws an error equal to "OGAPI_DOMAIN_PARAMETER_MAX_LENGTH_50"

  Scenario: Checking name parameter length
    And the "parentDomain" "name_name_name_name_name_name_name_name_name_name_name"
    Then throws an error equal to "OGAPI_DOMAIN_PARAMETER_MAX_LENGTH_50"

  @only_domain
  Scenario: Create a domain
    And the "name" "domain_test_ogapi"
    And the "description" "Domian created for testing ogapi"
    And the "parentDomain" "base_organization"
    And I delete it
    And I create it
    Then does not throws an error

  Scenario: Find an domain that exists
    And an ogapi "domains finder" util
    And I want to read a "domain"
    When I try to find by...
      | field | content           |
      | name  | domain_test_ogapi |
    Then I can see into the result an "domain name" as "domain_test_ogapi"


  @only_domain
  Scenario: Delete a domain
    And an ogapi "domains builder" util
    Given I want to create a "domain"
    And the "name" "domain_test_ogapi"
    And I delete it
    Then does not throws an error



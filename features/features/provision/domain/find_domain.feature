# features/finddomain.feature
@provision
@finder
@find_provision
@domain
@find_domain
Feature: Find an domain
As a user of JsApi
I want to find an domain
So I can check if a domain exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Prepare scenario
    And an ogapi "domains builder" util
    Then I want to create a "domain"
    And the "name" "dmntst4"
    And the "description" "Domian created for tsting ogapi"
    And the "parentDomain" "root"
    And I create it
    Then does not throws an error
    And the "name" "dmntst43"
    And the "description" "Domian created for tsting ogapi"
    And the "parentDomain" "dmntst4"
    And I create it
    Then does not throws an error
    And an ogapi "domains finder" util
    Given I want to read a "domain"

  Scenario: Find an domain that exists
    And an ogapi "domains finder" util
    Given I want to read a "domain"
    When I try to find by...
      | field | content |
      | name  | dmntst4 |
    Then I can see into the result an "domain name" as "dmntst4"

  Scenario: Find an domain that not exists
    And an ogapi "domains finder" util
    Given I want to read a "domain"
    When I try to find by...
      | field | content      |
      | name  | dmninventada |
    Then response code should be: 404


  Scenario: Find an domain with hierarchy that exists
    And an ogapi "domains finder" util
    Given I want to read a "domain"
    When I try to find by...
      | field             | content |
      | nameWithHierarchy | dmntst4 |
    Then I can see into the result an "hierarchy domain name" as "dmntst43"

  Scenario: Delete a domain
    And an ogapi "domains builder" util
    Then I want to create a "domain"
    And the "name" "dmntst43"
    And I delete it
    Then does not throws an error
    And an ogapi "domains builder" util
    Then I want to create a "domain"
    And the "name" "dmntst4"
    And I delete it
    Then does not throws an error
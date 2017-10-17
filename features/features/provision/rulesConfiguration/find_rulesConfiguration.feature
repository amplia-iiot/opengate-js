# features/find_rulesConfiguration.feature
@provision
@find_provision
@rulesConfiguration
Feature: Find an rulesConfiguration 
  As a user of JsApi
  I want to find an rulesConfiguration
  So I can check if a rulesConfiguration exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "rule configurations finder" util
    And I want to read a "rule configuration"

  Scenario: Find all rule configurations for an organization and channel
    When I try to find by...
      | field  | content                |
      | organization   | base_organization |
      | channel   | base_channel |
    Then response code should be: 200

  Scenario: Find all rule configurations for an organization and channel that not exists
    When I try to find by...
      | field  | content                |
      | organization   | base_organization_not_exist |
      | channel   | base_channel_not_exist |
    Then response code should be: 404

  Scenario: Find an rule configuration that exists
    When I try to find by...
      | field  | content                |
      | organization   | base_organization |
      | channel   | base_channel |
      | name   | mobileCoverageLow |
    Then response code should be: 200

  Scenario: Find an rulesConfiguration that not exists
  	When I try to find by... 
  	  | field   | content            |
      | organization   | base_organization |
      | channel   | base_channel |
 	  | name    | rulesConfiguration_inventada |
    Then response code should be: 404  
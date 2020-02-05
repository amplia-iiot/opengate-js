# features/find_channel.feature
@provision
@finder
@find_provision
@channel
@find_channel
@urlParameters

Feature: Find an channel
  As a user of JsApi
  I want to find an channel
  So I can check if a channel exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "channel finder" util
    And I want to read a "channel"

  Scenario: Find a channel that exists
    When I try to find by...
      | field        | content           |
      | organization | base_organization |
      | name         | base_channel      |
    Then I can see into the result an "channel name" as "base_channel"

  Scenario: Find a channel that not exists
    When I try to find by...
      | field        | content           |
      | organization | base_organization |
      | name         | channel_inventada |
    Then response code should be: 404

  Scenario: Find channels by domain and workgroup
    When I try to find by...
      | field     | content           |
      | domain    | base_organization |
      | workgroup | base_organization |
    Then response code should be: 200

  Scenario: Find channels by domain and workgroup and organization that exists
    When I try to find by...
      | field        | content           |
      | domain       | base_organization |
      | workgroup    | base_organization |
      | organization | base_organization |
    Then response code should be: 200

  Scenario: Find channels by domain and workgroup and organization that not exists
    When I try to find by...
      | field        | content           |
      | domain       | base_organization |
      | workgroup    | base_organization |
      | organization | alñksdjfalskjdfñ  |
    Then response code should be: 404

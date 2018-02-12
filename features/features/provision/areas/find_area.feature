# features/provision/areas/find_areas.feature
@provision
@finder
@find_provision
@area
@find_area
Feature: Find an area
As a user of JsApi
I want to find an area
So I can check if a area exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Creating an organization to use in areas tests
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "area_organization"
    And the "description" "area organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    Then I create it
    And response code should be: 201

  Scenario: Create a area that does not exist
    And an ogapi "areas builder" util
    And I want to create an "area"
    And the "organization" "area_organization"
    And the "name" "mock_area"
    And the "identifier" "mock_area"
    And the "description" "area description"
    And the "geometry" with...
      | param                                                                                                                                                                |
      | Polygon                                                                                                                                                              |
      | [[[2.173200845718384, 41.36735636905808], [2.279992198944092, 41.364771670743316], [2.2802926063537598, 41.36514206995068], [2.173200845718384, 41.36735636905808]]] |
    And the "entities"
      | entity1 | entity2 |
    Then I create it
    And response code should be: 201

  Scenario: Find a area that exists
    And an ogapi "area finder" util
    And I want to read an "area"
    When I try to find by...
      | field        | content           |
      | organization | area_organization |
      | identifier   | mock_area         |
    Then I can see into the result an "area name" as "mock_area"

  Scenario: Find a area that not exists
    And an ogapi "area finder" util
    And I want to read an "area"
    When I try to find by...
      | field        | content              |
      | organization | area_organization    |
      | identifier   | mock_area_not_exists |
    Then response code should be: 404

  Scenario: Delete a area that
    And an ogapi "areas builder" util
    And I want to delete an "area"
    And the "organization" "area_organization"
    And the "identifier" "mock_area"
    And I delete it
    Then response code should be: 200

  Scenario: Deleting an organization
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "area_organization"
    Then I delete it
    And response code should be: 200





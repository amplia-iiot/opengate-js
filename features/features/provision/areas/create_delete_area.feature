# features/provision/areas/create_delete_area.feature
@create_provision
@area
Feature: Delete and Create a area
  As a user of JsApi
  I want to create a are
  So, I can create a new area with the parametres that I have been defined

  Background:
  Given an apikey user by "2829be88-a7d7-4f51-aefc-3cc2385b6506"
    
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
   Then I create it
    And response code should be: 201
  
Scenario: Create and delete a area that does not exist
    And an ogapi "areas builder" util 
    And I want to create an "area"
    And the "organization" "area_organization"
    And the "name" "mock_area"
    And the "identifier" "mock_area"
    And the "description" "area description"
    And the "geometry" with... 
|                                                                                param                                                                               |
|                                                                              Polygon                                                                             |
|[[[2.173200845718384, 41.36735636905808], [2.279992198944092, 41.364771670743316], [2.2802926063537598, 41.36514206995068], [2.173200845718384, 41.36735636905808]]]|
    And the "entities" 
|entity1|entity2|
   Then I create it
    And response code should be: 201
    And I delete it
   Then response code should be: 200

Scenario: Create and update a area
    And an ogapi "areas builder" util 
    And I want to create an "area"
    And the "organization" "area_organization"
    And the "name" "mock_area"
    And the "identifier" "mock_area"
    And the "description" "area description"
    And the "geometry" with...
|                                                                                param                                                                               |
|                                                                              Polygon                                                                             |
|[[[2.173200845718384, 41.36735636905808], [2.279992198944092, 41.364771670743316], [2.2802926063537598, 41.36514206995068], [2.173200845718384, 41.36735636905808]]]|
    And the "entities" 
|entity1|entity2|
   Then I create it
    And response code should be: 201
   Then the "description" "area description updated"
    And I update it
   Then response code should be: 200
    And I delete it
   Then response code should be: 200

  Scenario: Create a area that already exists
        And an ogapi "areas builder" util 
    And I want to create an "area"
    And the "organization" "area_organization"
    And the "name" "mock_area"
    And the "identifier" "mock_area"
    And the "description" "area description"
    And the "geometry" with... 
|                                                                                param                                                                               |
|                                                                              Polygon                                                                             |
|[[[2.173200845718384, 41.36735636905808], [2.279992198944092, 41.364771670743316], [2.2802926063537598, 41.36514206995068], [2.173200845718384, 41.36735636905808]]]|
    And the "entities" 
|entity1|entity2|
   Then I create it
    And response code should be: 201
   Then I create it
    And response code should be: 400
   Then I delete it
    And response code should be: 200

  Scenario: Create area with incomplete parameters
    And an ogapi "areas builder" util 
    And I want to create an "area"
   Then I create it
    And throws an error equal to "There are required parameters that have not been set. Missing parameters: [identifier,organization,type,coordinates]" 

  Scenario: Deleting an organization
  Given an ogapi "organizations builder" util
   Then I want to delete an "organization"
    And the "name" "area_organization"
   Then I delete it
    And response code should be: 200

# features/provision/plans/create_organization_plan.feature
@create_provision
@create_organization_plan
@organization_plan
#@wip

Feature: Create a organization plan
  As a user of JsApi
  I want to create a organization plan
  So I can create a organization plan

  Background:
    #Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
    #TESTS WITH MOCK, ONLY TIMESERIES URIS: 
    Given with mock "organizationPlan" for "createDelete"

  Scenario: Creating an organization to use in create user
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "user_organization"
    And the "description" "user organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: Create and delete an organization plan that does not exist
    And an ogapi "organization plans builder" util with "user_organization"
    And I want to create a "organizationPlan"
    And the "name" "organizationPlanTest"
    And the "flowRate" with... 
      |param|
      |{"value": 2, "unit": "DAYS"}|
    And the "maxDeviceAmount" 1
    And the "maxStorageLifeTime" with...
      |param|
      |{"total": 2, "period": "DAYS"}|
    And I create it
    Then response code should be: 201
    And I delete it with location as a identifier
    Then response code should be: 200

   Scenario: Create an organization plan that already exists
    And an ogapi "organization plans builder" util with "user_organization"
    And I want to create a "organizationPlan"
    And the "name" "existsOrganizationPlan"
    And the "flowRate" with... 
      |param|
      |{"value": 2, "unit": "DAYS"}|
    And the "maxDeviceAmount" 1
    And the "maxStorageLifeTime" with...
      |param|
      |{"total": 2, "period": "DAYS"}|
    And I create it
    Then response code should be: 201
    Then I create it
    And response code should be: 400
    And I delete it with location as a identifier
    Then response code should be: 200

  Scenario: Create, update and delete a organization plan
    And an ogapi "organization plans builder" util with "user_organization"
    And I want to create a "organizationPlan"
    And the "name" "test_organization_plan"
    And the "flowRate" with... 
      |param|
      |{"value": 2, "unit": "DAYS"}|
    And the "maxDeviceAmount" 1
    And the "maxStorageLifeTime" with...
      |param|
      |{"total": 2, "period": "DAYS"}|
    Then I create it
    Then response code should be: 201
    Then I want to update a "organizationPlan"
    And the "name" "test_organization_plan"
    And the "flowRate" with... 
      |param|
      |{"value": 3, "unit": "MONTHS"}|
    And the "maxDeviceAmount" 2
    And the "maxStorageLifeTime" with...
      |param|
      |{"total": 3, "period": "MONTHS"}|
    And I update it with identfier from location
    And response code should be: 200
    And I delete it with location as a identifier
    Then response code should be: 200

  Scenario: Deleting a organization to use 
		Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "user_organization"
    Then I delete it
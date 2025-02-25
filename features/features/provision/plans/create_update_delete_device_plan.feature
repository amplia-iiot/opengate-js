# features/provision/plans/create_device_plan.feature
@create_provision
@create_device_plan
@organization_plan
@wip

Feature: Create a device plan
  As a user of JsApi
  I want to create a device plan
  So I can create a device plan

  Background:
    #Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
    #TESTS WITH MOCK, ONLY TIMESERIES URIS: 
    Given with mock "devicePlan" for "createDelete"

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

  Scenario: Create and delete an device plan that does not exist
    And an ogapi "device plans builder" util with "user_organization"
    And I want to create a "devicePlan"
    And the "name" "devicePlanTest"
    And the "flowRate" with... 
      |param|
      |{"value": 2, "unit": "DAYS"}|
    And I create it
    Then response code should be: 201
    And I delete it with location as a identifier
    Then response code should be: 200

   Scenario: Create an device plan that already exists
    And an ogapi "device plans builder" util with "user_organization"
    And I want to create a "devicePlan"
    And the "name" "existsDevicePlan"
    And the "flowRate" with... 
      |param|
      |{"value": 2, "unit": "DAYS"}|
    And I create it
    Then response code should be: 201
    Then I create it
    And response code should be: 400
    And I delete it with location as a identifier
    And response code should be: 200

  Scenario: Create, update and delete a device plan
    And an ogapi "device plans builder" util with "user_organization"
    And I want to create a "devicePlan"
    And the "name" "test_device_plan"
    And the "flowRate" with... 
      |param|
      |{"value": 2, "unit": "DAYS"}|
    Then I create it
    Then response code should be: 201
    Then I want to update a "devicePlan"
    And the "name" "test_device_plan"
    And the "flowRate" with... 
      |param|
      |{"value": 3, "unit": "MONTHS"}|
    And I update it with identfier from location
    And response code should be: 200
    And I delete it with location as a identifier
    Then response code should be: 200

  Scenario: Deleting a organization to use 
		Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "user_organization"
    Then I delete it
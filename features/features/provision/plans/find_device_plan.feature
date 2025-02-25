# features/provision/plans/find_device_plan.feature
@provision
@finder
@find_provision
@devicePlans
@find_devicePlans


Feature: Find a device plan
	As a user of JsApi
	I want to find an device plan
	So I can check if a device plan exists and get their information

	Background:
		Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
    #TESTS WITH MOCK, ONLY device plans URIS:  Given with mock "devicePlan" for "find"

	Scenario: Creating an device and user to use in create user
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

	Scenario: Create an user to use in find device plan
		And an ogapi "users builder" util
		And I want to create a "user"
		And the "email" "ogux_ogapi@amplia.com"
		And the "password" "Nvoiqewvouoiu32j@#!!"
		And the "workgroup" "user_organization"
		And the "domain" "user_organization"
		And the "profile" "admin"
		And the "countryCode" "ES"
		And the "langCode" "en"
		And the "name" "test name"
		And the "surname" "test surname"
		And the "description" "user description"
		And the "forcePasswordChange" false
		Then I delete it
		And I create it
		Then response code should be: 201

  Scenario: Create a device plan and find
    And an ogapi "device plans builder" util with "user_organization"
    And I want to create a "devicePlan"
    And the "name" "devicePlanTest"
    And the "flowRate" with... 
      |param|
      |{"value": 2, "unit": "DAYS"}|
    And I create it
    Then response code should be: 201
    
    And an ogapi "device plans finder" util
		Given I want to read a "devicePlans"
		When I try to find by...
			| field | content               |
			| organizationId | user_organization |
    Then response code should be: 200
    Then I can see into the result an "device plan list name" as "devicePlanTest"
    Then I can see into the result an "device plan list flowRate" as
      """
      {"value":2,"unit":"DAYS"}
      """
    
    And an ogapi "device plans finder" util
    Given I want to read a "devicePlans"

    When I try to find by...
      | field          | content                         |
      | organizationId | user_organization          |
      | Identifier    | from_data_identifier_previous_response |
    Then response code should be: 200
    Then I can see into the result an "device plan name" as "devicePlanTest"
    Then I can see into the result an "device plan flowRate" as
      """
      {"value":2,"unit":"DAYS"}
      """
    
    And an ogapi "device plans finder" util with "assignable"
    Then response code should be: 200
    And an ogapi "device plans finder" util with "administrable"
    Then response code should be: 200
    
    And an ogapi "device plans builder" util with "user_organization"
    And I want to delete a "devicePlan"
    And I delete it with location as a identifier
    Then response code should be: 200
	
	Scenario: Deleting an user and organization to use 
		Given an ogapi "users builder" util
    Then I want to delete a "user"
    And the "email" "ogux_ogapi@amplia.com"
    Then I delete it
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "user_organization"
    Then I delete it

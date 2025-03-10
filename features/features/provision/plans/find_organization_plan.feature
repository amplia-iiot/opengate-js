# features/provision/plans/find_organization_plan.feature
@provision
@finder
@find_provision
@organizationPlans
@find_organizatinPlans
@wip

Feature: Find a organization plan
	As a user of JsApi
	I want to find an organization plan
	So I can check if a organization plan exists and get their information

	Background:
		#Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
    Given with mock "organizationPlan" for "find"
    #TESTS WITH MOCK, ONLY organization plans URIS:  Given with mock "organizationPlan" for "find"

	Scenario: Creating an organization and user to use in create user
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

	Scenario: Create an user to use in find organization plan
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

  Scenario: Create a organization plan and find
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
    
    And an ogapi "organization plans finder" util
		Given I want to read a "organizationPlans"
		When I try to find by...
			| field | content               |
			| organizationId | user_organization |
    Then response code should be: 200
    Then I can see into the result an "organization plan list name" as "organizationPlanTest"
    Then I can see into the result an "organization plan list flowRate" as
      """
      {"value":2,"unit":"DAYS"}
      """
    Then I can see into the result an "organization plan list maxDeviceAmount" as 1
    Then I can see into the result an "organization plan list maxStorageLifeTime" as
      """
      {"total":2,"period":"DAYS"}
      """

    And an ogapi "organization plans finder" util
    Given I want to read a "organizationPlans"

    When I try to find by...
      | field          | content                         |
      | organizationId | user_organization          |
      | Identifier    | from_data_identifier_previous_response |
    Then response code should be: 200
    Then I can see into the result an "organization plan name" as "organizationPlanTest"
    Then I can see into the result an "organization plan flowRate" as
      """
      {"value":2,"unit":"DAYS"}
      """
    Then I can see into the result an "organization plan maxDeviceAmount" as 1
    Then I can see into the result an "organization plan maxStorageLifeTime" as
      """
      {"total":2,"period":"DAYS"}
      """
    And an ogapi "organization plans finder" util with "assignable"
    Then response code should be: 200
    And an ogapi "organization plans finder" util with "administrable"
    Then response code should be: 200
    
    And an ogapi "organization plans builder" util with "user_organization"
    And I want to delete a "organizationPlan"
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

# features/find_user.feature
@provision
@finder
@find_provision
@users
@find_user
@PHO-3531
Feature: Find an user
	As a user of JsApi
	I want to find an user
	So I can check if a user exists and get their information

	Background:
		Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in

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

	Scenario: Create an user to use in find user
		And an ogapi "users builder" util
		And I want to create a "user"
		And the "email" "ogux_ogapi@amplia.com"
		And the "password" "nvoiqewvouoiu32j@#!!"
		And the "workgroup" "user_organization"
		And the "domain" "user_organization"
		And the "profile" "admin"
		And the "countryCode" "ES"
		And the "langCode" "en"
		And the "name" "test name"
		And the "surname" "test surname"
		And the "description" "user description"
		Then I delete it
		And I create it
		Then response code should be: 201

	Scenario: Find an user that exists
		And an ogapi "user finder" util
		Given I want to read a "user"
		When I try to find by...
			| field | content               |
			| email | ogux_ogapi@amplia.com |
		Then I can see into the result an "user email" as "ogux_ogapi@amplia.com"
	
	Scenario: Find an user that not exists
		And an ogapi "user finder" util
		Given I want to read a "user"
		When I try to find by...
			| field | content            |
			| email | user@inventado.com |
		Then response code should be: 404
	
	Scenario: Deleting an user and organization to use 
		Given an ogapi "users builder" util
    Then I want to delete a "user"
    And the "email" "ogux_ogapi@amplia.com"
    Then I delete it
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "user_organization"
        Then I delete it

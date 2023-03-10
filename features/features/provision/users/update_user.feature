# features/update_user.feature
@provision
@update_provision
@users
@update_user
@urlParameters

Feature: Delete and Create an user
  As a user of JsApi
  I want to create an user
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
    
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

  Scenario: Create an user that does not exist
    Given an ogapi "users builder" util
    Then I want to create a "user"
    And the "email" "ogux_ogapi@amplia.com"
    And the "workgroup" "user_organization"
    And the "domain" "user_organization"
    And the "password" "nvoiqewvouoiu32j@#!!"
    And the "profile" "admin"
    And the "countryCode" "ES"
    And the "langCode" "en"
    And the "name" "test name"
    And the "surname" "test surname"
    And the "description" "user description"
    Then I delete it
    And I create it
    Then response code should be: 201

  Scenario: Update an user that already exists
    Given an ogapi "users builder" util
    Then I want to update a "user"
    And the "email" "ogux_ogapi@amplia.com"
    And the "workgroup" "user_organization"
    And the "domain" "user_organization"
    And the "countryCode" "ES"
    And the "langCode" "en"
    And the "name" "test name updated"
    And the "surname" "surname updated"
    And the "description" "user description updated"
    Then I update it
    And response code should be: 200

  Scenario: Update an user passwords that already exists
    Given an ogapi "users builder" util
    Then I want to update a "user"
    And the "domain" "user_organization"
    And the "email" "ogux_ogapi@amplia.com"
    And the "password" "nvoiqewvouoiu32j@#!!"
    Then I update password with "nvoiqewvouoiu32j"
    And response code should be: 200

  Scenario: Delete an user that already exists
    Given an ogapi "users builder" util
    Then I want to delete a "user"
    And the "email" "ogux_ogapi@amplia.com"
    Then I delete it
    And response code should be: 200


    Scenario: Deleting an user and organization to use 
		Given an ogapi "users builder" util
    Then I want to delete a "user"
    And the "email" "ogux_ogapi@amplia.com"
    Then I delete it
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "user_organization"
        Then I delete it


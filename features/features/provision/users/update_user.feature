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
    Given an apikey user by "require-real-apikey"
    And an ogapi "users builder" util


  Scenario: Create and delete an user that does not exist
    Then I want to create a "user"
    And the "email" "ogux_ogapi@amplia.com"
    And the "workgroup" "base_organization"
    And the "domain" "base_organization"
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
    Then I want to update a "user"
    And the "email" "ogux_ogapi@amplia.com"
    And the "workgroup" "base_organization"
    And the "domain" "base_organization"
    And the "countryCode" "ES"
    And the "langCode" "en"
    And the "name" "test name updated"
    And the "surname" "surname updated"
    And the "description" "user description updated"
    Then I update it
    And response code should be: 200

  Scenario: Update an user passwords that already exists
    Then I want to update a "user"
    And the "email" "ogux_ogapi@amplia.com"
    And the "password" "nvoiqewvouoiu32j@#!!"
    Then I update password with "nvoiqewvouoiu32j"
    And response code should be: 200

  Scenario: Delete an user that already exists
    Then I want to delete a "user"
    And the "email" "ogux_ogapi@amplia.com"
    Then I delete it
    And response code should be: 200


# features/create_delete_user.feature
@provision
@create_provision
@users
@create_delete_user
@urlParameters

Feature: Delete and Create an user
  As a user of JsApi
  I want to create an user
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "users builder" util
    And I want to create a "user"
    And the "email" "ogux_ogapi@amplia.com"
    And the "password" "nvoiqewvouoiu32j@#!!"
    And the "workgroup" "base_organization"
    And the "domain" "base_organization"
    And the "profile" "admin"
    And the "countryCode" "ES"
    And the "langCode" "en"
    And the "name" "test name"
    And the "surname" "test surname"
    And the "description" "user description"

  Scenario: Create and delete an user that does not exist
    Then I delete it
    And I create it
    Then response code should be: 201
    And I delete it
    Then response code should be: 200

  Scenario: Create an user that already exists
    Then I delete it
    And I create it
    Then response code should be: 201
    Then I create it
    And response code should be: 400
    Then I delete it
    And response code should be: 200


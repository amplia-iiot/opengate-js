# features/update_user.feature
@provision
@users
@resetpassword
@wip

Feature: Reset password when the user forgets it
  As a user of JsApi
  I want to reset password
  So, I can change the password when dthe user forgets it.

  Background:
    #TESTS WITH MOCK, ONLY TIMESERIES URIS: Given with mock "timeseries" for "filterFields"

  Scenario: Precondition - Prepare scenario
    Given an apikey user by "b4b508f3-d953-4f03-9da8-2dbb8c55172e"
    Then an ogapi "organizations builder" util
    And I want to create a "organization"
    And the "name" "resetPasswordOrganization"
    And the "description" "Organization test reset password"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    Then I create it
    Then response code should be: 201
    Given an ogapi "users builder" util
    Then I want to update a "user"
    And the "email" "resetpassword@amplia.com"
    And the "workgroup" "resetPasswordOrganization"
    And the "domain" "resetPasswordOrganization"
    And the "password" "Nvoiqewvouoiu32j@#!!"
    And the "profile" "admin"
    And the "countryCode" "ES"
    And the "langCode" "en"
    And the "name" "test name"
    And the "surname" "test surname"
    And the "description" "user description"
    Then I delete it
    And I create it
    Then response code should be: 201
  
  Scenario: Request new password
    Given an user remove her apikey
    Then an ogapi "users builder" util
    Then I want to update a "user"
    And the "email" "resetpassword@amplia.com"
    Then I request reset password
    Then response code should be: 200

  Scenario: Read mail, save token and set new password
    And I read reset password mail and save token
    Given an user remove her apikey
    Then an ogapi "users builder" util
    Then I want to update a "user"
    And the "email" "resetpassword@amplia.com"
    Then I update password with "Nvoiqewvouoiu32j@" and token
    Then response code should be: 200

  Scenario: Delete an user that already exists
    Given an apikey user by "b4b508f3-d953-4f03-9da8-2dbb8c55172e"
    Then an ogapi "users builder" util
    And I want to delete a "user"
    And the "email" "resetpassword@amplia.com"
    Then I delete it
    And response code should be: 200
    Given an ogapi "organizations builder" util
    Then I want to create a "organization"
    And the "name" "resetPasswordOrganization"
    And I delete it
    Then response code should be: 200


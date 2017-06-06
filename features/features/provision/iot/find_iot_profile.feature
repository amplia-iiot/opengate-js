# features/provision/iot/update_iot_profile.feature
@iot
@finder
@find_provision
@find_provision_iot
@find_iot_profile
Feature: Update a IoT Profile
  As a device of JsApi
  I want to update an IoT Profile
  So, I can update a IoT Profile with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"

 Scenario: delete, create a IoT profile that not exists 
 Given an ogapi "IoT profiles helper" util with... 
    |param|
    |base_organization|
    |{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    Then I delete it
    And an ogapi "IoT profiles builder" util with... 
    |param|
    |base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
    Then response code should be: 201

Scenario: find a IoT profile that exists     
    Given an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
    When I try to find by... 
		| field   | content            |
		| organization    | base_organization |
		| id    | profile_test |
    And response code should be: 200
    Then I can see into the result an "profile id" as "profile_test"

Scenario: find a IoT profile that not exists     
    Given an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
    When I try to find by... 
		| field   | content            |
		| organization    | base_organization |
		| id    | profile_not_exists |
    And response code should be: 404

Scenario: find a IoT profile that organization not exists     
    Given an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
    When I try to find by... 
		| field   | content            |
		| organization    | not_exists |
		| id    | profile_test |
    And response code should be: 404

Scenario: Delete a IoT profile that already exists 
   Given an ogapi "IoT profiles helper" util with... 
    |param|
    |base_organization|
    |{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I delete it
    Then response code should be: 200

# features/provision/iot/create_delete_iot_profile.feature
@iot
@create_provision
@create_provision_iot
@create_iot_profile
Feature: Delete and Create a IoT Profile
  As a device of JsApi
  I want to create an IoT Profile
  So, I can create a new IoT Profile with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "IoT profiles helper" util with... 
    |param|
    |base_organization|
    |{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    Then I delete it

 Scenario: Create and delete a IoT profile that not exists 
    Given an ogapi "IoT profiles builder" util with... 
    |param|
    |base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    Then I create it
    And response code should be: 201
    And an ogapi "IoT profiles helper" util with... 
    |param|
    |base_organization|
    |{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I delete it
    Then response code should be: 200
    

Scenario: Ddelete a IoT profile that not exists     
    Given an ogapi "IoT profiles helper" util with... 
    |param|
    |base_organization|
    |{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    Then I delete it
    Then response code should be: 400


Scenario: Create and delete a IoT profile that already exists 
   Given an ogapi "IoT profiles builder" util with... 
    |param|
    |base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
    Then response code should be: 201
    And an ogapi "IoT profiles builder" util with... 
    |param|
    |base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
    Then throws an error equal to "IoT Profile already exists"
    And an ogapi "IoT profiles helper" util with... 
    |param|
    |base_organization|
    |{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE", "flavours":[]}|
    And I delete it
    Then response code should be: 200

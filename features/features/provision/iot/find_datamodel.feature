# features/provision/iot/update_datamodel.feature
@iot
@finder
@datamodel
@find_provision
@find_provision_iot
@find_iot_profile
@find_datamodel
Feature: Update a Datamodel
  As a device of JsApi
  I want to update an Datamodel
  So, I can update a Datamodel with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"

 Scenario: delete, create a Datamodel that not exists 
 Given an ogapi "datamodels helper" util with... 
    |param|
    |base_organization|
    |{"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","categories":[]}|
    Then I delete it
    And an ogapi "datamodels builder" util with... 
    |param|
    |base_organization|
    And I want to create a "datamodel"
    And the "identifier" "profile_test"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
    Then response code should be: 201

Scenario: find a Datamodel that exists     
    Given an ogapi "datamodels finder" util
    And I want to read a "datamodel"
    When I try to find by... 
		| field   | content            |
		| organization    | base_organization |
		| id    | profile_test |
    And response code should be: 200
    Then I can see into the result an "datamodel identifier" as "profile_test"

Scenario: find a Datamodel that not exists     
    Given an ogapi "datamodels finder" util
    And I want to read a "datamodel"
    When I try to find by... 
		| field   | content            |
		| organization    | base_organization |
		| id    | profile_not_exists |
    And response code should be: 404

Scenario: find a Datamodel that organization not exists     
    Given an ogapi "datamodels finder" util
    And I want to read a "datamodel"
    When I try to find by... 
		| field   | content            |
		| organization    | not_exists |
		| id    | profile_test |
    And response code should be: 404

Scenario: Delete a Datamodel that already exists 
   Given an ogapi "datamodels helper" util with... 
    |param|
    |base_organization|
    |{"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","categories":[]}|
    And I delete it
    Then response code should be: 200

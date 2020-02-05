# features/provision/entities/create_delete_device_bulk_csv.feature
@provision
@create_provision
@entities_provision
@bulk_csv
@bulk_entities_csv
@bulk
@bulk_entities
@csv
@urlParameters

Feature: Delete and Create a device - bulk csv
  As a device of JsApi
  I want to create a device using csv file
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk_10"
    And the "description" "device organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: I want to create a device from csv file
    Given an ogapi "csv bulk builder" util with "organization_bulk_10" and "entities"
    And I read the file from "/file_test/bulk_simple_entities.csv"
    And I "create" it with bulk
    Then does not throws an error

  Scenario: I want to update a device from csv file
    Given an ogapi "csv bulk builder" util with "organization_bulk_10" and "entities"
    And I read the file from "/file_test/bulk_simple_entities.csv"
    And I "update" it with bulk
    Then does not throws an error

  Scenario: I want to delete a device from csv file
    Given an ogapi "csv bulk builder" util with "organization_bulk_10" and "entities"
    And I read the file from "/file_test/bulk_simple_entities.csv"
    And I "delete" it with bulk
    Then does not throws an error


  Scenario: Delete the organization
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk_10"
    Then I delete it
    And response code should be: 200
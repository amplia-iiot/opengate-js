# features/provision/entities/create_delete_device_bulk_csv_response_csv.feature
@provision
@create_provision
@entities_provision
@bulk_csv_response_csv
@bulk_entities_csv_response_csv
@bulk_response_csv
@bulk_entities_response_csv
@bulk
@bulk_entities
@csv
@urlParameters
#@fail_bulk
Feature: Delete and Create a device - one devices and response csv
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
    And the "plan" "TRIAL"
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: I want to create a device from csv file
    Given an ogapi "csv bulk builder" util with "organization_bulk_10" and "entities"
    And I read the file from "/file_test/bulk_simple_entities.csv"
    And I "create" it with bulk and response with format csv
    Then does not throws an error
    Then the content of file "result.csv" must match:
      """
      statusCode;location;errors\n201;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk_10\/devices\/device_bulk_c2;\n
      """

  Scenario: I want to create a device from csv file - duplicated error
    Given an ogapi "csv bulk builder" util with "organization_bulk_10" and "entities"
    And I read the file from "/file_test/bulk_simple_entities.csv"
    And I "create" it with bulk and response with format csv
    Then does not throws an error
    Then the content of file "result.csv" must match:
      """
      statusCode;location;errors\n400;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk_10\/devices\/device_bulk_c2;\[\{"code":"0x010114","message":"Entity duplicated\.","context":\[\]}]\n
      """

  Scenario: I want to update a device from csv file
    Given an ogapi "csv bulk builder" util with "organization_bulk_10" and "entities"
    And I read the file from "/file_test/bulk_simple_entities.csv"
    And I "update" it with bulk and response with format csv
    Then does not throws an error
    Then the content of file "result.csv" must match:
      """
      statusCode;location;errors\n200;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk_10\/devices\/device_bulk_c2;\n
      """

  Scenario: I want to delete a device from csv file
    Given an ogapi "csv bulk builder" util with "organization_bulk_10" and "entities"
    And I read the file from "/file_test/bulk_simple_entities.csv"
    And I "delete" it with bulk and response with format csv
    Then does not throws an error
    Then the content of file "result.csv" must match:
      """
      statusCode;location;errors\n200;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk_10\/devices\/device_bulk_c2;\n
      """


  Scenario: Delete the organization
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk_10"
    Then I delete it
    And response code should be: 200
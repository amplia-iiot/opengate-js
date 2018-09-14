# features/provision/entities/create_delete_2devices_bulk_json_response_csv.feature
@provision
@create_provision
@entities_provision
@bulk
@bulk_entities
@bulk_response_csv
@bulk_entities_response_csv
@bulk_json_response_csv
@bulk_entities_json_response_csv
@csv
Feature: Delete and Create a Device
  As a device of JsApi
  I want to create a device using json file
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk"
    And the "description" "device organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: I want to create a device from json file
    Given an ogapi "json bulk builder" util with "organization_bulk" and "entities"
    And I read the file from "/file_test/bulk_double_entities.json"
    And I "create" it with bulk and response with format csv
    Then does not throws an error
    Then the content of file "result.csv" must match:
      """
      statusCode;location;errors\n201;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk\/devices\/device_bulk_json_1;\n201;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk\/devices\/device_bulk_json_2;\n
      """

  Scenario: I want to create a device from json file - duplicated error
    Given an ogapi "json bulk builder" util with "organization_bulk" and "entities"
    And I read the file from "/file_test/bulk_double_entities.json"
    And I "create" it with bulk and response with format csv
    Then does not throws an error
    Then the content of file "result.csv" must match:
      """
      statusCode;location;errors\n400;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk\/devices\/device_bulk_json_1;\[\{"code":"0x010114","message":"Entity duplicated\.","context":\[\]}]\n400;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk\/devices\/device_bulk_json_2;\[\{"code":"0x010114","message":"Entity duplicated\.","context":\[\]},{"code":"0x010114","message":"Entity duplicated\.","context":\[\]},{"code":"0x010114","message":"Entity duplicated\.","context":\[\]},{"code":"0x010114","message":"Entity duplicated\.","context":\[\]}]\n
      """

  Scenario: I want to update a device from json file
    Given an ogapi "json bulk builder" util with "organization_bulk" and "entities"
    And I read the file from "/file_test/bulk_double_entities.json"
    And I "update" it with bulk and response with format csv
    Then does not throws an error
    Then the content of file "result.csv" must be:
      """
      statusCode;location;errors
      400;;[{"code":"0x010015","message":"Organization not exists.","context":[]}]
      400;;[{"code":"0x010017","message":"Organization is required.","context":[]},{"code":"0x010017","message":"Organization is required.","context":[]},{"code":"0x010017","message":"Organization is required.","context":[]},{"code":"0x010017","message":"Organization is required.","context":[]}]

      """

  Scenario: I want to delete a device from json file
    Given an ogapi "json bulk builder" util with "organization_bulk" and "entities"
    And I read the file from "/file_test/bulk_double_entities.json"
    And I "deleteAll" it with bulk and response with format csv
    And response code should be: 200
    Then the content of file "result.csv" must match:
      """
      statusCode;location;errors\n200;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk\/devices\/device_bulk_json_1;\n200;https:\/\/([\d\d\d]{1,3}\.){3}[\d\d\d]{1,3}:[\d\d\d]{1,4}\/v80\/provision\/organizations\/organization_bulk\/devices\/device_bulk_json_2;\n
      """

  Scenario: Delete the organization
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk"
    Then I delete it
    And response code should be: 200
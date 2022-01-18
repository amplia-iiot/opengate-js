# features/provision/entities/create_delete_device_bulk_csv.feature
@finder
@bulk
@provision_processors
@wip
Feature: Find bulk provision processors
  As a device of JsApi
  I want to find bulk with provision processors
  So, I can find a device 



  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Creating an organization to use in bulk
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "bulk_processors_provision"
    And the "description" "device organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: I want to create a device with bulk
    #TODO Given an ogapi "provision processor builder" util with "bulk_processors_provision"
	#TODO create provision processor
    Given an ogapi "bulk processor builder" util with "bulk_processors_provision" and responseId
    And I read the file from "/file_test/bulk_processor_simple.xlsx"
    And I "bulk" it with bulk with provision processor
    Then does not throws an error
	And an ogapi "bulk provision processor finder" util
	When I try to find by...
	| field        | content                         |
	| organization | bulk_processors_provision       |
    | id           | from_location_previous_response |
	And I want to read a "bulk provision processor"
	And response code should be: 200
	When I try to find by...
	| field        | content                         |
	| organization | bulk_processors_provision       |
    | id           | from_location_previous_response |
    | accept       | xlsx                            |
	And I want to read a "bulk provision processor"
	And response code should be: 200
	And I read the file from "result.xls"
	

  Scenario: Delete the organization
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "bulk_processors_provision"
    Then I delete it
    And response code should be: 200
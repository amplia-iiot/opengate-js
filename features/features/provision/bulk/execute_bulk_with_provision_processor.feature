# features/provision/entities/create_delete_device_bulk_csv.feature
@provision
@bulk
@provision_processors
@wip
Feature: Execute bulk  provision processors
  As a device of JsApi
  I want to execute bulk with provision processors
  So, I can create a device 

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
    And I "plan" it with bulk with provision processor
    And the content of response must be:
    """
{
	"rows": [
	{
		"row": 1,
		"planningResult": "OK",
		"plan": [
			{
				"action": "POST",
				"entityType": "device",
				"json": {
					"provision.device.identifier": {
						"_value": {
							"_current": {
								"value": "hola"
							}
						}
					},
					"provision.administration.organization": {
						"_value": {
							"_current": {
								"value": "organization_mc"
							}
						}
					},
					"provision.administration.channel": {
						"_value": {
							"_current": {
								"value": "default_channel"
							}
						}
					},
					"provision.administration.serviceGroup": {
						"_value": {
							"_current": {
								"value": "emptyServiceGroup"
							}
						}
					}
				}
			}
		]
	}]
}
    """
    And I "bulk" it with bulk with provision processor
    Then does not throws an error

  Scenario: Delete the organization
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "bulk_processors_provision"
    Then I delete it
    And response code should be: 200
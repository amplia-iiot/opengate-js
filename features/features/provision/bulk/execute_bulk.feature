# features/provision/entities/create_delete_device_bulk_csv.feature
@provision
@bulk
@provision_processors
Feature: Execute bulk
  As a device of JsApi
  I want to execute bulk
  So, I can create a device

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Creating an organization to use in bulk
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "bulk_execution"
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
    Given an ogapi "provision processors builder" util
    And I want to create a "provisionProcessors"
    And the "organization" "bulk_execution"
    And the "identifier" "provision_Processor_id_1"
    And the "name" "mockProvisionProcessors"
    And the "configurationParams" with...
      | param                                                                                     |
      | {"spreadsheet": {"sheetName": "Hoja1", "headerRow": 1,"resultColumnName": "ODM_Result" }} |
    And the "scriptProcessor" with...
      | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
      | { "script": "function normalizeRawObject(rawObject) {  try {  var normalizedObject =  { 'provision.device.identifier': { '_value': { '_current': { 'value': 'hola' } } }, 'provision.administration.organization': { '_value': { '_current': { 'value': 'organization_mc' } } }, 'provision.administration.channel': { '_value': { '_current': { 'value': 'default_channel' } } }, 'provision.administration.serviceGroup': { '_value': { '_current': { 'value': 'emptyServiceGroup' } } } }; return normalizedObject;  } catch (e) {  printLog('>> normalizeRawObject(): exception: ' + e);  throw e;  }  }  function actionsPlanning(normalizedObject) {  try {  var actions = [];  actions.push(CREATE_DEVICE_ACTION(normalizedObject)); return actions;  } catch (e) {  printLog('>> actionsPlanning(): exception: ' + e);  throw e;  }  }" } |
    Then I create it
    And response code should be: 201

    Then an ogapi "bulk execution builder" util with "bulk_execution" and responseId
    And I read the file from "/file_test/bulk_execution_simple.xls"
    And I "plan" it with bulk execution
    And the content of json response must be:
    """ 
	{"rows":[{"row":2,"planningResult":"OK","plan":[{"action":"POST","entityType":"device","json":{"provision.device.identifier":{"_value":{"_current":{"value":"hola"}}},"provision.administration.organization":{"_value":{"_current":{"value":"organization_mc"}}},"provision.administration.channel":{"_value":{"_current":{"value":"default_channel"}}},"provision.administration.serviceGroup":{"_value":{"_current":{"value":"emptyServiceGroup"}}}}}]}]}
    """
    And I read the file from "/file_test/bulk_execution_simple.xls"
    And I "bulk" it with bulk execution
    Then does not throws an error


  Scenario: Delete the organization
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "bulk_execution"
    Then I delete it
    And response code should be: 200
# features/provision/processors/create_delete_processors.feature
@provision
@processors
@create_processors

Feature: Delete and Create a processors
As a user of JsApi
I want to create a processors
So, I can create a new processors with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in processors tests
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "provisionProcessors"
        And the "description" "provisionProcessors organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Create and delete a processors that does not exist
        And an ogapi "provision processors builder" util
        And I want to create a "provisionProcessors"
        And the "organization" "provisionProcessors"
        And the "name" "mockProvisionProcessors"
        And the "configurationParams" with...
            | param                                                                                                                                                                |
            |     {"spreadsheet": {"sheetName": "PARA", "headerRow": 2,"resultColumnName": "ODM_Result" }} |
        And the "scriptProcessor" with...
            | param                                                                                                                                                                |
            |     {"script": "function normalizeRawObject(rawObject) { try { var normalizedObject = {}; return normalizedObject; } catch (e) { printLog('>> normalizeRawObject(): exception: ' + e); throw e; } } function actionsPlanning(normalizedObject) { try { var actions = []; return actions; } catch (e) { printLog('>> actionsPlanning(): exception: ' + e); throw e; } }"} |
        Then I create it
        And response code should be: 201
        Then I delete it with identfier from location        
        And response code should be: 200

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "provisionProcessors"
        Then I delete it
        And response code should be: 200
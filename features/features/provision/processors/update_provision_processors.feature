# features/provision/processors/update_provision_processors.feature
@provision
@processors
@update_processors

Feature: Delete and Create a processors
As a user of JsApi
I want to create a processors
So, I can create a new processors with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Update processors
        And an ogapi "provision processors builder" util
        And I want to update a "provisionProcessors"
        And the "organization" "provisionProcessors"
        And the "name" "mockProvisionProcessors"
        And the "identifier" "91010e20-1a55-4319-990d-c3752b501065"
        And the "configurationParams" with...
            | param                                                                                                                                                                |
            |     {"spreadsheet": {"sheetName": "PARA", "headerRow": 2,"resultColumnName": "ODM_Result" }} |
        And the "scriptProcessor" with...
            | param                                                                                                                                                                |
            |     {"script": "function normalizeRawObject(rawObject) { try { var normalizedObject = {}; return normalizedObject; } catch (e) { printLog('>> normalizeRawObject(): exception: ' + e); throw e; } } function actionsPlanning(normalizedObject) { try { var actions = []; return actions; } catch (e) { printLog('>> actionsPlanning(): exception: ' + e); throw e; } }"} |
        Then I update it
        And response code should be: 200
        Then the "mockProvisionProcessors" "mockProvisionProcessors2"
        And I update it
        Then response code should be: 200

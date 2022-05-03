# features/provision/areas/find_provision_processors.feature
@provision
@finder
@find_provision
Feature: Find an area
As a user of JsApi
I want to find an provisionProcessors
So I can check if a provisionProcessors exists and get their information

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in processors tests
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "provisionProcessors"
        And the "description" "provisionProcessor organization"
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

    Scenario: Find a provision processors that exists
        And an ogapi "provision processors finder" util
        And I want to read an "provisionProcessors"
        When I try to find by...
        | field        | content |
        | organizationId | provisionProcessors |
        Then response code should be: 200

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "provisionProcessors"
        Then I delete it
        And response code should be: 200





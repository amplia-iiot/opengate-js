# features/provision/bulk/create_delete_bulk_template.feature
@create_provision
@provision
@area
@create_bulk_template
Feature: Delete and Create a bulk template
As a user of JsApi
I want to create a bulk template
So, I can create a new bulk template with the parametres that I have been defined

    Background:
        Given an apikey user by "api-key"

    Scenario: Creating an organization to use in bulk template tests
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "bulk_template_organization"
        And the "description" "bulk template organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Create and delete a bulk template of type csv that does not exist
        And an ogapi "bulk template builder" util
        And I want to create an "bulk template"
        And the "organization" "bulk_template_organization"
        And the "identifier" "mock_bulk_template"
        And the "filetype" "csv"
        Then I create it
        And response code should be: 201
        And I delete it
        Then response code should be: 200

    Scenario: Create and delete a bulk template of type excel that does not exist
        And an ogapi "bulk template builder" util
        And I want to create an "bulk template"
        And the "organization" "bulk_template_organization"
        And the "identifier" "mock_bulk_template"
        And the "filetype" "excel"
        Then I create it
        And response code should be: 201
        And I delete it
        Then response code should be: 200

    Scenario: Create and update a bulk template of type csv
        And an ogapi "bulk template builder" util
        And I want to create an "bulk template"
        And the "organization" "bulk_template_organization"
        And the "identifier" "mock_csv_bulk_template"
        And the "filetype" "csv"
        Then I create it
        And response code should be: 201
        Then the "parser" with...
            | param |
            | {delimitier: ';', newline: '\n', quoteChar: "'", escapeChar: "'", header: false, dynamicTyping: 0, encoding: "UTF-8", comments: true}|
        And I update it
        Then response code should be: 200
        And I delete it
        Then response code should be: 200

    Scenario: Create and update a bulk template of type excel
        And an ogapi "bulk template builder" util
        And I want to create an "bulk template"
        And the "organization" "bulk_template_organization"
        And the "identifier" "mock_excel_bulk_template"
        And the "filetype" "excel"
        Then I create it
        And response code should be: 201
        Then the "parser" with...
            | param |
            | {header: false, encoding: "UTF-8", sheets: [0, 2]}|
        And I update it
        Then response code should be: 200
        And I delete it
        Then response code should be: 200

    Scenario: Create a bulk template that already exists
        And an ogapi "bulk template builder" util
        And I want to create an "bulk template"
        And the "organization" "bulk_template_organization"
        And the "identifier" "mock_bulk_template"
        And the "filetype" "csv"
        Then I create it
        And response code should be: 201
        Then I create it
        And response code should be: 400
        Then I delete it
        And response code should be: 200

    Scenario: Create bulk template with incomplete parameters
        And an ogapi "bulk template builder" util
        And I want to create an "bulk template"
        Then I create it
        And throws an error equal to "There are required parameters that have not been set. Missing parameters: [identifier,organization,filetype]"

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "bulk_template_organization"
        Then I delete it
        And response code should be: 200

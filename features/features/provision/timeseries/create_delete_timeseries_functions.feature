# features/features/provision/timeseries/create_delete_timeseries.feature
@create_provision
@provision
@timeseriesFunction
@create_timeseriesFunction

Feature: Delete and Create a timeseries aggregation function
    As a user of JsApi
    I want to create a timeseries aggregation function
    So, I can create a new timeserie with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in timeseries functions tests
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "timeserie_function_organization"
        And the "description" "timeseries function organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        And the "plan" "TRIAL"
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Create timeserie function that not exists
        Given an ogapi "timeseries functions builder" util
        And I want to create the next timeseries function:
        """
            {
                "organization": "timeserie_function_organization",
                "metadataFile": "/file_test/timeseries_functions_metadata.json",
                "scriptFile": "/file_test/timeseries_functions_test.js"
            }
        """
        And response code should be: 201
        Then I want to create an "timeseries function"
        And the "organization" "timeserie_function_organization"
        And I delete it with location as a identifier
        Then response code should be: 200

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "timeserie_function_organization"
        Then I delete it
        And response code should be: 200

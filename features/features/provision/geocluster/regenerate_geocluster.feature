# features/provision/areas/regenerate_geocluster.feature
@create_provision
@provision
@geocluster
Feature: Regenerate a geocluster
As a jsApi user
I want to regenerate a geocluster to update the geoclasterized entities

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: regenerate geocluster
        And an ogapi "regenerate geocluster" util
        And the "identifier" "mock_area"
        Then response code should be: 200
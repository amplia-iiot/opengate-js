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
        And an ogapi "geocluster builder" util
        And I want to create an "geocluster"
        And the "identifier" "entities.default"
        And I update it
        Then response code should be: 200
# features/provision/iot/create_delete_datamodel.feature
@provision
@iot
@datamodel
@create_provision
@create_provision_iot
@create_iot_profile
@create_datamodel
@allowedResourceType
Feature: Delete and Create a Datamodel
As a device of JsApi
I want to create an Datamodel
So, I can create a new Datamodel with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Delete previous data
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        Then I delete it

    Scenario: Create and delete a datamodel that not exists
        Given an ogapi "datamodels builder" util with...
            | param             |
            | base_organization |
        And I want to create a "datamodel"
        And the "identifier" "profile_test"
        And the "name" "profile_test"
        And the "version" "1.0"
        And the "description" "TESTING"
        And the "allowed resource type" "entity.device"
        Then I create it
        And response code should be: 201
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I delete it
        Then response code should be: 200


    Scenario: Delete a datamodel that not exists
        Given an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        Then I delete it
        Then response code should be: 400

    Scenario: Create and delete a datamodel that already exists
        Given an ogapi "datamodels builder" util with...
            | param             |
            | base_organization |
        And I want to create a "datamodel"
        And the "identifier" "profile_test"
        And the "name" "profile_test"
        And the "version" "1.0"
        And the "description" "TESTING"
        And the "allowed resource type" "entity.device"
        And I create it
        Then response code should be: 201
        And an ogapi "datamodels builder" util with...
            | param             |
            | base_organization |
        And I want to create a "datamodel"
        And the "identifier" "profile_test"
        And the "name" "profile_test"
        And the "version" "1.0"
        And the "description" "TESTING"
        And the "allowed resource type" "entity.device"
        And I create it
        Then response code should be: 400
        Then throws an error equal to "Element already exists"

    Scenario: Delete last datamodel
        Given an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_test","version":"1.0","description":"TESTING","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I delete it
        Then response code should be: 200

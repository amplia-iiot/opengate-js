# features/create_delete_device.feature
@provision
@subscribers_builder
@subscription_builder
@device_builder
@create_provision
@device_defaultFeed
@create_device
@entities_provision
@create_delete_device
Feature: Delete and Create a device 
As a device of JsApi
I want to create an device
So, I can create a new user with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "device_organization"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Create and delete a device that not exists
        Given the entity of type "devices builder" with "device_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                       | parent |
            | provision.administration.channel      | simple       | default_channel                             |        |
            | provision.administration.organization | simple       | device_organization                         |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                           |        |
            | provision.administration.defaultFeed  | simple       | feed_1                                      |        |
            | provision.device.identifier           | simple       | device_testing_cucumber_ogapi               |        |
            | provision.device.operationalStatus    | simple       | TEST                                        |        |
            | provision.device.serialNumber         | simple       | serialNumber_TEST                           |        |
            | provision.device.administrativeState  | simple       | TESTING                                     |        |
            | provision.device.name                 | simple       | OGUX Device GATEWAY tester                  |        |
            | provision.device.description          | simple       | OGUX Device tester full GATEWAY description |        |
            | provision.device.specificType         | simple       | CONCENTRATOR                                |        |
        Then I delete it
        And I create it
        And response code should be: 201
        And I delete it
        Then response code should be: 200

    @OUW-964
    Scenario: Create a device that already exists
        Given the entity of type "devices builder" with "device_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                       | parent |
            | provision.administration.channel      | simple       | default_channel                             |        |
            | provision.administration.organization | simple       | device_organization                         |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                           |        |
            | provision.device.identifier           | simple       | device_testing_cucumber_ogapi_bug           |        |
            | provision.device.operationalStatus    | simple       | TEST                                        |        |
            | provision.device.administrativeState  | simple       | TESTING                                     |        |
            | provision.device.name                 | simple       | OGUX Device GATEWAY tester                  |        |
            | provision.device.description          | simple       | OGUX Device tester full GATEWAY description |        |
            | provision.device.specificType         | simple       | CONCENTRATOR                                |        |
        And I create it
        And response code should be: 201
        And I create it
        And response code should be: 400
        And throws an error equal to "Entity duplicated"
        Then I delete it
        And response code should be: 200



    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "device_organization"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                         | parent |
            | provision.administration.channel      | simple       | default_channel               |        |
            | provision.administration.organization | simple       | device_organization           |        |
            | provision.device.identifier           | simple       | device_testing_cucumber_ogapi |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "device_organization"
        Then I delete it

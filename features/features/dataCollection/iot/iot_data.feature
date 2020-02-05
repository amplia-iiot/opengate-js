# features/dataCollection/iot/iot_data.feature
@iot_data
@download_
@csv
@urlParameters

Feature: Recollet iot data
    As a user of ogapi
    I want to create an entity and send iot data

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create an entity
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "iot_organization"
        And the "description" "iot organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: I want to create an entity
        Given the entity of type "devices builder" with "iot_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                       | parent |
            | provision.administration.channel      | simple       | default_channel                             |        |
            | provision.administration.organization | simple       | iot_organization                            |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                           |        |
            | provision.device.identifier           | simple       | iot_testing_entity                          |        |
            | provision.device.operationalStatus    | simple       | TEST                                        |        |
            | provision.device.administrativeState  | simple       | TESTING                                     |        |
            | provision.device.name                 | simple       | OGUX Device GATEWAY tester                  |        |
            | provision.device.description          | simple       | OGUX Device tester full GATEWAY description |        |
            | provision.device.specificType         | simple       | CONCENTRATOR                                |        |
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Create a Iot message
        Given an ogapi "deviceMessage builder" util
        And I want to create a "deviceMessage"
        And the "datastreamVersion" "0.0.1"
        And the "id" "iot_testing_entity"
        And I want to create a "datastream" with this element:
            | field | content     | type   |
            | id    | device.name | string |
        And I want to define "datapoints message" in "datastream"
        And I want to create a "datapoints message" with this element:
            | field | content         | type   |
            | value | recolected_name | string |
        And I want to define "datapoints message" in "datastream"
        And I want to define "datastream" in "deviceMessage"
        Then I create it
        And response code should be: 201
        Then I wait 15 seconds


    Scenario: I want to download csv
        And an ogapi "devices search" util
        When I add a filter and with
            | operator | key                                   | value            |
            | eq       | provision.administration.organization | iot_organization |

        When I build it with select...
            | datastreamId | fields                                  |
            | device.name  | [{"field" : "value", "alias": "name"} ] |
        And I download csv it
        Then response code should be: 200
        Then does not throws an error
        Then the content of file "search.csv" must be:
            """
            name
            recolected_name

            """

    Scenario: Create a Iot message
        Given an ogapi "deviceMessage builder" util
        And I want to create a "deviceMessage"
        And the "datastreamVersion" "0.0.1"
        And the "id" "iot_testing_entity"
        And I want to create a "datastream" with this element:
            | field | content         | type   |
            | id    | entity.location | string |
        And I want to define "datapoints message" in "datastream"
        And I want to create a "datapoints message" with this element:
            | field | content                                                                                                             | type |
            | value | {"position":{"type":"Point","coordinates":[-5.66194,43.5398]},"country":"Spain","postal":"28040","source":"MOBILE"} | json |
        And I want to define "datapoints message" in "datastream"
        And I want to define "datastream" in "deviceMessage"
        Then I create it
        And response code should be: 201
        Then I wait 15 seconds

    Scenario: I want to download csv
        And an ogapi "devices search" util
        When I add a filter and with
            | operator | key                                   | value            |
            | eq       | provision.administration.organization | iot_organization |

        When I build it with select...
            | datastreamId    | fields                                      |
            | entity.location | [{"field" : "value", "alias": "location"} ] |
        And I download csv it
        Then response code should be: 200
        Then does not throws an error
        Then the content of file "search.csv" must be:
            """
            location
            "{"postal":"28040","source":"MOBILE","position":{"coordinates":[-5.66194,43.5398],"type":"Point"},"country":"Spain"}"

            """

    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "iot_organization"
        When I try to define the entity with...
            | datastream                  | typeFunction | value              | parent |
            | provision.device.identifier | simple       | iot_testing_entity |        |
        And I delete it
        Then response code should be: 200
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "iot_organization"
        Then I delete it

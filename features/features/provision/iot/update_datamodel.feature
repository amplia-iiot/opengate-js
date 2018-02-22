# features/provision/iot/update_datamodel.feature
@iot
@datamodel
@update_provision
@provision
@update_provision_iot
@update_iot_profile
@update_datamodel
@allowedResourceType
Feature: Update a Datamodel
As a device of JsApi
I want to update an Datamodel
So, I can update a Datamodel with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: delete and Create a Datamodel that not exists
        Given an ogapi "datamodels helper" util with...
            | param                                                                                                       |
            | base_organization                                                                                           |
            | {"identifier":"profile_test","name":"profile_test","version":"1.0","description":"TESTING","allowedResourceTypes":["entity.device"],"categories":[]} |
        Then I delete it
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
        Then response code should be: 201
        And an ogapi "datamodels finder" util
        And I want to read a "datamodel"
        When I try to find by...
            | field        | content           |
            | organization | base_organization |
            | id           | profile_test      |
        Then response code should be: 200
        And I can see into the result an "datamodel name" as "profile_test"
        And I can see into the result an "datamodel version" as "1.0"
        And I can see into the result an "datamodel description" as "TESTING"

    ################################################################################################################

    Scenario: Update a Datamodel that exists
        And an ogapi "datamodels helper" util with...
            | param                                                                                                       |
            | base_organization                                                                                           |
            | {"identifier":"profile_test","name":"profile_test","version":"1.0","description":"TESTING","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I want to update a "datamodel"
        And the "name" "profile_change"
        And the "version" "2.0"
        And the "description" "CHANGE"
        And the "allowed resource type" "entity.device"
        And I update it
        Then response code should be: 200
        And an ogapi "datamodels finder" util
        And I want to read a "datamodel"
        When I try to find by...
            | field        | content           |
            | organization | base_organization |
            | id           | profile_test      |
        Then response code should be: 200
        And I can see into the result an "datamodel identifier" as "profile_test"
        And I can see into the result an "datamodel name" as "profile_change"
        And I can see into the result an "datamodel version" as "2.0"
        And I can see into the result an "datamodel description" as "CHANGE"

    ################################################################################################################

    Scenario: Add and remove category of Datamodel that exists
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I want to update a "datamodel"
        And the
            | method      | value                                           |
            | addCategory | {"name":"1category", "identifier": "1category"} |
            | addCategory | {"name":"2category", "identifier": "2category"} |

        And I update it
        Then response code should be: 200
        And an ogapi "datamodels finder" util
        And I want to read a "datamodel"
        When I try to find by...
            | field        | content           |
            | organization | base_organization |
            | id           | profile_test      |
        Then response code should be: 200
        And I can see into the result an "category[0] identifier" as "1category"
        And I can see into the result an "category[1] identifier" as "2category"
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I want to update a "datamodel"
        And the
            | method      | value                                           |
            | addCategory | {"name":"1category", "identifier": "1category"} |
            | addCategory | {"name":"2category", "identifier": "2category"} |
        And I update it
        Then response code should be: 200
        And the "removeCategory" "1category"
        And I update it
        Then response code should be: 200
        And an ogapi "datamodels finder" util
        And I want to read a "datamodel"
        When I try to find by...
            | field        | content           |
            | organization | base_organization |
            | id           | profile_test      |
        Then response code should be: 200
        And I can see into the result an "category[0] identifier" as "2category"

    ################################################################################################################

    Scenario: Add and remove datastreams of Datamodel that exists 1
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I delete it
        Then response code should be: 200
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
        Then response code should be: 201
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I want to update a "datamodel"
        And the
            | method      | value                                           |
            | addCategory | {"name":"1category", "identifier": "1category"} |
            | addCategory | {"name":"2category", "identifier": "2category"} |
        And the "add datastream" with...
            | param                                                                                                                                                                                                                                               |
            | 1category                                                                                                                                                                                                                                           |
            | {"identifier": "1category.example.test","name": "1category.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","category_1"], "schema" : { "type":"string"} } |
        And the "add datastream" with...
            | param                                                                                                                                                                                                                                               |
            | 2category                                                                                                                                                                                                                                           |
            | {"identifier": "2category.example.test","name": "2category.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","category_2"], "schema" : { "type":"string"} } |
        And I update it
        Then response code should be: 200
        And an ogapi "datamodels finder" util
        And I want to read a "datamodel"
        When I try to find by...
            | field        | content           |
            | organization | base_organization |
            | id           | profile_test      |
        Then response code should be: 200
        And I can see into the result an "category[0] identifier" as "1category"
        And I can see into the result an "category[0] datastream[0] identifier" as "1category.example.test"
        And I can see into the result an "category[1] identifier" as "2category"
        And I can see into the result an "category[1] datastream[0] identifier" as "2category.example.test"
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I want to update a "datamodel"
        And the
            | method      | value                                           |
            | addCategory | {"name":"1category", "identifier": "1category"} |
            | addCategory | {"name":"2category", "identifier": "2category"} |
        And the "add datastream" with...
            | param                                                                                                                                                                                                                                              |
            | 1category                                                                                                                                                                                                                                          |
            | {"identifier": "1category.example.test","name": "1category.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","category_1"], "schema" : { "type":"string"}} |
        And the "add datastream" with...
            | param                                                                                                                                                                                                                                              |
            | 2category                                                                                                                                                                                                                                          |
            | {"identifier": "2category.example.test","name": "2category.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","category_2"], "schema" : { "type":"string"}} |
        And the "add datastream" with...
            | param                                                                                                                                                                                                                                                                    |
            | 2category                                                                                                                                                                                                                                                                |
            | {"identifier": "2category.example.test.not.remove","name": "2category.example.test.not.remove","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","category_2"], "schema" : { "type":"string"}} |
        And I update it
        Then response code should be: 200
        And the "removeCategory" "1category"
        And the "remove datastream" with...
            | param                  |
            | 2category              |
            | 2category.example.test |
        And I update it
        Then response code should be: 200
        And an ogapi "datamodels finder" util
        And I want to read a "datamodel"
        When I try to find by...
            | field        | content           |
            | organization | base_organization |
            | id           | profile_test      |
        Then response code should be: 200
        And I can see into the result an "category[0] identifier" as "2category"
        And I can see into the result an "category[0] datastream[0] identifier" as "2category.example.test.not.remove"

    ################################################################################################################

    Scenario: Add and remove datastreams of Datamodel that exists 2
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I delete it
        Then response code should be: 200
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
        Then response code should be: 201
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I want to update a "datamodel"
        And the
            | method      | value                                           |
            | addCategory | {"name":"1category", "identifier": "1category"} |
            | addCategory | {"name":"2category", "identifier": "2category"} |
        And the "add datastream" with...
            | param                                                                                                                                                                                                                                          |
            | 1category                                                                                                                                                                                                                                      |
            | {"identifier": "1category.example.test","name": "1category.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","category_1"],"schema":{"type":"string"}} |
        And the "add datastream" with...
            | param                                                                                                                                                                                                                                          |
            | 2category                                                                                                                                                                                                                                      |
            | {"identifier": "2category.example.test","name": "2category.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","category_2"],"schema":{"type":"string"}} |
        And I update it
        Then response code should be: 200
        And the "update category" with...
            | param     |
            | 1category |
            | category1 |
        And the "update datastream" with...
            | param                                                                                                                                                                                                                                                    |
            | 2category                                                                                                                                                                                                                                                |
            | 2category.example.test                                                                                                                                                                                                                                   |
            | {"identifier": "category2.example.test","name": "category2.example.test","description": "for tests and update","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","category2"],"schema":{"type":"string"}} |
        And I update it
        And an ogapi "datamodels finder" util
        And I want to read a "datamodel"
        When I try to find by...
            | field        | content           |
            | organization | base_organization |
            | id           | profile_test      |
        Then response code should be: 200
        And I can see into the result an "category[0] identifier" as "1category"
        And I can see into the result an "category[0] datastream[0] identifier" as "1category.example.test"
        And I can see into the result an "category[1] identifier" as "2category"
        And I can see into the result an "category[1] datastream[0] identifier" as "category2.example.test"
    ################################################################################################################
    Scenario: Add and remove datastreams with qrating of Datamodel that exists
        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I delete it
        Then response code should be: 200
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
        Then response code should be: 201

        And an ogapi "qratings builder" util as "qrating"
        And I want to create a "qrating"
        And the "minRequired" on util "qrating" with...
            | param       |
            | minrequired |
            | 0           |
        And the "minDesired" on util "qrating" with...
            | param      |
            | minDesired |
            | 0          |
        And the "ideal" on util "qrating" with...
            | param      |
            | minDesired |
            | 0          |
        And the "maxDesired" on util "qrating" with...
            | param      |
            | maxDesired |
            | 10         |
        And the "maxAllowed" on util "qrating" with...
            | param      |
            | maxAllowed |
            | 10         |
        And the "maxScore" 10 on util "qrating"
        And the "version" "1.0" on util "qrating"

        And an ogapi "datastreams builder" util as "datastream"
        And I want to create a "datastream"
        And the "identifier" "test.build.datastream" on util "datastream"
        And the "name" "test.build.datastream" on util "datastream"
        And the "description" "datastream test" on util "datastream"
        And the "unit" on util "datastream" with...
            | param |
            | TS    |
            | TEST  |
            | T     |
        And the "period" "PULSE" on util "datastream"
        And the "schema" '{ "type" : "string" }' json on util "datastream"
        And the "qrating" "qrating" build on util "datastream"

        And an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I want to update a "datamodel"
        And the
            | method      | value                                           |
            | addCategory | {"name":"1category", "identifier": "1category"} |
            | addCategory | {"name":"2category", "identifier": "2category"} |
        And the "add datastream" with util build "datastream" and with...
            | param     |
            | 1category |
        And I update it
        Then response code should be: 200

        And an ogapi "datamodels finder" util
        And I want to read a "datamodel"
        When I try to find by...
            | field        | content           |
            | organization | base_organization |
            | id           | profile_test      |
        Then response code should be: 200
        And I can see into the result an "category[0] identifier" as "1category"
        And I can see into the result an "category[0] datastream[0] identifier" as "test.build.datastream"
        And I can see into the result an "category[0] datastream[0] qrating version" as "1.0"
        And I can see into the result an "category[1] identifier" as "2category"

    ################################################################################################################

    Scenario: Delete a Datamodel that already exists
        Given an ogapi "datamodels helper" util with...
            | param                                                                                                        |
            | base_organization                                                                                            |
            | {"identifier":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","allowedResourceTypes":["entity.device"],"categories":[]} |
        And I delete it
        Then response code should be: 200

################################################################################################################
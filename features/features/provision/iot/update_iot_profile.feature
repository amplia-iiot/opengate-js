# features/provision/iot/update_iot_profile.feature
@iot
@update_provision
@update_provision_iot
@update_iot_profile
Feature: Update a IoT Profile
  As a device of JsApi
  I want to update an IoT Profile
  So, I can update a IoT Profile with the parametres that I have been defined

  Background:
  Given an apikey user by "require-real-apikey"

 Scenario: delete and Create a IoT profile that not exists 
  Given an ogapi "IoT profiles helper" util with... 
|                                              param                                              |
|                                        base_organization                                        |
|{"id":"profile_test","name":"profile_test","version":"1.0","description":"TESTING","flavours":[]}|
   Then I delete it
    And an ogapi "IoT profiles builder" util with... 
|      param      |
|base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
   Then response code should be: 201
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "profile name" as "profile_test"
    And I can see into the result an "profile version" as "1.0"
    And I can see into the result an "profile description" as "TESTING"
################################################################################################################    
Scenario: Update a IoT profile that exists     
    And an ogapi "IoT profiles helper" util with... 
|                                              param                                              |
|                                        base_organization                                        |
|{"id":"profile_test","name":"profile_test","version":"1.0","description":"TESTING","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "name" "profile_change"
    And the "version" "2.0"
    And the "description" "CHANGE"
    And I update it
   Then response code should be: 200
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "profile name" as "profile_change"
    And I can see into the result an "profile version" as "2.0"
    And I can see into the result an "profile description" as "CHANGE"
    And I can see into the result an "flavour[0] name" as "profile_changeExampleFlavour"
################################################################################################################
Scenario: Add and remove flavour of IoT profile that exists     
    And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "add flavour" "1flavour"
    And the "add flavour" "2flavour"
    And I update it
   Then response code should be: 200
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "flavour[0] name" as "1flavour"
    And I can see into the result an "flavour[1] name" as "2flavour"
    And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "add flavour" "1flavour"
    And the "add flavour" "2flavour"
    And I update it
   Then response code should be: 200
    And the "remove flavour" "1flavour"
    And I update it
   Then response code should be: 200
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "flavour[0] name" as "2flavour"
################################################################################################################
Scenario: Add and remove datastreams of IoT profile that exists     
    And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I delete it
   Then response code should be: 200    
   And an ogapi "IoT profiles builder" util with... 
|      param      |
|base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
   Then response code should be: 201
   And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "add flavour" "1flavour"
    And the "add flavour" "2flavour"
    And the "add datastream" with...
|                                               param                                              |
|1flavour                                                                                 |
|{"id": "1flavour.example.test","name": "1flavour.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_1"]}|
    And the "add datastream" with...
|                                               param                                              |
|2flavour                                                                                 |
|{"id": "2flavour.example.test","name": "2flavour.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_2"]}|
    And I update it
   Then response code should be: 200
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "flavour[0] name" as "1flavour"
    And I can see into the result an "flavour[0] datastream[0] id" as "1flavour.example.test"
    And I can see into the result an "flavour[1] name" as "2flavour"
    And I can see into the result an "flavour[1] datastream[0] id" as "2flavour.example.test"
    And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "add flavour" "1flavour"
    And the "add flavour" "2flavour"
    And the "add datastream" with...
|                                               param                                              |
|1flavour                                                                                 |
|{"id": "1flavour.example.test","name": "1flavour.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_1"]}|
    And the "add datastream" with...
|                                               param                                              |
|2flavour                                                                                 |
|{"id": "2flavour.example.test","name": "2flavour.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_2"]}|
    And the "add datastream" with...
|                                               param                                              |
|2flavour                                                                                 |
|{"id": "2flavour.example.test.not.remove","name": "2flavour.example.test.not.remove","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_2"]}|
    And I update it
   Then response code should be: 200
    And the "remove flavour" "1flavour"
    And the "remove datastream" with...
| param |    
|2flavour    |
|2flavour.example.test   |
    And I update it
   Then response code should be: 200
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "flavour[0] name" as "2flavour"
    And I can see into the result an "flavour[0] datastream[0] id" as "2flavour.example.test.not.remove"
################################################################################################################
Scenario: Add and remove datastreams of IoT profile that exists     
    And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I delete it
   Then response code should be: 200    
   And an ogapi "IoT profiles builder" util with... 
|      param      |
|base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
   Then response code should be: 201
   And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "add flavour" "1flavour"
    And the "add flavour" "2flavour"
    And the "add datastream" with...
|                                               param                                              |
|1flavour                                                                                 |
|{"id": "1flavour.example.test","name": "1flavour.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_1"]}|
    And the "add datastream" with...
|                                               param                                              |
|2flavour                                                                                 |
|{"id": "2flavour.example.test","name": "2flavour.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_2"]}|
    And I update it
   Then response code should be: 200
    And the "update flavour" with...
| param |
| 1flavour |
| flavour1 |
    And the "update datastream" with...
| param |
| 2flavour |
|2flavour.example.test|
|{"id": "flavour2.example.test","name": "flavour2.example.test","description": "for tests and update","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour2"]}|
    And I update it
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "flavour[0] name" as "flavour1"
    And I can see into the result an "flavour[0] datastream[0] id" as "1flavour.example.test"
    And I can see into the result an "flavour[1] name" as "2flavour"
    And I can see into the result an "flavour[1] datastream[0] id" as "flavour2.example.test"
################################################################################################################
Scenario: Add and remove datastreams with qrating of IoT profile that exists     
    And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I delete it
   Then response code should be: 200    
   And an ogapi "IoT profiles builder" util with... 
|      param      |
|base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
   Then response code should be: 201
   
    And an ogapi "IoT qratings builder" util as "qrating"
    And I want to create a "IoT Qrating"
    And the "minRequired" on util "qrating" with...
    | param |
    | minrequied | 
    | 0 |
    And the "minDesired" on util "qrating" with...
    | param |
    | minDesired | 
    | 0 |
    And the "ideal" on util "qrating" with...
    | param |
    | minDesired | 
    | 0 |
    And the "maxDesired" on util "qrating" with...
    | param |
    | maxDesired | 
    | 10 |
    And the "maxAllowed" on util "qrating" with...
    | param |
    | maxAllowed | 
    | 10 |
    And the "maxScore" 10 on util "qrating"
    And the "version" "1.0" on util "qrating"

    And an ogapi "IoT datastreams builder" util as "datastream"
    And I want to create a "IoT Datastream"
    And the "id" "test.build.datastream" on util "datastream"
    And the "name" "test.build.datastream" on util "datastream"
    And the "description" "datastream test" on util "datastream"
    And the "unit" on util "datastream" with...
    |param|
    |TS|
    |TEST|
    |T|
    And the "period" "PULSE" on util "datastream"
    And the "qrating" "qrating" build on util "datastream"


And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "add flavour" "1flavour"
    And the "add flavour" "2flavour"
    And the "add datastream" with util build "datastream" and with...
    |param|
    |1flavour|

    And I update it
   Then response code should be: 200

    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "flavour[0] name" as "1flavour"
    And I can see into the result an "flavour[0] datastream[0] id" as "test.build.datastream"
    And I can see into the result an "flavour[0] datastream[0] qrating version" as "1.0"
    And I can see into the result an "flavour[1] name" as "2flavour"
################################################################################################################
Scenario: Fail remove all flavour and datastream
And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I delete it
   Then response code should be: 200    
   And an ogapi "IoT profiles builder" util with... 
|      param      |
|base_organization|
    And I want to create a "IoT Profile"
    And the "name" "profile_test"
    And the "version" "1.0"
    And the "description" "TESTING"
    And I create it
   Then response code should be: 201
   And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "add flavour" "1flavour"
    And the "add datastream" with...
|                                               param                                              |
|1flavour                                                                                 |
|{"id": "1flavour.example.test","name": "1flavour.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_1"]}|
    And I update it
   Then response code should be: 200
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "flavour[0] name" as "1flavour"
    And I can see into the result an "flavour[0] datastream[0] id" as "1flavour.example.test"
    And an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I want to update a "IoT Profile"
    And the "add flavour" "1flavour"
    And the "add datastream" with...
|                                               param                                              |
|1flavour                                                                                 |
|{"id": "1flavour.example.test","name": "1flavour.example.test","description": "for tests","period": "PULSE","unit": {"type": "SI","label": "beats/second","symbol": "bpm"},"tags": ["test","flavour_1"]}|
    And I update it
   Then response code should be: 200
    And the "remove datastream" with...
| param |    
|1flavour    |
|1flavour.example.test   |
And the "remove datastream" with...
| param |    
|1flavour    |
|1flavour.example.heart.rate   |
    And throws an error equal to "Datastream 1flavour.example.heart.rate can't remove, flavour 1flavour can't be empty"
    And the "remove flavour" "1flavour"
    And throws an error equal to "Flavour 1flavour can't remove, profile can't be empty"
    And I update it
   Then response code should be: 200
    And an ogapi "IoT profiles finder" util
    And I want to read a "IoT Profile"
   When I try to find by... 
|    field   |     content     |
|organization|base_organization|
|     id     |   profile_test  |
   Then response code should be: 200
    And I can see into the result an "flavour[0] name" as "1flavour"
    And I can see into the result an "flavour[0] datastream[0] id" as "1flavour.example.heart.rate"
################################################################################################################    
Scenario: Delete a IoT profile that already exists 
  Given an ogapi "IoT profiles helper" util with... 
|                                               param                                              |
|                                         base_organization                                        |
|{"id":"profile_test","name":"profile_change","version":"2.0","description":"CHANGE","flavours":[]}|
    And I delete it
   Then response code should be: 200
################################################################################################################
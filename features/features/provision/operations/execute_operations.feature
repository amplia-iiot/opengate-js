# features/provision/operations/execute_operations.feature
@provision
@device_builder
@execute_operations
@operations
@done
Feature: Execute ADMINISTRATIVE_STATUS_CHANGE operation
As a user of JsApi
I want to execute an ADMINISTRATIVE_STATUS_CHANGE operation
So that I can change the administrative status to some devices/subscriptions/subscribers/communications module

    Background:
        Given an apikey user by "require-real-apikey"
    Scenario: Precondition - Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "execute_operations_organization"
        And the "description" "execute operations organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        And the "plan" "TRIAL"
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Precondition - Create and delete an user that does not exist
        And an ogapi "users builder" util
        And I want to create a "user"
        And the "email" "ogux_ogapi@amplia.com"
        And the "password" "Nvoiqewvouoiu32j@#!!"
        And the "workgroup" "execute_operations_organization"
        And the "domain" "execute_operations_organization"
        And the "profile" "admin_domain"
        And the "countryCode" "ES"
        And the "langCode" "en"
        And the "name" "test name"
        And the "surname" "test surname"
        And the "description" "user description"
        And the "forcePasswordChange" false
        Then I delete it
        And I create it
        Then response code should be: 201

    Scenario: Precondition - I want to create an operation Type
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given an ogapi "operation type" util with "execute_operations_organization"
        Then I want to create an "operation type"
        And the "name" "SIM_REPLACEMENT_TEST"
        And the "title" "Refresh Information"
        And the "description" "On demand retrieving the Info"
        And the "fromCatalog" "SIM_REPLACEMENT"
        Then I create it
        And response code should be: 201
        Given an ogapi "operation type" util with "execute_operations_organization"
        Then I want to create an "operation type"
        And the "name" "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "ADMINISTRATIVE_STATUS_CHANGE"
        Then I create it
        And response code should be: 201
        Given an ogapi "operation type" util with "execute_operations_organization"
        Then I want to create an "operation type"
        And the "name" "UPDATE_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "UPDATE"
        Then I create it
        And response code should be: 201
        Given an ogapi "operation type" util with "execute_operations_organization"
        Then I want to create an "operation type"
        And the "name" "SET_DEVICE_PARAMETERS_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "SET_DEVICE_PARAMETERS"
        Then I create it
        And response code should be: 201
        Given an ogapi "operation type" util with "execute_operations_organization"
        Then I want to create an "operation type"
        And the "name" "GET_DEVICE_PARAMETERS_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "GET_DEVICE_PARAMETERS"
        Then I create it
        And response code should be: 201
        Given an ogapi "operation type" util with "execute_operations_organization"
        Then I want to create an "operation type"
        And the "name" "SET_CLOCK_EQUIPMENT_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "SET_CLOCK_EQUIPMENT"
        Then I create it
        And response code should be: 201
        
        

    Scenario: Precondition - I want to create an entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "execute_operations_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                              | parent |
            | provision.administration.channel      | simple       | default_channel                    |        |
            | provision.administration.organization | simple       | execute_operations_organization    |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                  |        |
            | provision.device.identifier           | simple       | execute_operations_device_cucumber |        |
            | provision.device.operationalStatus    | simple       | NORMAL                             |        |
            | provision.device.administrativeState  | simple       | ACTIVE                             |        |

        Then I create it
        And response code should be: 201
        Given the entity of type "subscriptions builder" with "execute_operations_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                          | parent |
            | provision.administration.channel                                       | simple       | default_channel                |        |
            | provision.administration.organization                                  | simple       | subscriber_organization        |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup              |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE                         |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | subscription_ogapi |        |

        Then I create it
        And response code should be: 201


    Scenario: Execute operation with default values
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the operationRetries by "[\"ERROR_TIMEOUT\"]"
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute immediately
        And append entities by "" as tag
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | execute_operations_device_cucumber |
        When I build it
        And I execute it
        Then response code should be: 201
        
    Scenario: Execute SIM_REPLACEMENT operation with entities that there are not the allowed type
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "SIM_REPLACEMENT_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And the parameters "{ \"icc\" : \"inventado\" }"
        And execute immediately
        And append entities by:
            | execute_operations_device_cucumber |
        When I build it
        And I execute it
        Then response error code sould be: 400
        And response specific error code sould be: "0x020002"

    Scenario: Execute ADMINISTRATIVE_STATUS_CHANGE operation and I append two times the same parameter and should have appended the last parameter set
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And execute immediately
        And append entities by:
            | execute_operations_device_cucumber |
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the parameters "{ \"admsts\" : \"INVALID\" }"
        When I build it
        And I execute it
        Then response contains a parameter "admsts" as name and "INVALID" as value

    
    Scenario: Execute a UPDATE operation
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "UPDATE_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And execute immediately
        And append entities by:
            | execute_operations_device_cucumber |
        And the parameters "{ \"bundleName\" : \"nombre\", \"bundleVersion\" : \"inventado\" }"
        When I build it
        And I execute it
        Then response error code sould be: 400
        And response specific error code sould be: "0x020006"

    
    #http://cm.amplia.es/jira/browse/OGODM-3229
    @OGODM-3229
    Scenario: Execute a SET_DEVICE_PARAMETERS operation
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "SET_DEVICE_PARAMETERS_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And execute immediately
        And append entities by "" as tag
        And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | execute_operations_device_cucumber |
        And the parameters "{ \"variableList\" : [{\"name\": \"var\", \"value\": \"1\"}, {\"name\": \"var\", \"value\": \"2\"}, {\"name\": \"var\", \"value\": \"3\"}] }"
        When I build it
        And I execute it
        Then response code should be: 201

    #http://cm.amplia.es/jira/browse/OGODM-3229
    @OGODM-3229
    Scenario: Execute a GET_DEVICE_PARAMETERS operation
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "GET_DEVICE_PARAMETERS_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And execute immediately
        And append entities by "" as tag
        And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | execute_operations_device_cucumber |
        And the parameters "{ \"variableList\" : [\"type1\", \"type2\", \"type3\"] }"
        When I build it
        And I execute it
        Then response code should be: 201
    
    Scenario: Execute a SET_CLOCK_EQUIPMENT operation
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "SET_CLOCK_EQUIPMENT_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And execute immediately
        And append entities by:
            | execute_operations_device_cucumber |
        And the parameters "{\"datetime\": { \"date\" : \"2016-09-16\", \"time\" : \"00:00:00\", \"dst\" : 123, \"timezone\" : 4} }"
        When I build it
        And I execute it
        Then response code should be: 201
        And response contains a parameter "datetime" as name and "{\"date\":\"2016-09-16\",\"time\":\"00:00:00\",\"dst\":123,\"timezone\":4}" as json value


    Scenario: Postcondition - I want to delete the entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "execute_operations_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                  | typeFunction | value                              | parent |
            | provision.device.identifier | simple       | execute_operations_device_cucumber |        |
        And I delete it
        Then response code should be: 200
        Given the entity of type "subscriptions builder" with "execute_operations_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                          | parent |
            | provision.device.communicationModules[].subscription.identifier          | simple       | subscription_ogapi |        |
        And I delete it
        Then response code should be: 200
        

    Scenario: Postcondition - Deleting an user
        Given an ogapi "users builder" util
        Then I want to delete a "user"
        And the "email" "ogux_ogapi@amplia.com"
        Then I delete it

    Scenario: Postcondition - Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "execute_operations_organization"
        Then I delete it
        And response code should be: 200
# features/features/filter/filter_timeseries_fields.feature

@filter_fields
@filtering
@urlParameters
@timeseries

Feature: Searching timeseries fields
     As a user of JsApi
     I want to get the searching fields

     Background:
          Given an apikey user by "require-real-apikey"
          #TESTS WITH MOCK, ONLY TIMESERIES URIS: Given with mock "timeseries" for "filterFields"

     Scenario: Creating an organization to use in timeseries tests
          Given an ogapi "organizations builder" util
          Then I want to create an "organization"
          And the "name" "timeserie_organization"
          And the "description" "timeserie organization"
          And the "country code" "ES"
          And the "lang code" "es"
          And the "time zone" "Europe/Andorra"
          And the "zoom" 10
          And the "location" with 1 and 1
          And the "plan" "TRIAL"
          Then I delete it
          Then I create it
          And response code should be: 201

     Scenario: Execute searching over assignable timeseries
          And an ogapi "timeseries builder" util
          And I want to create a "timeserie"
          And the "organization" "timeserie_organization"
          And the "name" "mockTimeserie"
          And the "timeBucket" 86400
          And the "identifierColumn" "Identifier"
          And the "bucketColumn" "bucket_id"
          And the "description" "timeserie description"
          And the "identifierColumn" "Identifier"
          And the "columns" with...
               | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
               | [{  "path": "device.communicationModules[0].subscription.traffic.sentBytes._current.value",  "name": "Daily sent bytes",  "filter": "NO",  "sort": false,  "aggregationFunction": "SUM"},{  "path": "device.communicationModules[0].subscription.traffic.receivedBytes._current.value",  "name": "Daily received bytes",  "filter": "NO",  "aggregationFunction": "SUM",  "sort": false},{  "path": "device.communicationModules[0].subscription.presence.unifiedPresence._current.value",  "name": "Last presence",  "filter": "YES",  "sort": false,  "aggregationFunction": "LAST"},{  "path": "device.communicationModules[0].subscription.mobile.signalStrength._current.value",  "name": "Average Signal strength",  "filter": "YES",  "sort": false,  "aggregationFunction": "AVG"}] |
          And the "context" with...
               | param                                                                                                                                                                                                                                                                                                                                                                           |
               | [{  "path": "provision.device.identifier._current.value",  "name": "Prov identifier",  "filter": "YES",  "sort": true},{  "path": "device.model._current.value.manufacturer",  "name": "Manufacturer",  "filter": "ALWAYS",  "sort": false},{  "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",  "name": "ICC",  "filter": "NO",  "sort": false}] |
          Then I create it
          And response code should be: 201

          And an ogapi "timeseries search" util with "timeserie_organization" and "from_location_previous_response"
          Given I want to search a "timeseries"
          When I get filter fields...
               | field         | content |
               | findAllFields |         |
          Then response data should has elements
          When I get filter fields...
               | field      | content |
               | findFields |         |
          Then response data should has elements
          When I get filter fields...
               | field         | content      |
               | findFieldPath | Manufacturer |
          Then response data should has elements
          When I get filter fields...
               | field         | content |
               | findFieldPath | ICC     |
          Then response data should has elements
          When I get filter fields...
               | field         | content          |
               | findFieldPath | Daily sent bytes |
          Then response data should has elements


          And an ogapi "timeseries builder" util
          And I want to delete a "timeserie"
          And the "organization" "timeserie_organization"
          And I delete it with location as a identifier
          Then response code should be: 200

     Scenario: Deleting an organization
          Given an ogapi "organizations builder" util
          Then I want to delete an "organization"
          And the "name" "timeserie_organization"
          Then I delete it
          And response code should be: 200



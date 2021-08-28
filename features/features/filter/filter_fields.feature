# features/filter_features/searching_filter_fields.feature

@filter_fields
@filtering
@urlParameters
@wip
@wip
Feature: Searching device fields
     As a user of JsApi
     I want to get the searching fields

     Background:
          Given an apikey user by "require-real-apikey"
          And an ogapi "entities search" util
          Given I want to search a "entities"


     Scenario: Execute searching over assignable entities
          When I get filter fields...
               | field      | content |
               | findFields |         |
          Then response data should has elements

     Scenario: Execute searching over assignable entities
          When I get filter fields...
               | field      | content |
               | findFields |         |
          Then response data should has elements

     Scenario: Execute searching over assignable certifentitiesicates
          When I get filter fields...
               | field      | content                |
               | findFields | device.model._current.value.manufacturer |
          Then response data should has elements




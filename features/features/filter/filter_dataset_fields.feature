# features/filter_features/searching_filter_fields.feature

@filter_fields
@filtering
@urlParameters

Feature: Searching datasets fields
     As a user of JsApi
     I want to get the searching fields

     Background:
          Given an apikey user by "require-real-apikey"
          And an ogapi "datasets search" util with "require-real-organization" and "require-real-dataset"
          Given I want to search a "datasets"


     Scenario: Execute searching over assignable datasets
          When I get filter fields...
               | field      | content |
               | findAllFields |   |
          Then response data should has elements

     Scenario: Execute searching over assignable datasets
          When I get filter fields...
               | field      | content |
               | findFields |         |
          Then response data should has elements

     Scenario: Execute searching over assignable datasets
          When I get filter fields...
               | field      | content                |
               | findFieldPath | Coll manufacturer |
          Then response data should has elements



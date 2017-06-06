# features/filter_features/searching_filter_fields.feature

@searching_filter_fields
@filtering
Feature: Searching device fields
  As a user of JsApi
  I want to get the searching fields
  So I can create a device

  Background:
    Given an apikey user by "require-real-apikey"
  	And an ogapi "certificates search" util
    Given I want to search a "certificates" 


 Scenario: Execute searching over assignable certificates
   When I try to search with... 
        | field          | content                          |
        | findFields     |                             |
   Then I get filter fields
   Then response data should has elements

Scenario: Execute searching over assignable certificates
   When I try to search with... 
        | field          | content                          |
        | findFields     |               |
   Then I get filter fields
   Then response data should has elements

Scenario: Execute searching over assignable certificates
   When I try to search with... 
        | field          | content                          |
        | findFields     | subscriber.relColl.col         |
   Then I get filter fields
   Then response data should has no elements




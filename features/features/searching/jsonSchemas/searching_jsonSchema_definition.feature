# features/searching/searching_fields_definition.feature
@fields_definition
@catalogs
@searching
Feature: Searching fields definition in catalog
  As a user of JsApi
  I want to search into fields definition catalog
  So I can add filter
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "fields definition search" util
    Given I want to search a "fields definition"

  Scenario: Execute searching
    When I build it
  	And I execute it
  	Then response code should be: 200

  Scenario Outline: Execute searching with parameter type
    When I try to search with...
    | field   | content |
    | type    | <type>  |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
<result>
    """

  Examples:
    | type        | result |
    | string      | {"fieldsDefinition":{"description":"Text based value","subtype":["text","password"]}} |
    | boolean     | {"fieldsDefinition":{"description":"Boolean based value","subtype":[]}} |
    | calendar    | {"fieldsDefinition":{"description":"Format is described in the ISO 8601 or in http://www.w3.org/TR/NOTE-datetime","subtype":["datetime","date","time"]}} |
    | address     | {"fieldsDefinition":{"description":"Network address value","subtype":["ip","ipv4","ipv6","mac48"]}} |
    | number      | {"fieldsDefinition":{"description":"Numeric value","subtype":["integer","float","percentage"]}} |
    | enumeration | {"fieldsDefinition":{"description":"Choice list values","subtype":["string","number"]}} |
    | array       | {"fieldsDefinition":{"description":"Array of values","subtype":["string","number"]}} |
    | coordinates | {"fieldsDefinition":{"description":"Object indicating coordinates and timestamp in geotime subtype","subtype":["geo","geotime","geojson"]}} |
    | topology    | {"fieldsDefinition":{"description":"Object indicating relations","subtype":["path","tree (not supported yet)"]}} |
    | object      | {"fieldsDefinition":{"description":"Not yet supported. For future uses only","subtype":[]}} |
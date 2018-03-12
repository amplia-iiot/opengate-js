# features/searching/basicTypes/basicTypes.feature
@searching
@searching_basicTypes
@basicTypes
Feature: Searching basicTypes 
  As a user of JsApi
  I want to search into basicTypes collection
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "basicTypes search" util
  
Scenario: Execute searching
    When I build it
    And I execute it
  	Then response code should be: 200   

Scenario: Execute searching with path
  Given an ogapi "basicTypes search" util
  And the path "$..coordinates"
  When I build it
  And I execute it
  Then response code should be: 200   
  And the result contains:
  """
{"public":true,"description":"A geographical coordinates","type":"array","maxItems":2,"items":{"type":"number"}}
  """


Scenario: Execute searching with path
  Given an ogapi "basicTypes search" util
  And the path "datamodelParamNameValue"
  When I build it
  And I execute it
  Then response code should be: 200   
  And the result contains:
  """
{"type":"object","properties":{"name":{"type":"string","title":"Id","description":"Id of the parameter"},"value":{"type":"string","title":"Value","description":"Value of the parameter"}},"required":["name","value"]}
  """

Scenario: Execute searching with path
  Given an ogapi "basicTypes search" util
  And the path "notFound"
  When I build it
  And I execute it
  Then response code should be: 200   
  And the result contains:
  """
  {"msg":"not Found"}
  """

Scenario: Execute searching with path
  Given an ogapi "basicTypes search" util
  Given I want to search a "basicTypes search" 
  And the "withPublicParameters" "true"
  When I build it
  And I execute it
  Then response code should be: 200   
  And the result contains:
  """
{"definitions":{"date":{"type":"string","format":"date","public":true,"title":"date","description":"date in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$"},"time":{"type":"string","format":"time","public":true,"title":"time","description":"time in ISO 8601","pattern":"^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$"},"timestamp":{"type":"string","format":"date-time","public":true,"title":"timestamp","description":"date & time in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(\\.([0-9]{3}))?[Z]?$"},"coordinates":{"public":true,"description":"A geographical coordinates","type":"array","maxItems":2,"items":{"type":"number"}},"location":{"public":true,"description":"A geojson enriched for OpenGate","type":"object","properties":{"position":{"type":"object","description":"compatible with geojson format","properties":{"type":{"type":"string","default":"Point"},"coordinates":{"type":"array","description":"Format [longitude, latitude]","minItems":2,"items":{"type":"number"},"additionalItems":false}},"required":["coordinates"]},"country":{"type":"string"},"region":{"type":"string"},"province":{"type":"string"},"town":{"type":"string"},"postal":{"type":"string"},"address":{"type":"string"},"source":{"type":"string","enum":["MOBILE","GPS","GLONASS","RTK","RFID","WIFI","ZIGBEE","LORA","SIGFOX-BASIC","SIGFOX-SPOTIT","UNKNOWN"],"javaEnumNames":["MOBILE","GPS","GLONASS","RTK","RFID","WIFI","ZIGBEE","LORA","SIGFOX_BASIC","SIGFOX_SPOTIT","UNKNOWN"]},"accuracy":{"type":"number","description":"position accuracy in meters"},"zoom":{"type":"number","description":"zoom for the web map"}}},"ipv4":{"type":"string","format":"ipv4","public":true,"title":"ipv4","description":"IPV4 format"},"ipv6":{"type":"string","format":"ipv6","public":true,"title":"ipv6","description":"IPV6 format"},"mac48":{"type":"string","public":true,"title":"mac48","description":"MAC48 format","pattern":"(([0-9A-Fa-f]{2}[-:]){5}[0-9A-Fa-f]{2})|(([0-9A-Fa-f]{4}){2}[0-9A-Fa-f]{4})"},"msisdn":{"public":true,"type":"string","minLength":7,"maxLength":15},"address":{"type":"object","public":true,"properties":{"type":{"type":"string","enum":["IPV4","IPV6","MAC48","UNKNOWN","SIGFOX","HOSTNAME"],"javaEnumNames":["IPV4","IPV6","MAC48","UNKNOWN","SIGFOX","HOSTNAME"]},"value":{"type":"string","title":"type","description":"value of the parameter"},"apn":{"type":"string"}}},"percentage":{"public":true,"type":"number","minimum":0,"maximum":100},"model":{"type":"object","public":true,"title":"Model","description":"","properties":{"name":{"type":"string"},"version":{"type":"string"},"manufacturer":{"type":"string"},"manufacturerOUI":{"type":"string"}}},"software":{"type":"object","public":true,"title":"Software","description":"","properties":{"name":{"type":"string"},"version":{"type":"string"},"type":{"type":"string","enum":["SOFTWARE","FIRMWARE"],"javaEnumNames":["SOFTWARE","FIRMWARE"]}}},"softwareList":{"type":"array","public":true,"items":{"type":"object","public":true,"title":"Software","description":"","properties":{"name":{"type":"string"},"version":{"type":"string"},"type":{"type":"string","enum":["SOFTWARE","FIRMWARE"],"javaEnumNames":["SOFTWARE","FIRMWARE"]}}}},"clock":{"type":"object","title":"Clock","public":true,"description":"","properties":{"datetime":{"type":"string","format":"date-time","public":true,"title":"timestamp","description":"date & time in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(\\.([0-9]{3}))?[Z]?$"},"timezone":{"type":"number"},"dst":{"type":"object","properties":{"enabled":{"type":"boolean"},"deviation":{"type":"number"},"begin":{"type":"string","format":"date-time","public":true,"title":"timestamp","description":"date & time in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(\\.([0-9]{3}))?[Z]?$"},"end":{"type":"string","format":"date-time","public":true,"title":"timestamp","description":"date & time in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(\\.([0-9]{3}))?[Z]?$"}}}}},"ogIdentifier":{"type":"string","public":true,"pattern":"^[a-zA-Z0-9_@.-]*$"},"ticketIdentifier":{"type":"string","public":true,"pattern":"^[a-zA-Z0-9_@.-]*$"},"form":{"type":"object","public":true,"title":"Form","properties":{"identifier":{"type":"string","title":"identifier","description":"unique identifier for the form"},"data":{"type":"object","title":"data","description":"data introduced in form"},"schema":{"type":"object","title":"schema","description":"JSON schema with the design of the form"},"view":{"type":"array","title":"view","description":"JSON array of form view definition"}},"required":["identifier","data","schema","view"]}}}
  """

# features/searching_mobile_phone_provider.feature
@searching
@mobile_phone_provider
@catalogs
Feature: Searching mobile phone provider in catalog
  As a user of JsApi
  I want to search into mobile phone provider catalog
  So I can add sorting, limit to search

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "mobile phone provider search" util
    Given I want to search a "mobile phone provider"

  Scenario: Execute searching
    When I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"mobilePhoneProvider":["MOVISTAR","VODAFONE","ORANGE","Xfera Móviles, SA","Euskaltel, SA","BT España Compañia de Servicios Globales de","Telecable de Asturias, SAU","R Cable y Telecomunicaciones Galicia, SA","Cableuropa, SAU","E-Plus Móviles, SL","Fonyou Telecom, SL","Jazz Telecom, SAU","Best Spain Telecom, SL","Barablu Móvil España, SLU","Vizzavi España, SL","Lycamobile, SL","Lleida Networks Serveis Telemátics, SL","Vivo, SA","Jasper Operator","Sigfox Operator"]}
      """

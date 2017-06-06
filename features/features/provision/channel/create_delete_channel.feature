# features/create_delete_channel.feature
@create_provision
@channel
Feature: Delete and Create a channel
  As a user of JsApi
  I want to create a channel
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    
  Scenario: Creating an organization to use in channels tests
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "ChannelOrganization"
    And the "description" "channel organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
	  And the "zoom" 10
    And the "location" with 1 and 1 
 	  Then I create it
 	  And response code should be: 201
  
  @ignore
  Scenario: Create a certificate
   Given an ogapi "certificates builder" util 
    And I want to create a "certificate"
  	Then the "name" "certificado_channel_name"
    And the "description" "certificado_channel_description"
  	And the "administrativeState" "ACTIVE"
  	And the "usages"
  	| CERT_SIGN |
    And the "tags"
    | channel |
    And the "hardwares"
    |{ "hardwareId" : "OpenGateSecure"}|
    And I read the file from "/file_test/root.cer"
    And I create it
  	Then response code should be: 201

  # http://cm.amplia.es/jira/browse/OUW-521
  @OUW-521
  Scenario: Create and delete a channel that does not exist
    And an ogapi "channels builder" util 
    And I want to create a "channel"
    And the "organization" "ChannelOrganization"
    And the "name" "channelUxTestName"
    And the "description" "channel description"
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200

# http://cm.amplia.es/jira/browse/OUW-521
  @OUW-521
  Scenario: Create and update a channel
    And an ogapi "channels builder" util 
    And I want to create a "channel"
    And the "organization" "ChannelOrganization"
    And the "name" "channelUxTestName"
    And the "description" "channel description"
    Then I create it
    And response code should be: 201
    Then the "description" "channel description updated"
    And I update it
    Then response code should be: 200
    And I delete it
    Then response code should be: 200

# http://cm.amplia.es/jira/browse/OUW-521
  @OUW-521
  Scenario: Create a channel that already exists
    And an ogapi "channels builder" util 
    And I want to create a "channel"
    And the "organization" "ChannelOrganization"
    And the "name" "channelUxTestName"
    And the "description" "channel description"
    Then I create it
    Then response code should be: 201
    Then I create it
    And response code should be: 400
    Then I delete it
    And response code should be: 200

  Scenario: Create channel with incomplete parameters
    And an ogapi "channels builder" util 
    And I want to create a "channel"
    Then I create it
    And throws an error equal to "There are required parameters that have not been set. Missing parameters: [name,organization]" 

# http://cm.amplia.es/jira/browse/OUW-521
  @OUW-521
  Scenario: Create channel with an inexistent certificate
    And an ogapi "channels builder" util 
    And I want to create a "channel"
    And the "organization" "ChannelOrganization"
    And the "name" "channelUxTestName"
    And the "description" "channel description"
    And the "certificate" "not existing certificate"
    Then I create it
    And throws an error equal to "Certificate not exists" 

  @ignore
  Scenario: Create channel with a certificate
    And an ogapi "channels builder" util 
    And I want to create a "channel"
    And the "organization" "ChannelOrganization"
    And the "name" "channelUxTestName"
    And the "description" "channel description"
    And the "certificate" "certificado_channel_name"
    Then I create it
    And throws an error equal to "Certificate not exists" 

  Scenario: Deleting an organization
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "ChannelOrganization"
 	  Then I delete it
 	  And response code should be: 200

  @ignore
  Scenario: Deleting a certificate
    Given an ogapi "certificates builder" util 
    And I want to delete a "certificate"
  	Then the "name" "certificado_channel_name"
    Then I delete it
 	  And response code should be: 200

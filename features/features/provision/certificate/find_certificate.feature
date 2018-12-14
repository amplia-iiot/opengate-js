# features/find_certificate.feature
@provision
@find_certificate
@certificates
@urlParameters
@fail
Feature: Find a certificate
	As a user of JsApi
	I want to find a certificate
	So I can check if a certificate exists and get their information

	Background:
		Given an apikey user by "require-real-apikey"
		Given an ogapi "certificate finder" util
		And I want to read a "certificate"

	Scenario: Create a certificate
		#And the "id" "certificate_cucumber_to_find"
		And the "name" "certificate_cucumber_to_find_name"
		And the "description" "certificate_cucumber_to_find_description"
		And the "administrativeState" "ACTIVE"
		And the "usages"
			| CERT_SIGN |
		And the "tags"
			| tag1 | tag2 |
		And the "hardwares"
			| { "hardwareId" : "OpenGateSecure"} |
		And I read the file from "/file_test/root.cer"
		And I create it
		Then does not throws an error

	Scenario: Find a certificate that exists
		When I try to find by...
			| field | content                      |
			| id    | certificate_cucumber_to_find |
		Then I can see into the result an "certificate name" as "certificate_cucumber_to_find_name"

	@ignore
	Scenario: Download a certificate that exists
		When I try to find by...
			| field  | content                      |
			| id     | certificate_cucumber_to_find |
			| format | x-pem-file                   |
		Then the content of file "certificate_cucumber_to_find.x-pem-file" must be:
			"""
			-----BEGIN CERTIFICATE-----
			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
			-----END CERTIFICATE-----
			"""
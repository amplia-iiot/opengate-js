# features/find_user.feature
@rules
@finder
@find_rules
@rules
@find_rules_functions
@find_rules_documentation
Feature: Find an ruleConfigurationsHelper, functions and documentation
As a user of JsApi
I want to find an functions and documentation of rules service
So I can check if a user exists and get their information

	Background:
		Given an apikey user by "require-real-apikey"
		And an ogapi "ruleConfigurationsHelper finder" util
		Given I want to read a "ruleConfigurationsHelper"

	Scenario: Find a functions
		When I try to find by...
			| field | content                |
			| functions ||
		Then response code should be: 200

	Scenario: Find a documentation
		When I try to find by...
			| field | content                |
			| documentaion ||
		Then response code should be: 200

	Scenario: Find a private documentation
		When I try to find by...
			| field | content                |
			| privateDocumentation ||
		Then response code should be: 200

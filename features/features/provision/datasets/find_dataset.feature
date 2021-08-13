# features/find_user.feature
@finder
@dataset
@find_dataset
Feature: Find a dataset
As a user of JsApi
I want to find a dataset
So I can check if a user exists and get their information

	Background:
		Given an apikey user by "require-real-apikey"
		And an ogapi "dataset finder" util
		Given I want to read a "dataset"

	Scenario: Find a datasets
		When I try to find by...
			| field | content                |
			| organizationId | dummyOrganization|
		Then response code should be: 200

	Scenario: Find a dataset
		When I try to find by...
			| field | content                |
			| organizationId | dummyOrganization|
			| datasetId | dummyDataset|
		Then response code should be: 200

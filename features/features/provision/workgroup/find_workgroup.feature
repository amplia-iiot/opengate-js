# features/find_workgroup.feature
@provision
@finder
@find_provision
@workgroup
Feature: Find an workgroup
As a user of JsApi
I want to find an workgroup
So I can check if a workgroup exists and get their information

	Background:
		Given an apikey user by "require-real-apikey"
		And an ogapi "workgroups finder" util
		Given I want to read a "workgroup"

	Scenario: Find an workgroup that exists
		When I try to find by...
			| field  | content           |
			| domain | base_organization |
			| name   | base_organization |
		Then I can see into the result an "workgroup name" as "base_organization"

	Scenario: Find an workgroup that not exists
		When I try to find by...
			| field  | content                |
			| domain | base_organization      |
			| name   | not existing workgroup |
		Then response code should be: 404

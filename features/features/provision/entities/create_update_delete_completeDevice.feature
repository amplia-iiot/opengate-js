# features/create_update_delete_completeDevice.feature
@provision
@new
@entities_provision
@create_provision
@device_defaultCreateBox
Feature: Delete and Create a device - complete device
As a device of JsApi
I want to create an device
So, I can create a new user with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"


    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "completeDevice_organization"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: I want to create a device with a Subscripción that NOt exist
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                       | parent     |
            | provision.administration.channel                                | simple       | default_channel             |            |
            | provision.administration.organization                           | simple       | completeDevice_organization |            |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup           |            |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_1     |            |
            | provision.device.operationalStatus                              | simple       | NORMAL                      |            |
            | provision.device.administrativeState                            | simple       | ACTIVE                      |            |
            | provision.device.communicationModules[].identifier              | complex      | CMBP_id_11                  | CMBP_id_11 |
            | provision.device.communicationModules[].subscription.identifier | complex      | SP_id_11                    | CMBP_id_11 |
        Then I create it
        Then I delete it all
        And response code should be: 200

    Scenario: I want to create a device with a Subscriber that NOt exist
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                       | parent     |
            | provision.administration.channel                              | simple       | default_channel             |            |
            | provision.administration.organization                         | simple       | completeDevice_organization |            |
            | provision.administration.serviceGroup                         | simple       | emptyServiceGroup           |            |
            | provision.device.identifier                                   | simple       | complete_device_ogapi_2     |            |
            | provision.device.operationalStatus                            | simple       | NORMAL                      |            |
            | provision.device.administrativeState                          | simple       | ACTIVE                      |            |
            | provision.device.communicationModules[].identifier            | complex      | CMBB_id_11                  | CMBB_id_11 |
            | provision.device.communicationModules[].subscriber.identifier | complex      | SB_id_11                    | CMBB_id_11 |
        Then I create it
        Then I delete it all
        And response code should be: 200

    Scenario: I wan to create a device with a subscription that EXIST
        Given the entity of type "subscriptions builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                               | typeFunction | value                       | parent |
            | provision.administration.channel                                         | simple       | default_channel             |        |
            | provision.administration.organization                                    | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                                    | simple       | emptyServiceGroup           |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | sbp_ogapi_CD                |        |
        Then I create it
        And response code should be: 201
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                       | parent     |
            | provision.administration.channel                                | simple       | default_channel             |            |
            | provision.administration.organization                           | simple       | completeDevice_organization |            |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup           |            |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_3     |            |
            | provision.device.operationalStatus                              | simple       | NORMAL                      |            |
            | provision.device.administrativeState                            | simple       | ACTIVE                      |            |
            | provision.device.communicationModules[].identifier              | complex      | CMBP_id_12                  | CMBP_id_12 |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_CD                | CMBP_id_12 |
        Then I create it
        Then I delete it all

    Scenario: I wan to create a device with a subscriber that EXIST
        Given the entity of type "subscribers builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                       | parent |
            | provision.administration.channel                                       | simple       | default_channel             |        |
            | provision.administration.organization                                  | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup           |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].subscriber.identifier          | simple       | sbb_ogapi_CD                |        |
        Then I create it
        And response code should be: 201
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                       | parent     |
            | provision.administration.channel                              | simple       | default_channel             |            |
            | provision.administration.organization                         | simple       | completeDevice_organization |            |
            | provision.administration.serviceGroup                         | simple       | emptyServiceGroup           |            |
            | provision.device.identifier                                   | simple       | complete_device_ogapi_4     |            |
            | provision.device.operationalStatus                            | simple       | NORMAL                      |            |
            | provision.device.administrativeState                          | simple       | ACTIVE                      |            |
            | provision.device.communicationModules[].identifier            | complex      | CMBB_id_12                  | CMBB_id_12 |
            | provision.device.communicationModules[].subscriber.identifier | complex      | sbb_ogapi_CD                | CMBB_id_12 |
        Then I create it
        Then I delete it all


    Scenario: I wan to create a device with a subscription that EXIST and subscriber that NOT Exist
        Given the entity of type "subscriptions builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                               | typeFunction | value             | parent |
            | provision.administration.channel                                         | simple       | default_channel   |        |
            | provision.administration.organization                                    | simple       | base_organization |        |
            | provision.administration.serviceGroup                                    | simple       | emptyServiceGroup |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE            |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | sbp_ogapi_CB_1    |        |
        Then I create it
        And response code should be: 201
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                       | parent  |
            | provision.administration.channel                                | simple       | default_channel             |         |
            | provision.administration.organization                           | simple       | completeDevice_organization |         |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup           |         |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_5     |         |
            | provision.device.operationalStatus                              | simple       | NORMAL                      |         |
            | provision.device.administrativeState                            | simple       | ACTIVE                      |         |
            | provision.device.communicationModules[].identifier              | complex      | CM_CB_1                     | CM_CB_1 |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_CB_1              | CM_CB_1 |
            | provision.device.communicationModules[].subscriber.identifier   | complex      | sbb_ogapi_CB_1              | CM_CB_1 |

        Then I create it
        Then I delete it all

    Scenario: I wan to create a device with a subscription that NOT EXIST and subscriber that  Exist
        Given the entity of type "subscribers builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                       | parent |
            | provision.administration.channel                                       | simple       | default_channel             |        |
            | provision.administration.organization                                  | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup           |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].subscriber.identifier          | simple       | sbb_ogapi_CB_2              |        |
        Then I create it
        And response code should be: 201
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                       | parent  |
            | provision.administration.channel                                | simple       | default_channel             |         |
            | provision.administration.organization                           | simple       | completeDevice_organization |         |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup           |         |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_6     |         |
            | provision.device.operationalStatus                              | simple       | NORMAL                      |         |
            | provision.device.administrativeState                            | simple       | ACTIVE                      |         |
            | provision.device.communicationModules[].identifier              | complex      | CM_CB_2                     | CM_CB_2 |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_CB_2              | CM_CB_2 |
            | provision.device.communicationModules[].subscriber.identifier   | complex      | sbb_ogapi_CB_2              | CM_CB_2 |

        Then I create it
        Then I delete it all


    Scenario: I want to create the entity and update it with a subscriber that EXIST
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                       | parent |
            | provision.administration.channel      | simple       | default_channel             |        |
            | provision.administration.organization | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup           |        |
            | provision.device.identifier           | simple       | complete_device_ogapi_7     |        |
            | provision.device.operationalStatus    | simple       | NORMAL                      |        |
            | provision.device.administrativeState  | simple       | ACTIVE                      |        |
        Then I create it
        And response code should be: 201
        Given the entity of type "subscribers builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                       | parent |
            | provision.administration.channel                                       | simple       | default_channel             |        |
            | provision.administration.organization                                  | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup           |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].subscriber.identifier          | simple       | sbb_ogapi_U                 |        |
        Then I create it
        And response code should be: 201
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                       | parent |
            | provision.administration.channel                              | simple       | default_channel             |        |
            | provision.administration.organization                         | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                         | simple       | emptyServiceGroup           |        |
            | provision.device.identifier                                   | simple       | complete_device_ogapi_7     |        |
            | provision.device.operationalStatus                            | simple       | NORMAL                      |        |
            | provision.device.administrativeState                          | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].identifier            | complex      | CM_U_1                      | CM_U_1 |
            | provision.device.communicationModules[].subscriber.identifier | complex      | sbb_ogapi_U                 | CM_U_1 |

        Then I update it
        And response code should be: 200
        Then I delete it all
        And response code should be: 200

    Scenario: I want to create the entity and update it with a subscription that EXIST
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                       | parent |
            | provision.administration.channel      | simple       | default_channel             |        |
            | provision.administration.organization | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup           |        |
            | provision.device.identifier           | simple       | complete_device_ogapi_8     |        |
            | provision.device.operationalStatus    | simple       | NORMAL                      |        |
            | provision.device.administrativeState  | simple       | ACTIVE                      |        |
        Then I create it
        And response code should be: 201
        Given the entity of type "subscriptions builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                               | typeFunction | value                       | parent |
            | provision.administration.channel                                         | simple       | default_channel             |        |
            | provision.administration.organization                                    | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                                    | simple       | emptyServiceGroup           |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | sbp_ogapi_U                 |        |
        Then I create it
        And response code should be: 201
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                       | parent |
            | provision.administration.channel                                | simple       | default_channel             |        |
            | provision.administration.organization                           | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup           |        |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_8     |        |
            | provision.device.operationalStatus                              | simple       | NORMAL                      |        |
            | provision.device.administrativeState                            | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].identifier              | complex      | CM_U_2                      | CM_U_2 |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_U                 | CM_U_2 |
        Then I update it
        And response code should be: 200
        Then I delete it all
        And response code should be: 200

    Scenario: I want to create the entity and update it with a subscription that EXIST
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                       | parent |
            | provision.administration.channel      | simple       | default_channel             |        |
            | provision.administration.organization | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup           |        |
            | provision.device.identifier           | simple       | complete_device_ogapi_9     |        |
            | provision.device.operationalStatus    | simple       | NORMAL                      |        |
            | provision.device.administrativeState  | simple       | ACTIVE                      |        |
        Then I create it
        And response code should be: 201

        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                       | parent |
            | provision.administration.channel                                | simple       | default_channel             |        |
            | provision.administration.organization                           | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup           |        |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_9     |        |
            | provision.device.operationalStatus                              | simple       | NORMAL                      |        |
            | provision.device.administrativeState                            | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].identifier              | complex      | CM_U_3                      | CM_U_3 |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_U_ne              | CM_U_3 |
        Then I update it
        And response code should be: 200
        Then I delete it all
        And response code should be: 200

    Scenario: I want to create the entity and update it with a subscription that EXIST
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                       | parent |
            | provision.administration.channel      | simple       | default_channel             |        |
            | provision.administration.organization | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup           |        |
            | provision.device.identifier           | simple       | complete_device_ogapi_10    |        |
            | provision.device.operationalStatus    | simple       | NORMAL                      |        |
            | provision.device.administrativeState  | simple       | ACTIVE                      |        |
        Then I create it
        And response code should be: 201

        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                       | parent |
            | provision.administration.channel                              | simple       | default_channel             |        |
            | provision.administration.organization                         | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup                         | simple       | emptyServiceGroup           |        |
            | provision.device.identifier                                   | simple       | complete_device_ogapi_10    |        |
            | provision.device.operationalStatus                            | simple       | NORMAL                      |        |
            | provision.device.administrativeState                          | simple       | ACTIVE                      |        |
            | provision.device.communicationModules[].identifier            | complex      | CM_U_4                      | CM_U_4 |
            | provision.device.communicationModules[].subscriber.identifier | complex      | sbb_ogapi_U_ne              | CM_U_4 |
        Then I update it
        And response code should be: 200
        Then I delete it all
        And response code should be: 200

    @OGODM-3618
    Scenario: I want to separate the subscriber and the subscription from the device
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                       | parent        |
            | provision.administration.channel                                | simple       | default_channel             |               |
            | provision.administration.organization                           | simple       | completeDevice_organization |               |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup           |               |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_Split |               |
            | provision.device.operationalStatus                              | simple       | NORMAL                      |               |
            | provision.device.administrativeState                            | simple       | ACTIVE                      |               |
            | provision.device.communicationModules[].identifier              | complex      | ComM_Separate               | ComM_Separate |
            | provision.device.communicationModules[].subscriber.identifier   | complex      | sbb_ogapi_SP_split          | ComM_Separate |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_SP_split          | ComM_Separate |
        Then I create it
        And response code should be: 200
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                       | parent |
            | provision.administration.channel      | simple       | default_channel             |        |
            | provision.administration.organization | simple       | completeDevice_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup           |        |
            | provision.device.identifier           | simple       | complete_device_ogapi_Split |        |
            | provision.device.operationalStatus    | simple       | NORMAL                      |        |
            | provision.device.administrativeState  | simple       | ACTIVE                      |        |

        Then I update it
        And response code should be: 200
        Then I delete it
        And response code should be: 200
        Given the entity of type "subscribers builder" with "completeDevice_organization"
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value              | parent |
            | provision.device.communicationModules[].subscriber.identifier | simple       | sbb_ogapi_SP_split |        |
        And I delete it
        Then response code should be: 200
        Given the entity of type "subscriptions builder" with "completeDevice_organization"
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value              | parent |
            | provision.device.communicationModules[].subscription.identifier | simple       | sbp_ogapi_SP_split |        |
        And I delete it
        Then response code should be: 200


    @OGODM-3618
    Scenario: I want to associate the subscriber and the subscription from the device1 to device2
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                        | parent    |
            | provision.administration.channel                                | simple       | default_channel              |           |
            | provision.administration.organization                           | simple       | completeDevice_organization  |           |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup            |           |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_swap_1 |           |
            | provision.device.operationalStatus                              | simple       | NORMAL                       |           |
            | provision.device.administrativeState                            | simple       | ACTIVE                       |           |
            | provision.device.communicationModules[].identifier              | complex      | CM_swap_1                    | CM_swap_1 |
            | provision.device.communicationModules[].subscriber.identifier   | complex      | sbb_ogapi_from_1             | CM_swap_1 |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_from_1             | CM_swap_1 |
        Then I create it
        And response code should be: 200
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                        | parent |
            | provision.administration.channel      | simple       | default_channel              |        |
            | provision.administration.organization | simple       | completeDevice_organization  |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup            |        |
            | provision.device.identifier           | simple       | complete_device_ogapi_swap_1 |        |
            | provision.device.operationalStatus    | simple       | NORMAL                       |        |
            | provision.device.administrativeState  | simple       | ACTIVE                       |        |
        Then I update it
        And response code should be: 200
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                        | parent |
            | provision.administration.channel      | simple       | default_channel              |        |
            | provision.administration.organization | simple       | completeDevice_organization  |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup            |        |
            | provision.device.identifier           | simple       | complete_device_ogapi_swap_1 |        |
        Then I delete it
        And response code should be: 200
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                        | parent    |
            | provision.administration.channel                                | simple       | default_channel              |           |
            | provision.administration.organization                           | simple       | completeDevice_organization  |           |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup            |           |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_swap_2 |           |
            | provision.device.operationalStatus                              | simple       | NORMAL                       |           |
            | provision.device.administrativeState                            | simple       | ACTIVE                       |           |
            | provision.device.communicationModules[].identifier              | complex      | CM_swap_2                    | CM_swap_2 |
            | provision.device.communicationModules[].subscriber.identifier   | complex      | sbb_ogapi_from_1             | CM_swap_2 |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_from_1             | CM_swap_2 |
        Then I create it
        And response code should be: 200
        Then I delete it all


    Scenario: I want to associate the subscriber from the device1 to device2
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                       | parent     |
            | provision.administration.channel                              | simple       | default_channel             |            |
            | provision.administration.organization                         | simple       | completeDevice_organization |            |
            | provision.administration.serviceGroup                         | simple       | emptyServiceGroup           |            |
            | provision.device.identifier                                   | simple       | complete_device_ogapi_bug1  |            |
            | provision.device.operationalStatus                            | simple       | NORMAL                      |            |
            | provision.device.administrativeState                          | simple       | ACTIVE                      |            |
            | provision.device.communicationModules[].identifier            | complex      | CM_swap_b1                  | CM_swap_b1 |
            | provision.device.communicationModules[].subscriber.identifier | complex      | sbb_ogapi_from_d1           | CM_swap_b1 |
        Then I create it
        And response code should be: 200
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                       | parent    |
            | provision.administration.channel                                | simple       | default_channel             |           |
            | provision.administration.organization                           | simple       | completeDevice_organization |           |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup           |           |
            | provision.device.identifier                                     | simple       | complete_device_ogapi_bug2  |           |
            | provision.device.operationalStatus                              | simple       | NORMAL                      |           |
            | provision.device.administrativeState                            | simple       | ACTIVE                      |           |
            | provision.device.communicationModules[].identifier              | complex      | CM_swap_3                   | CM_swap_3 |
            | provision.device.communicationModules[].subscriber.identifier   | complex      | sbb_ogapi_from_d1           | CM_swap_3 |
            | provision.device.communicationModules[].subscription.identifier | complex      | sbp_ogapi_from_2            | CM_swap_3 |

        Then I create it
        And response code should be: 400
        Given the entity of type "devices builder" with "completeDevice_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                       | parent |
            | provision.administration.channel      | simple       | default_channel             |        |
            | provision.administration.organization | simple       | completeDevice_organization |        |
            | provision.device.identifier           | simple       | complete_device_ogapi_bug1  |        |
        Then I delete it all
        And response code should be: 200

    Scenario: Deleting an organization to use in the feature
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "completeDevice_organization"
        Then I delete it

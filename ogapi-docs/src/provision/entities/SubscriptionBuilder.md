+++
title = "Subscription Builder"
weight = 10
+++

Subscription builder. This builder give you the necessary tools to create a subscription using our OpenGate REST.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **organization** | `string` | ❌ | this is the organization name where subscription will be created |
| **allowedDatastreams** | `array` | ✅ | Allowed datastreams to add into the new subscription |
| **definedSchemas** | `array` | ✅ | Jsonschema about all OpenGate specific types |
| **jsonSchemaValidator** | `Validator` | ✅ | Json schema validator tool |


---


+++
title = "Subscriber Builder"
weight = 10
+++

Subscriber builder. This builder give you the necessary tools to create a subscriber using our OpenGate REST.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **organization** | `string` | ❌ | this is the organization name where subscriber will be created |
| **allowedDatastreams** | `array` | ✅ | Allowed datastreams to add into the new subscriber |
| **definedSchemas** | `array` | ✅ | Jsonschema about all OpenGate specific types |
| **jsonSchemaValidator** | `Validator` | ✅ | Json schema validator tool |


---


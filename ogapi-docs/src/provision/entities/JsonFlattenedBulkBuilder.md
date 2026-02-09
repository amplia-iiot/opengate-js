+++
title = "Json Flattened Bulk Builder"
weight = 10
+++

Json builder. This builder give you the necessary tools to create a json bulk using our OpenGate REST.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | required field. This is ogapi instance |
| **organization** | `string` | ❌ | required field. This is the organization name where entities will be created, updated or deleted |
| **resource** | `resource` | ❌ | required field. This is the resource used for the bulk provision |
| **timeout** | `number` | ✅ | timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception |
| **async** | `boolean` | ✅ | forces async execution for the bulk operation |


---


+++
title = "Complex Builder"
weight = 10
+++

This class extends SimpleBuilder to allow set complex values. What is a complex value? It is simple, It is a value 
that need a communications module identifier to allow set into the box.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **resource** | `string` | ❌ | this is the resource url where can be create/delete/update/read the entity |
| **allowedDatastreams** | `array` | ✅ | Allowed datastreams to add into the new entity |
| **definedSchemas** | `array` | ✅ | Jsonschema about all OpenGate specific types |
| **jsonSchemaValidator** | `Validator` | ✅ | Json schema validator tool |


---
## initFromFlattened(_flattenedEntityData)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **_flattenedEntityData** | `*` | ❌ |  |


---
## initFromJson(_jsonEntityData)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **_jsonEntityData** | `*` | ❌ |  |


---
## withComplex(_id, idCommunicationModules, val)


Set a complex value to entity

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **_id** | `string` | ❌ | Datastream identifier |
| **idCommunicationModules** | `string` | ❌ | Communications module identifier |
| **val** | `object` | ❌ | Value to set. |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---


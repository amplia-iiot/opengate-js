+++
title = "Simple Builder"
weight = 10
+++

**Class:** `SimpleBuilder`

This class allow set simple values.

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
## deleteAll()


This invoke a request to OpenGate North API and the callback is managed by promises
This function deletes a entity of provision


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## getAllowedDatastreams()




### Retorna

{{% notice tip %}}
**Tipo:** `array`
<br>
Allowed Datastream definition array
{{% /notice %}}

---
## getEntityKey()




### Retorna

{{% notice tip %}}
**Tipo:** `string`
<br>
Entity identifier
{{% /notice %}}

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
## patch()


This invoke a request to OpenGate North API and the callback is managed by promises
This function patch a entity of provision


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsBuilder().update()
```

---
## update()


This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a entity of provision


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsBuilder().update()
```

---
## with(_id, val)


Set new datastream value

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **_id** | `string` | ❌ | Datastream identifier |
| **val** | `objecr` | ❌ | Datastream value. If this value is null then datastream value will be removed. |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---


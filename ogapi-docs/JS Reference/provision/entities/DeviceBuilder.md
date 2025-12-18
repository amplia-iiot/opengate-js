+++
title = "Device Builder"
weight = 10
+++

**Class:** `DeviceBuilder`

Device builder. This builder give you the necessary tools to create a device using our OpenGate REST.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **organization** | `string` | ❌ | this is the organization name where device will be created |
| **allowedDatastreams** | `array` | ✅ | Allowed datastreams to add into the new device |
| **definedSchemas** | `array` | ✅ | Jsonschema about all OpenGate specific types |
| **jsonSchemaValidator** | `Validator` | ✅ | Json schema validator tool |
| **ms** | `number` | ❌ | timeout in milliseconds |


---
## create()


This invoke a request to OpenGate North API and the callback is managed by promises
This function create a entity of provision


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsBuilder().create()
```

---
## update()


This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a entity of provision and check if any subscriber/subscription exits or no. 
If a subscriber/subscription not exists then this entities will be created and after that will be added to entity box.


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.entityBuilder.devicesBuilder().update()
```

---


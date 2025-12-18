+++
title = "Connector Functions"
weight = 10
+++

**Class:** `ConnectorFunctions`

This is a base object than contains all you can about connector functions catalog

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ |  |
| **identifier** | `String` | ❌ |  |
| **connectorFunction** | `Object` | ❌ |  |


---
## addNorthCriteria(northCriteria)


Add northCriteria to parameter northCriterias. Each element is defined by path and value 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **northCriteria** | `Object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## addSouthCriteria(southCriteria)


Add southCriteria to parameter southCriterias. Each string can represent an URI, topic, OID...

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **southCriteria** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## create()


Create a new connector function catalog


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## withCloneable(cloneable)


Indicates whether or not the Connector Function is cloneable.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **cloneable** | `Boolean` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withDescription(description)


Description of the connector function. This field is optional.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **description** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withIdentifier(identifier)


Set the identifier 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **identifier** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withJavascript(javascript)


Connector function javascript code

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **javascript** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withName(name)


Descriptive and unique name

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withNorthCriterias(northCriterias)


Connector Function selection criteria for operation requests. This field is mandatory if Connector Function type is REQUEST. ⮕ [ each element is defined by path and value ]

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **northCriterias** | `Array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withOperationalStatus(operationalStatus)



Connector Function status
Allowed: DISABLED┃PRODUCTION┃TEST

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **operationalStatus** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withOperationName(operationName)


Used to filter connector functions by operation name. If Connector Function type is REQUEST, this field is mandatory and defined name must be an operation name available for specified Api Key. If the type is COLLECTION or RESPONSE, this field must be null.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **operationName** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withPayloadType(payloadType)


Enum of allowed types for connector function&#x27;s payload data. Request Connector Functions only accept JSON. 
Allowed: TEXT┃JSON┃BINARY

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **payloadType** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withSouthCriterias(southCriterias)


Connector Function selection criteria for operation responses and data collection. This field is mandatory if Connector Function type is COLLECTION or RESPONSE. ⮕ [ each string can represent an URI, topic, OID... ]. Each string can represent an URI, topic, OID...

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **southCriterias** | `Array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---
## withType(type)



Type of connector function, this is mandatory. Keep in mind that you will be not allowed to modify it.
Allowed: COLLECTION┃REQUEST┃RESPONSE

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **type** | `String` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ConnectorFunctionsCatalog`
<br>

{{% /notice %}}

---


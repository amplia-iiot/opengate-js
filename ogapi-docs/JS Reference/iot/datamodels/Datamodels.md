+++
title = "Datamodels"
weight = 10
+++

**Class:** `Datamodels`

This is a base object for create a IoT Datamodel

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **organization** | `string` | ❌ | Organization where the IoT datamodel will be created |


---
## addAllowedResourceType(resourceType)


Set the addAllowedResourceType attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **resourceType** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datamodels`
<br>

{{% /notice %}}

---
## addCategory(category, datastreams)


Add a flavor. If the field datastreams have value, they will add to this flavor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **category** | `Object` | ❌ |  |
| **datastreams** | `Array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datamodels`
<br>

{{% /notice %}}

---
## addDatastream(category, datastream)


Add a datastream to the indicated category

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **category** | `string` | ❌ |  |
| **datastream** | `object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datamodels`
<br>

{{% /notice %}}

---
## delete()


Delete not supported on this builder. Use IoTDatamodelHelper instead.



---
## update()


Update not supported on this builder. Use IoTDatamodelHelper instead.



---
## withDescription(description)


Set the description attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **description** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datamodels`
<br>

{{% /notice %}}

---
## withIdentifier(identifier)


Set the identifier attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **identifier** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datamodels`
<br>

{{% /notice %}}

---
## withName(name)


Set the name attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datamodels`
<br>

{{% /notice %}}

---
## withVersion(version)


Set the version attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **version** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datamodels`
<br>

{{% /notice %}}

---


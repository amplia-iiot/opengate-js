+++
title = "Datamodels Helper"
weight = 10
+++

This is a base object for update and delete a IoT Datamodel

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **organization** | `string` | ❌ | Organization where the IoT datamodel was create |
| **datamodel** | `object` | ❌ | Json object of IoT datamodel to modify or delete. |


---
## addCategory(category, datastreams)


Add a category. If the field datastreams have value, they will add to this category

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **category** | `Object` | ❌ |  |
| **datastreams** | `Array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DatamodelsHelper`
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
**Tipo:** `DatamodelsHelper`
<br>

{{% /notice %}}

---
## create()


Create not supported on this builder. Use IoTDatamodelHelper instead.



---
## removeCategory(category)


Remove category

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **category** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DatamodelsHelper`
<br>

{{% /notice %}}

---
## removeDatastream(category, id_datastream)


Remove datastream to the indicated category

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **category** | `string` | ❌ |  |
| **id_datastream** | `string` | ❌ | of datastream |

### Retorna

{{% notice tip %}}
**Tipo:** `DatamodelsHelper`
<br>

{{% /notice %}}

---
## updateCategory(old_category, new_category)


Update category name

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **old_category** | `string` | ❌ | name |
| **new_category** | `string` | ❌ | name |

### Retorna

{{% notice tip %}}
**Tipo:** `DatamodelsHelper`
<br>

{{% /notice %}}

---
## updateDatastream(category, id_datastream, datastream)


Update datastream to the indicated category

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **category** | `string` | ❌ |  |
| **id_datastream** | `string` | ❌ | of datastream |
| **datastream** | `Object` | ❌ | json object |

### Retorna

{{% notice tip %}}
**Tipo:** `DatamodelsHelper`
<br>

{{% /notice %}}

---
## withDescription(description)


Set the description attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **description** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DatamodelsHelper`
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
**Tipo:** `DatamodelsHelper`
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
**Tipo:** `DatamodelsHelper`
<br>

{{% /notice %}}

---


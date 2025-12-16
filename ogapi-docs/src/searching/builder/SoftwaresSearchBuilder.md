+++
title = "Softwares Search Builder"
weight = 10
+++

Defined a search over Datastreams    

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## fluentFilter





---
## tagsFilter





---
## withHardwareId(hardwareId)


Sets hardware id to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **hardwareId** | `string` | ❌ | hardware id |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.hardwareSearchBuilder().withHardwareId('myHardware').build()
```

---
## withId(softwareId)


Sets softwareId to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **softwareId** | `string` | ❌ | software id |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.softwareSearchBuilder().withId('mySoftwareId').build()
```

---
## withManufacturer(manufacturerName)


Set feedName to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **manufacturerName** | `string` | ❌ | manufacturer name |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.softwareSearchBuilder().withManufacturer('myManufacturer').build()
```

---
## withModel(modelName)


Set modelName to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **modelName** | `string` | ❌ | model name |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.softwareSearchBuilder().withModel('myModel').build()
```

---
## withModelVersion(modelVersion)


Set modelVersion to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **modelVersion** | `string` | ❌ | model version |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.softwareSearchBuilder().withModelVersion('myModelVersion).build()
```

---
## withName(softwareName)


Set softwareName to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **softwareName** | `string` | ❌ | software name |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.softwareSearchBuilder().withName('mySoftware').build()
```

---
## withType(softwareType)


Set softwareType to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **softwareType** | `string` | ❌ | software version |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.softwareSearchBuilder().withType('mySoftwareType).build()
```

---
## withVersion(softwareVersion)


Set softwareVersion to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **softwareVersion** | `string` | ❌ | software version |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.softwareSearchBuilder().withVersion('mySoftwareVersion).build()
```

---


+++
title = "Bundles"
weight = 10
+++

This is a base object that contains all you can do about Bundles.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## activate()


This invoke a request to OpenGate North API and the callback is managed by promises
This function activates a bundle


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.bundlesBuilder().activate()
```

---
## addDeploymentElement(progressEvent)


Create deployment element that is asociated to the Bundle

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **progressEvent** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.bundlesBuilder().newDeploymentElement()
```

---
## create()


Creates a new bundle


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.bundlesBuilder().create()
```

---
## deactivate()


This invoke a request to OpenGate North API and the callback is managed by promises
This function deactivates a bundle


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.bundlesBuilder().deactivate()
```

---
## deployAndActivate()


Deploy all elements of a bundle in only one method


### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.bundlesBuilder().deployAndActivate()
```

---
## update()


Updates a bundle


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.bundlesBuilder().update()
```

---
## withActive(active)


Set the active attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **active** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Bundles`
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
**Tipo:** `Bundles`
<br>

{{% /notice %}}

---
## withHardware(hardware)


Set the hardware attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **hardware** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Bundles`
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
**Tipo:** `Bundles`
<br>

{{% /notice %}}

---
## withPostaction(postactions)


Set the postactions attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **postactions** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Bundles`
<br>

{{% /notice %}}

---
## withPreaction(preaction)


Set the preaction attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **preaction** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Bundles`
<br>

{{% /notice %}}

---
## withTimeout(ms)


The request will have a specific time out if it will be exceeded then the promise throw an exception

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ms** | `number` | ❌ | timeout in milliseconds |

### Retorna

{{% notice tip %}}
**Tipo:** `Bundles`
<br>

{{% /notice %}}

---
## withUserNotes(userNotes)


Set the userNotes attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **userNotes** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Bundles`
<br>

{{% /notice %}}

---
## withVersion(version)


Set the version attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **version** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Bundles`
<br>

{{% /notice %}}

---
## withWorkgroup(workgroup)


Set the workgroup attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **workgroup** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Bundles`
<br>

{{% /notice %}}

---


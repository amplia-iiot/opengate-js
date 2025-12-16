+++
title = "Deployment Element"
weight = 10
+++

This is a base object that contains all you can do about Deployment Element.

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **context** | `*` | ❌ |  |
| **ogapi** | `*` | ❌ |  |
| **url** | `*` | ❌ |  |
| **progressEvent** | `*` | ❌ |  |


---
## createWithFile(rawFile)


This invoke a request to OpenGate North API and the callback is managed by promises
This method create an element deploymentElement

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `File` | ❌ | this File is the deployment element |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## deploy()


This invoke a request to OpenGate North API and the callback is managed by promises
This method create an element deploymentElement with previously assignated file


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## update()


This method invalidates the update option



---
## validation





---
## validation





---
## withDownloadUrl(downloadUrl)


Set the downloadUrl attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **downloadUrl** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withFile(rawFile)


Sets the file to upload

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withFileName(fileName)


Set the fileName attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **fileName** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
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
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withOldName(name)


Sets the old name attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withOldPath(path)


Sets the old path attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **path** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withOldVersion(version)


Sets the old version attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **version** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withOperation(operation)


Set the operation attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **operation** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withOption(option)


Set the option attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **option** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withOrder(order)


Set the order attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **order** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withPath(path)


Set the path attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **path** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
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
## withType(type)


Set the type attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **type** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withValidation(validation)


Set the validation attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **validation** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---
## withValidators(validators)


Set the validators attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **validators** | `Array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `DeploymentElement`
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
**Tipo:** `DeploymentElement`
<br>

{{% /notice %}}

---


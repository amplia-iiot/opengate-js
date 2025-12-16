+++
title = "Pipeline"
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
## addImageExecution(imageExecution)


Adds an Image Execution to the pipeline

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **imageExecution** | `ImageExecution` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---
## addRestResquest(restRequest)


Adds a rest request to the pipeline

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **restRequest** | `RestRequest` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---
## toJson()




### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## update()





---
## withIdentifier(identifier)


Sets the identifier attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **identifier** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---
## withOrganization(organization)


Set the organization attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Channels`
<br>

{{% /notice %}}

---
## withScheduleCronExpression(cronExpression)


Sets the crontab expression for schedule

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **cronExpression** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---
## withScheduleImmediateExecution(isImmediateExecution)


Sets the isImmediateExecution attribute for schedule

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **isImmediateExecution** | `boolean` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---


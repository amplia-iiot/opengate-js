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
**Tipo:** `{&quot;identifier&quot;: *, &quot;schedule&quot;: *, &quot;pipeline&quot;: *}`
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
**Tipo:** `Pipeline`
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
## withScheduleExecuteNow(executeNow)


Sets the executeNow attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **executeNow** | `boolean` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---
## withScheduleFrom(from)


Sets the from attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **from** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---
## withScheduleMinutesInterval(interval)


Sets the interval for schedule in minutes

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **interval** | `number` | ❌ | in minutes |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---
## withScheduleTo(to)


Sets the to attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **to** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Pipeline`
<br>

{{% /notice %}}

---


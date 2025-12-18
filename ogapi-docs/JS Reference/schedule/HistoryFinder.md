+++
title = "History Finder"
weight = 10
+++

**Class:** `HistoryFinder`

  This class allow make get request to planner resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findByOrganization(organization)


Download a complete list of scheduler history for the organization. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndSchedulerId(organization, schedulerId)


Download a complete list of scheduler history for the organization and type selected. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **schedulerId** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndType(organization, type)


Download a complete list of scheduler history for the organization and type selected. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **type** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## withLimit(limit)


Marks results limit

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **limit** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## withSchedulerId(schedulerId)


Set parameter schedulerIds

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **schedulerId** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## withSchedulerType(schedulerType)


Set parameter schedulerIds

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **schedulerType** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---


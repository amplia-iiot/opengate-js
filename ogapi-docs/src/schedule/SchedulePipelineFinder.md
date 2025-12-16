+++
title = "Schedule History Finder"
weight = 10
+++

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
## findByOrganizationAndType(organization, type)


Download a complete list of scheduler history for the organization. This execute a GET http method

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


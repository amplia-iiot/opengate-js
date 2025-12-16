+++
title = "Bulk Execution Finder"
weight = 10
+++

  This class allow make get request to bulk executions resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findByOrganizationAndId(organization, id, mimetype)


Download a specific entity by its organization and id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization. |
| **id** | `string` | ❌ | bulk id. |
| **mimetype** | `string` | ❌ | Format of file when get the result details of previously created bulk process. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


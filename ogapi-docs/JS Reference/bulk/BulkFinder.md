+++
title = "Bulk Finder"
weight = 10
+++

**Class:** `BulkFinder`

  This class allow make get request to bulk resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findByOrganizationAndId(organization, id, format, accept)


Download a specific entity by its organization and id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | entity organization . |
| **id** | `string` | ❌ | entity id. |
| **format** | `string` | ❌ | format response flag. |
| **accept** | `string` | ❌ | accept. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


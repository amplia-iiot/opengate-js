+++
title = "Entity Finder"
weight = 10
+++

**Class:** `EntityFinder`

  *   This class allow make get request to entity provisioned resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findByOrganizationAndId(organization, id, flattened)


Download a specific entity by its organization and id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | entity organization . |
| **id** | `string` | ❌ | entity id. |
| **flattened** | `string` | ❌ | flattened response flag. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


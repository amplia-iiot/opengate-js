+++
title = "Datamodels Finder"
weight = 10
+++

  This class allow make get request to organization resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findByOrganizationAndId(organization, id)


Download a specific IoT Datamodel by its organization and id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | datamodel organization . |
| **id** | `string` | ❌ | datamodel id. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


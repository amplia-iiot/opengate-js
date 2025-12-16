+++
title = "Model Finder"
weight = 10
+++

  This class allow make get request to hardware models resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findByOrganizationAndManufacturerAndId(organization, manufacturer, identifier)


Download a specific model by its id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | model organization . |
| **manufacturer** | `string` | ❌ | model manufacturer . |
| **identifier** | `string` | ❌ | model name . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


+++
title = "Bundle Finder"
weight = 10
+++

**Class:** `BundleFinder`

  This class allow make get request to certificate resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findByNameAndVersion(name, version)


Download a specific bundle by its name and version. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `string` | ❌ | bundle name . |
| **version** | `string` | ❌ | bundle version. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


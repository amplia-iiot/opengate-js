+++
title = "Timeseries Function Finder"
weight = 10
+++

  This class allow make get request to TimeseriesFunction resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findByOrganization(organization)


Performs a get that returns a list of timeseries function

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndName(organization, name, script)


Performs a get that returns a timeseries function metadata

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **name** | `string` | ❌ | Timeseries function Configuration name |
| **script** | `boolean` | ❌ | If true script content will be downloaded |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


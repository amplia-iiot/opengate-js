+++
title = "Timeseries Finder"
weight = 10
+++

  This class allow make get request to TimeseriesFinder resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findByOrganization(organization, expand, dataStreams)


Performs a get that returns list of timeseries

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **expand** | `Array` | ❌ | [&#x27;columns&#x27;, &#x27;context&#x27;] |
| **dataStreams** | `Array` | ❌ | [&quot;ds_id_1&quot;,&quot;ds_id_2&quot;] |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndName(organization, name)


Performs a get that returns a definition of timeserie

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **name** | `string` | ❌ | timeserie name |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndTimeserieId(organization, timeserieId)


Performs a get that returns a definition of timeserie

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **timeserieId** | `string` | ❌ | timeserie identifier |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


+++
title = "Static Search"
weight = 10
+++

This extends Search and it allow make request to any available resource into static resources for Opengate North API

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **url** | `string` | ❌ | this define a specific resource to make the search |
| **filter** | `object` | ❌ | this is the filter |


---
## execute()


This invoke a dummy request to OpenGate North API and the callback is managed by promises


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


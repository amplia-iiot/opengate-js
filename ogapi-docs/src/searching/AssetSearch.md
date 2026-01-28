+++
title = "Asset Search"
weight = 10
+++

This extends Search and allow make request to any available resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **url** | `string` | ❌ | this define a specific resource to make the search |
| **filter** | `object` | ❌ | this is the filter |
| **limit** | `object` | ❌ | this is the pagination about the search |
| **sort** | `object` | ❌ | this defined parameters to order the result of search |
| **group** | `object` | ❌ | this defined the group by |


---
## execute()


This invoke a request to OpenGate North API and the callback is managed by promises


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


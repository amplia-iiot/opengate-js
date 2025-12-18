+++
title = "Entity Search"
weight = 10
+++

**Class:** `EntitySearch`

This extends Search and it allow make request to any available resource into /entities resource at Opengate North API

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **url** | `string` | ❌ | this define a specific resource to make the search |
| **filter** | `object` | ❌ | this is the filter |
| **limit** | `object` | ❌ | this is the pagination about the search |
| **sort** | `object` | ❌ | this define parameters to order the result of search |
| **group** | `object` | ❌ | this define parameters to group |
| **select** | `object` | ❌ | this define fields to retrieve |


---
## execute()


This invoke a request to OpenGate North API and the callback is managed by promises


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


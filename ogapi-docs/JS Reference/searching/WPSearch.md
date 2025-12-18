+++
title = "WP Search"
weight = 10
+++

**Class:** `WPSearch`

This extends BaseSearch and allow make request to any available resource into Opengate North API.
The resource does not have the 'search' prefix. For this, use class Search

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **url** | `string` | ❌ | this define a specific resource to make the search |
| **filter** | `object` | ❌ | this is the filter |
| **limit** | `object` | ❌ | this is the pagination about the search |
| **sort** | `object` | ❌ | this defined parameters to order the result of search |
| **group** | `object` | ❌ |  |
| **select** | `object` | ❌ |  |
| **timeout** | `nubmer` | ❌ |  |


---


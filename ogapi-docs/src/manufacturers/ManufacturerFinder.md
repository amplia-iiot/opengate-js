+++
title = "Manufacturer Finder"
weight = 10
+++

  This class allow make get request to hardware manufacturers resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findAll()


Download a specific manufacturer by its id. This execute a GET http method


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findById(identifier)


Download a specific manufacturer by its id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **identifier** | `string` | ❌ | manufacturer identifier . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findMediaById(manufacturerId, mediaIdentifier)


Download a specific manufacturer media by its ids. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **manufacturerId** | `string` | ❌ | manufacturer identifier . |
| **mediaIdentifier** | `string` | ❌ | media identifier. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findMedias(manufacturerId)


Download manufacturer medias. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **manufacturerId** | `string` | ❌ | manufacturer identifier . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


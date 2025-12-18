+++
title = "Geocluster Finder"
weight = 10
+++

**Class:** `GeoclusterFinder`

  This class allow make get request to user resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findAll()


Find all available geocluster. This execute a GET http method


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findById(id)


Find a specify geocluster by an identifier. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **id** | `string` | ❌ | Identifier of the geocluster. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findFeatures(id, coordinates)


Find features inside the coordinates. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **id** | `string` | ❌ | Identifier of the geocluster. |
| **coordinates** | `Object` | ❌ | square defined by the coordinates and the zoom used to find the inside features . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


+++
title = "Operation Finder"
weight = 10
+++

  This class allow make get request to operation resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findById(id)


Download a specific operation by its id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **id** | `string` | ❌ | Operation id. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
  ogapi.newOperationFinder().findById('xxx-xx-xxx-xxx').then().catch();
```

---
## findExecutionsById(id, size, start)


Download a specific executions of an operation by its id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **id** | `string` | ❌ | Operation id. |
| **size** | `number` | ❌ | Defined the number of elements on response |
| **start** | `number` | ✅ | Defined the offset on response |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findPeriodicityById(id)


Download information of peridodicitiy of a specific operation by its id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **id** | `string` | ❌ | Operation id. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
  ogapi.newOperationFinder().findPeriodicityById('xxx-xx-xxx-xxx').then().catch();
```

---
## findPeriodicityByPeriodicityId(periodicityId)


Download information of periodicitiy  by its id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **periodicityId** | `string` | ❌ | Periodicity id. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
  ogapi.newOperationFinder().findPeriodicityByPeriodicityId('xxx-xx-xxx-xxx').then().catch();
```

---


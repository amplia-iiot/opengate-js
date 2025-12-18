+++
title = "Flattened Search Builder"
weight = 10
+++

**Class:** `FlattenedSearchBuilder`

This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **routes** | `object` | ❌ | this defined the routes. One of those routes must be called on Builder before call build method. |


---
## build()


Build a instance of Search 


### Retorna

{{% notice tip %}}
**Tipo:** `Search`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.devicesSearchBuilder().onProvisioned().build()
```

---
## flattened()


The response will return a flattened response


### Retorna

{{% notice tip %}}
**Tipo:** `FlattenedSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.entitiesSearchBuilder().flattened() 
```

---


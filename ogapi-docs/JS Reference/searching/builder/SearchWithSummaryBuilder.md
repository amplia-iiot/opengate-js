+++
title = "Search With Summary Builder"
weight = 10
+++

**Class:** `SearchWithSummaryBuilder`

This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **routes** | `object` | ❌ | this defined the routes. One of those routes must be called on Builder before call build method. |


---
## summary()


The response will only have a summary information 


### Retorna

{{% notice tip %}}
**Tipo:** `SearchWithSummaryBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.subscriptionsSearchBuilder().summary() 
```

---


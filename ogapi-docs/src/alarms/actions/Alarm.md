+++
title = "Operation"
weight = 10
+++

This is a abstract class, it must be extended to another class that defined the specific search.
This class is responsible to manage execute operations request to OpenGate North API

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **resource** | `string` | ❌ | this is a base url resource |
| **postObj** | `object` | ❌ | it will be sent as a data on post action |


---
## execute()


This invoke a request to OpenGate North API and the callback is managed by promises


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


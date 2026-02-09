+++
title = "Base Search"
weight = 10
+++

This is a abstract class, it must be extended to another class that defined the specific search.
This class is responsible to manage execute request to OpenGate North API

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **resource** | `string` | ❌ | this is a base url resource |
| **timeout** | `number` | ✅ | timeout on request |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |


---
## cancel





---
## cancel





---
## cancelAsyncPaging(message)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **message** | `*` | ❌ |  |


---
## downloadCsv()


This invoke a request to OpenGate North API and the callback is managed by promises


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>
Promise with data with format csv
{{% /notice %}}

---
## execute()


This invoke a request to OpenGate North API and the callback is managed by promises


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## executeWithAsyncPaging(resource)


This invokes a request for asynchronous paging to the OpenGate North API and the return of the pages is managed by promises and its notify object
To cancel the process in the notify method return false or string with custom message for response
In case of canceling the process, the response will be 403: Forbidden -&gt; {data: &#x27;Cancel process&#x27;|| custom_message, statusCode: 403}

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **resource** | `string` | ❌ | resource to find. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


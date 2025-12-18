+++
title = "Operation Actions"
weight = 10
+++

**Class:** `OperationActions`



## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **operationId** | `string` | ❌ | Identifier of the operation on which the action will be carried out |


---
## active()


This invoke a request to OpenGate North API and the callback is managed by promises
This function active an operation


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.newOperationActions("xxxxx-xxx-xxxx-xxxxx").active()
```

---
## activePeriodicity()


This invoke a request to OpenGate North API and the callback is managed by promises
This function active periodicity of an operation


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.newOperationActions("xxxxx-xxx-xxxx-xxxxx").activePeriodicity()
```

---
## cancel()


This invoke a request to OpenGate North API and the callback is managed by promises
This function cancela operation


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
Actions("xxxxx-xxx-xxxx-xxxxx").cancel();
```

---
## cancelPeriodicity()


This invoke a request to OpenGate North API and the callback is managed by promises
This function cancel the periodicity of an operation


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").cancelPeriodicity();
```

---
## changeCallback(url)


This invoke a request to OpenGate North API and the callback is managed by promises
This function pauses (if it was active), updates the callback and passes the operation to the initial state (if activated, activated again)

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").changeCallback("http://[your_application_address]/[your_URI]")
```

---
## executeLater(minutes)


This invoke a request to OpenGate North API and the callback is managed by promises
This function pauses (if it was active), updates the delay and passes the operation to the initial state (if activated, activated again)

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **minutes** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").executeLater(10)
```

---
## executeNow()


This invoke a request to OpenGate North API and the callback is managed by promises
This function pause, update its delay and active an operation for execute immediately


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").executeNow()
```

---
## pause()


This invoke a request to OpenGate North API and the callback is managed by promises
This function pause an operation


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").pause()
```

---
## pausePeriodicity()


This invoke a request to OpenGate North API and the callback is managed by promises
This function pause periodicity of an operation


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").pausePeriodicity()
```

---


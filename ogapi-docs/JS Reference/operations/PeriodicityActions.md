+++
title = "Periodicity Actions"
weight = 10
+++

**Class:** `PeriodicityActions`



## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **taskId** | `string` | ❌ | Identifier of the periodicity on which the action will be carried out |


---
## activate()


This invoke a request to OpenGate North API and the callback is managed by promises
This function active periodicity of an operation


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.newPeriodicityActions("xxxxx-xxx-xxxx-xxxxx").activate()
```

---
## cancel()


This invoke a request to OpenGate North API and the callback is managed by promises
This function cancel a periodicity


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx").cancelPeriodicity();
```

---
## pause()


This invoke a request to OpenGate North API and the callback is managed by promises
This function pauses a periodicity


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx").pausePeriodicity()
```

---


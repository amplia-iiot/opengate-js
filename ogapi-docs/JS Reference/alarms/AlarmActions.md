+++
title = "Alarm Actions"
weight = 10
+++

**Class:** `AlarmActions`

This class contains all alarms actions builders

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |


---
## newAttendBuilder()


Create alarm attend action builder


### Retorna

{{% notice tip %}}
**Tipo:** `AlarmAttendBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.alarms.newAttendBuilder()
```

---
## newCloseBuilder()


Create alarm close action builder


### Retorna

{{% notice tip %}}
**Tipo:** `AlarmCloseBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.alarms.newCloseBuilder()
```

---


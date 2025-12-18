+++
title = "Alarm Action Builder"
weight = 10
+++

**Class:** `AlarmActionBuilder`

Defines the builder to execute alarm actions

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **action** | `string` | ❌ | This action can be ATTEND or CLOSE |


---
## addAlarmId(alarmId)


Add alarmId to operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **alarmId** | `string` | ❌ | AlarmId of Alarm |

### Retorna

{{% notice tip %}}
**Tipo:** `AlarmActionBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.alarms.builderFactory.newAlarmCloseBuilder().addAlarmId("")
```

---
## build()


Build a instance of Operation 


### Retorna

{{% notice tip %}}
**Tipo:** `Operation`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.operations.builderFactory.newAlarmCloseBuilder().build()
```

---
## withNotes(notes)


Add notes to operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **notes** | `string` | ❌ | Notes about operation |

### Retorna

{{% notice tip %}}
**Tipo:** `AlarmActionBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.operations.builderFactory.newAlarmCloseBuilder().withNotes("")
```

---


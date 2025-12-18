+++
title = "Execute Each Builder"
weight = 10
+++

**Class:** `ExecuteEachBuilder`

Defines the builder to configure a period of operation. With this builder you can select how repeat the operation. By days, hours or minutes.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `BaseOperationBuilder` | ❌ | this is a operationBaseBuilder. |
| **date** | `Date` | ❌ | Date when operation will be executed |
| **periodicityName** | `string` | ❌ | Name associated to periodicity |
| **end** | `number or Date` | ❌ | When periodicity ends. By repetitions or by date |


---
## days(days)


Set a difference of days in each repetition

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **days** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---
## hours(hours)


Set a difference of hours in each repetition

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **hours** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---
## minutes(minutes)


Set a difference of minutes in each repetition

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **minutes** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---


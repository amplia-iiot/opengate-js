+++
title = "By Year"
weight = 10
+++

**Class:** `ByYear`



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
## day(day)


At this day will be executed the operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **day** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---
## month(month)


At this month will be executed the operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **month** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder,ByYear`
<br>

{{% /notice %}}

---


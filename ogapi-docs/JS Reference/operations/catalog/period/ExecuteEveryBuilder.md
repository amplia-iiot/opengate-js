+++
title = "Execute Every Builder"
weight = 10
+++

**Class:** `ExecuteEveryBuilder`

Defines the builder to configure a period of operation. By this builder you can select period by day, week, month, year.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `BaseOperationBuilder` | ❌ | this is a operationBaseBuilder. |
| **date** | `Date` | ❌ | Date when operation will be executed |
| **periodicityName** | `string` | ❌ | Name associated to periodicity |


---
## day()


Every day at time defined will be the pattern


### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---
## month(months)


Each month at time and day defined will be the pattern

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **months** | `array` | ❌ | months on will be execute the operation |

### Retorna

{{% notice tip %}}
**Tipo:** `ByMonth`
<br>

{{% /notice %}}

---
## week





---
## year





---


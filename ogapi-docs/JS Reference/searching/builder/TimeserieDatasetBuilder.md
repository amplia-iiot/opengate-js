+++
title = "Timeserie Dataset Builder"
weight = 10
+++

**Class:** `TimeserieDatasetBuilder`

Defined a search over timeseries	

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## addColumn(name, aggregation, alias)


Add column that will be requested

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `string` | ❌ |  |
| **aggregation** | `string` | ❌ |  |
| **alias** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `TimeserieDatasetBuilder`
<br>

{{% /notice %}}

---
## build()


Build a instance of Search 


### Retorna

{{% notice tip %}}
**Tipo:** `Search`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.timeserieDatasetBuilder(organization, timeserieId).build()
```

---
## columns(columns)


Add columns that will be requested

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **columns** | `array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `TimeserieDatasetBuilder`
<br>

{{% /notice %}}

---
## group()





---
## select(select)


The search request will have 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **select** | `object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `TimeserieDatasetBuilder`
<br>

{{% /notice %}}

---
## sort()





---


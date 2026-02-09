+++
title = "Timeserie Downsampler Builder"
weight = 10
+++

Defined a search over timeseries	

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## addColumn(name, interpolation, aggregation, alias)


Add column that will be requested

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `string` | ❌ |  |
| **interpolation** | `string` | ❌ |  |
| **aggregation** | `string` | ❌ |  |
| **alias** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `TimeserieDownsamplerBuilder`
<br>

{{% /notice %}}

---
## bucketTime(bucketTime)


The bucket for the downsampling (must be higher than the time series bucket)

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **bucketTime** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `TimeserieDownsamplerBuilder`
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
 ogapi.timeserieDownsamplerBuilder(organization, timeserieId).build()
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
**Tipo:** `TimeserieDownsamplerBuilder`
<br>

{{% /notice %}}

---
## filter()





---
## findFields()





---
## select(select)


The search request will have this select 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **select** | `object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `TimeserieDownsamplerBuilder`
<br>

{{% /notice %}}

---
## sort()





---
## start(start)


The start time for the downsampling

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **start** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `TimeserieDownsamplerBuilder`
<br>

{{% /notice %}}

---


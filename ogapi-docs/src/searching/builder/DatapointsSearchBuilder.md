+++
title = "Datapoints Search Builder"
weight = 10
+++

Defined a search over Datastreams	

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## betweenDates(fromDate, toDate)


Set time window to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **fromDate** | `date` | ❌ | Add from date |
| **toDate** | `date` | ❌ | Add to date |

### Retorna

{{% notice tip %}}
**Tipo:** `DatapointsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
```

---
## fluentFilter





---
## select(select)


The search request will have this filter 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **select** | `SelectBuilder,object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.entitiesSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
 ) // Setting SelectBuilder
 ogapi.entitiesSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
```

---
## tagsFilter





---
## withDatastream(datastreamId)


Set datastreamId to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **datastreamId** | `string` | ❌ | Datastream.id of Datapoint |

### Retorna

{{% notice tip %}}
**Tipo:** `DatapointsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
```

---
## withDeviceId(deviceId)


Set deviceId to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **deviceId** | `string` | ❌ | Prov.customId of Device |

### Retorna

{{% notice tip %}}
**Tipo:** `DatapointsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
```

---
## withFeed(feedId)


Set feedName to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **feedId** | `string` | ❌ | Datastream.id of Datapoint |

### Retorna

{{% notice tip %}}
**Tipo:** `DatapointsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
```

---


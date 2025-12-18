+++
title = "Pre Filtered Search Builder"
weight = 10
+++

**Class:** `PreFilteredSearchBuilder`

This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **routes** | `object` | ❌ | this defined the routes. One of those routes must be called on Builder before call build method. |


---
## collected()


This option forces search api to add a filter of collected content


### Retorna

{{% notice tip %}}
**Tipo:** `PreFilteredSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.subscribersSearchBuilder().collected() 
```

---
## disableCaseSensitive(flag)


The response will return a response by applying the filter with likes case-no-sensitive

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **flag** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `EntitiesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.entitiesSearchBuilder().disableCaseSensitive() 
```

---
## disableDefaultSorted()


The response will return a response without sorted


### Retorna

{{% notice tip %}}
**Tipo:** `PreFilteredSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.assetsSearchBuilder().disableDefaultSorted() 
```

---
## provisioned()


This option forces search api to add a filter of provisioned content


### Retorna

{{% notice tip %}}
**Tipo:** `PreFilteredSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.subscribersSearchBuilder().provisioned() 
```

---
## removeCaseSensitive()


The response will return a response by applying the filter with likes case-no-sensitive


### Retorna

{{% notice tip %}}
**Tipo:** `EntitiesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.entitiesSearchBuilder().removeCaseSensitive() 
```

---
## select(select)


The search request will have this filter 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **select** | `SelectBuilder,object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `PreFilteredSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.devicesSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
 ) // Setting SelectBuilder
 ogapi.devicesSearchBuilder().select({
     "elements": [
         {"name": "provision.device.identifier","fields": ["value"],"alias": "id"},
         {"name": "device.temperature.value","fields": ["value"]}
     ]
 }) //Custom select
```

---


+++
title = "Entities Search Builder"
weight = 10
+++

**Class:** `EntitiesSearchBuilder`

Defined a search over Executions	

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


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
 ogapi.entitiesSearchBuilder()
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
**Tipo:** `EntitiesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.entitiesSearchBuilder().disableDefaultSorted() 
```

---
## flattened()


The response will return a flattened response


### Retorna

{{% notice tip %}}
**Tipo:** `EntitiesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.entitiesSearchBuilder().flattened() 
```

---
## group(group)


The search request will have this group by 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **group** | `object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `EntitiesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript

```

---
## removeCaseSensitive()


The response will return a response by deleteing the parameters with likes case-no-sensitive


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
## select(select)


The search request will have this filter 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **select** | `SelectBuilder,object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `EntitiesSearchBuilder`
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


+++
title = "Tickets Search Builder"
weight = 10
+++

Defined a search over Devices	

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## disableDefaultSorted()


The response will return a response without sorted


### Retorna

{{% notice tip %}}
**Tipo:** `TicketsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.ticketsSearchBuilder().disableDefaultSorted() 
```

---
## flattened()


The response will return a flattened response


### Retorna

{{% notice tip %}}
**Tipo:** `TicketsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.ticketsSearchBuilder().flattened() 
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
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript

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
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.ticketsSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.ticket.identifier", [[{"field": "value","alias": "identifier"}], ), SE.add("device.temperature.value", [[{"field": "value"}]))
 ) // Setting SelectBuilder
 ogapi.ticketsSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "provision.ticket.name","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
```

---
## summary()


The response will only have a summary information 


### Retorna

{{% notice tip %}}
**Tipo:** `TicketsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.ticketsSearchBuilder().summary() 
```

---


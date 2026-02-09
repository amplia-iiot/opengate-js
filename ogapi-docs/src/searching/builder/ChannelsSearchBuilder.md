+++
title = "Channels Search Builder"
weight = 10
+++

Defined a search over Channels	

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
**Tipo:** `ChannelsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.channelsSearchBuilder().disableDefaultSorted() 
```

---
## summary()


The response will only have a summary information 


### Retorna

{{% notice tip %}}
**Tipo:** `SearchWithSummaryBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.channelsSearchBuilder().summary() 
```

---


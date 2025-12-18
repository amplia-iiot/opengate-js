+++
title = "Devices Plans Search Builder"
weight = 10
+++

**Class:** `DevicesPlansSearchBuilder`

Defined a search over DevicePlansSearchBuilder	

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## withDomain(domainName)


Sets de domain name to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **domainName** | `string` | ❌ | domain name |

### Retorna

{{% notice tip %}}
**Tipo:** `DevicePlansSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.plansSearchBuilder().withDomain('myDomain').build()
```

---


+++
title = "Search Builder"
weight = 10
+++

**Class:** `SearchBuilder`

This is a abstract class. It is a base to make all kind of search request to OpenGate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **routes** | `object` | ❌ | this defined the routes. One of those routes must be called on Builder before call build method. |


---
## [route]





---
## addSortAscendingBy(filterField)


Add ascending param into the sort search object

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **filterField** | `string` | ❌ | This field must be allowed into the specific resource |

### Retorna

{{% notice tip %}}
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.subscriptionsSearchBuilder().addSortAscendingBy('prov.customid') // Order by prov.customid Ascending  
```

---
## addSortBy(filterField, typeSort)


Add ascending/descending param into the sort search object 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **filterField** | `string` | ❌ | This field must be allowed into the specific resource |
| **typeSort** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.subscriptionsSearchBuilder().addSortBy('prov.customid','ASCENDING') // Order by prov.customid Ascending
 ogapi.devicesSearchBuilder().addSortBy('prov.customid','DESCENDING') // Order by prov.customid Descending 
```

---
## addSortDescendingBy(filterField)


Add descending param into the sort search object 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **filterField** | `string` | ❌ | This field must be allowed into the specific resource |

### Retorna

{{% notice tip %}}
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.devicesSearchBuilder().addSortDescendingBy('prov.customid') // Order by prov.customid Descending
```

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
 ogapi.devicesSearchBuilder().onProvisioned().build()
```

---
## filter(filter)


The search request will have this filter 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **filter** | `FilterBuilder,object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.subscriptionsSearchBuilder().filter(
     ogapi.newFilterBuilder().and(Ex.like('prov.customid', 'SN32'), Ex.neq('entityId', '1124'))
 ) // Setting FilterBuilder
 ogapi.subscriptionsSearchBuilder().filter(
      {"and": [{"like": {"entityId": "0000000000000001"}}]}
 ) // Custom filter
```

---
## findAllFields(input)


Return a promise which it will contains an array with fields recommended with complete structure

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **input** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findFieldPath(field)


Return a promise which it will contains an string with the path of a field

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **field** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findFields(input)


Return a promise which it will contains an array with fields recommended with only identifier

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **input** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## limit(size, start)


Set reponse pagination.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **size** | `number` | ❌ | Defined the number of elements on response |
| **start** | `number` | ✅ | Defined the offset on response |

### Retorna

{{% notice tip %}}
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.subscribersSearchBuilder().limit(10) // Without offset
 ogapi.subscribersSearchBuilder().limit(25,50) //With offset value 50
```

---
## removeSortBy(filterField)


Remove sort param from the search object 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **filterField** | `string` | ❌ | This field must be allowed into the specific resource |

### Retorna

{{% notice tip %}}
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.subscriptionsSearchBuilder().removeSortBy('prov.customid') // Remove order by prov.customid
 ogapi.subscriptionsSearchBuilder().removeSortBy() // Remove all order by parameters
```

---
## withTimeout(ms)


The request will have a specific time out if it will be exceeded then the promise throw an exception

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ms** | `number` | ❌ | timeout in milliseconds |

### Retorna

{{% notice tip %}}
**Tipo:** `SearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.subscriptionsSearchBuilder().withTimeout(2000) 
```

---


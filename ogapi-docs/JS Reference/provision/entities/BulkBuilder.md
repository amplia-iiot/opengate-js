+++
title = "Bulk Builder"
weight = 10
+++

**Class:** `BulkBuilder`

This class allow set simple values.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | required field. This is ogapi instance |
| **resource** | `resource` | ❌ | required field. This is the resource used for the bulk provision |
| **extension** | `extension` | ❌ | required field. Type of file to send |
| **timeout** | `number` | ✅ | timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception |


---
## create(rawFile, csv_response)


 Execute the bulk creation operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `string,Blob` | ❌ | File with format string or Blob |
| **csv_response** | `boolean` | ✅ | true if you want a response on format csv. False or null if you want a response on format json |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).create(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).create(new Blob(), true)
```

---
## delete(rawFile, csv_response)


 Execute the bulk delete operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `string,Blob` | ❌ | File with format string or Blob |
| **csv_response** | `boolean` | ✅ | true if you want a response on format csv. False or null if you want a response on format json |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).delete(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).delete(new Blob(), true)
```

---
## deleteAll(rawFile, csv_response)


 Execute the bulk delete full operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `string,Blob` | ❌ | File with format string or Blob |
| **csv_response** | `boolean` | ✅ | true if you want a response on format csv. False or null if you want a response on format json |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).deleteAll(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).deleteAll(new Blob(), true)
```

---
## patch(rawFile, csv_response)


 Execute the bulk patch operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `string,Blob` | ❌ | File with format string or Blob |
| **csv_response** | `boolean` | ✅ | true if you want a response on format csv. False or null if you want a response on format json |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(new Blob(), true)
```

---
## update(rawFile, csv_response)


 Execute the bulk update operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `string,Blob` | ❌ | File with format string or Blob |
| **csv_response** | `boolean` | ✅ | true if you want a response on format csv. False or null if you want a response on format json |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(new Blob(), true)
```

---


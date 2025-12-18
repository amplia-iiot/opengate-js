+++
title = "Bulk Execution Builder"
weight = 10
+++

**Class:** `BulkExecutionBuilder`

This builder give you the necessary tools to create a bulk executions using our OpenGate REST

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | required field. This is ogapi instance |
| **organization** | `string` | ❌ | required field. This is the organization name |
| **processorId** | `string` | ❌ | required field. This is the provision processor use for bulk provision |
| **timeout** | `number` | ✅ | timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception |


---
## bulk(rawFile, extension)


Do a bulk using specific Provision Processor.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `string,File` | ❌ | String with path of file or File (Blob) |
| **extension** | `string` | ✅ | File format |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.bulkExecutionBuilder('orgname', 'processorId', 10000).bulk(rawFile, extension)
```

---
## plan(rawFile, extension, numberOfEntriesToProcess)


Instead of creating a bulk process, return the provision process planning for specified entries. This is is synch process that does not cause changes in the database

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **rawFile** | `string,File` | ❌ | String with path of file or File (Blob) |
| **extension** | `string` | ✅ | File format |
| **numberOfEntriesToProcess** | `number` | ✅ | Number of entries to be processed. |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.bulkExecutionBuilder('orgname', 'processorId', 10000).plan(rawFile, extension)
 ogapi.bulkExecutionBuilder('orgname', 'processorId', 10000).plan(rawFile, extension, numberOfEntriesToProcess)
```

---


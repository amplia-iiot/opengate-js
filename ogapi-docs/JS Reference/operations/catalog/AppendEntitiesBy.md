+++
title = "Append Entities By"
weight = 10
+++

**Class:** `AppendEntitiesBy`

Util used into BaseOperationBuilder to append entities the three different ways. By filter, By tags, By entityList

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **parent** | `BaseOperationBuilder` | ❌ | this is a instance of BaseOperationBuilder |


---
## filter(filter, resourceType)


Append filter to operation target

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **filter** | `FilterBuilder` | ❌ |  |
| **resourceType** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---
## list(entities)


Append entity list to operation target

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **entities** | `EntityListBuilder` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---
## tag(tag)


Set tag to operation target

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **tag** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---


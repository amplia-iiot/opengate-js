+++
title = "Operations"
weight = 10
+++

**Class:** `Operations`

This class generates all operations builders by a response to search into catalog/operations

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |


---
## builderByOperationName(name)


Create a builder to create an operation 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `String` | ❌ | name of the operation to be created |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## getOperationList()




### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## updatePeriodicityBuilder(operationId)


Create a builder to update the periodicity of an operation 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **operationId** | `String` | ❌ | identifier of the operation to be updated~ |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


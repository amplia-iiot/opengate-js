+++
title = "Operation Type Finder"
weight = 10
+++

**Class:** `OperationTypeFinder`

  This class allow make get request to OperationType resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findByOrganizationAndName(organization, name)


Performs a get that returns operation type

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **name** | `string` | ❌ | Rule Configuration name |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


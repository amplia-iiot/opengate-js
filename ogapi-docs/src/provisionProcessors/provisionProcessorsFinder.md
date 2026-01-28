+++
title = "provision Processors Finder"
weight = 10
+++

  This class allow make get request to ProvisionProcessors Finder resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findByOrganization(organization)


Performs a get that returns list of provision processors

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndProvisionProcessorId(organization, identifier)


Performs a get that returns a definition of provision Processors

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **identifier** | `string` | ❌ | Provision Processors identifier |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


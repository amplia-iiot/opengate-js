+++
title = "Rule Configurations Finder"
weight = 10
+++

  This class allow make get request to RuleConfigurations resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findByOrganizationAndChannelAndName(organization, channel, name)


Performs a get that returns organizations related

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **channel** | `string` | ❌ | channel. |
| **name** | `string` | ❌ | Rule Configuration name |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


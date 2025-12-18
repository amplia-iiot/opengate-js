+++
title = "Rule Configurations Actions"
weight = 10
+++

**Class:** `RuleConfigurationsActions`



## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **name** | `string` | ❌ | Identifier of the ryule configuration to operate |


---
## cloneTo(newRuleName, newRuleOpenAction, newRuleCloseAction, newRuleNotifications)


Clones a rule configuration into a new one

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **newRuleName** | `string` | ❌ |  |
| **newRuleOpenAction** | `boolean` | ❌ |  |
| **newRuleCloseAction** | `string` | ❌ |  |
| **newRuleNotifications** | `boolean` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


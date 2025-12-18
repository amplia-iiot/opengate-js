+++
title = "Base Parameter Builder With Parent"
weight = 10
+++

**Class:** `BaseParameterBuilderWithParent`

This class generate a builder by a dynamic content about specific parameter to an operation.

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **config** | `object` | ❌ | this is configuration about parameter operation. |
| **parent** | `BaseOperationBuilder` | ❌ | this is a instance of BaseOperationBuilder |


---
## [createSetterNameMethod(config)]





---
## build()


This has all knowledge to make a object.


### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>

{{% /notice %}}

---
## buildAndAppend()


This method will invoke build and then it will append the parameter to operationBuilder with the correct way


### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---


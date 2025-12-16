+++
title = "Model Finder"
weight = 10
+++

  This class allow make get request to hardware models resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findByManufacturer(manufacturer)


Download all models from a manufacturer. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **manufacturer** | `string` | ❌ | manufacturer id . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByManufacturerAndId(manufacturer, identifier)


Download a specific model by its id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **manufacturer** | `string` | ❌ | manufacturer id . |
| **identifier** | `string` | ❌ | model name . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findMediaByManufacturerAndModelAndId(manufacturer, modelId, mediaIdentifier)


Download a specific model media by its ids. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **manufacturer** | `string` | ❌ | manufacturer id . |
| **modelId** | `string` | ❌ | model identifier . |
| **mediaIdentifier** | `string` | ❌ | media identifier. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findMediasByManufacturerAndModel(manufacturer, identifier)


Download a specific model media by its ids. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **manufacturer** | `string` | ❌ | manufacturer id . |
| **identifier** | `string` | ❌ | model identifier . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


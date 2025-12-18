+++
title = "Certificate Finder"
weight = 10
+++

**Class:** `CertificateFinder`

  This class allow make get request to certificate resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## findById(id)


Download a specific certificate by id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **id** | `string` | ❌ | Id of the certificate. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByIdAndFormat(id, mimetype)


Download a certificate using id and in a specific format. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **id** | `string` | ❌ | Id of the certificate. |
| **mimetype** | `string` | ❌ | Certificate format mimetype. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


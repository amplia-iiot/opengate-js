+++
title = "Certificates Search Builder"
weight = 10
+++

**Class:** `CertificatesSearchBuilder`

Defined a search over Bundles    

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## administrable()


The search result will have all certificates which can be administered by the user


### Retorna

{{% notice tip %}}
**Tipo:** `CertificatesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.certificatesSearchBuilder().administrable()
```

---
## assignable()


 The search result will have all certificates which can be assignable to some device
 ogapi.certificatesSearchBuilder().assignable()


### Retorna

{{% notice tip %}}
**Tipo:** `CertificatesSearchBuilder`
<br>

{{% /notice %}}

---
## withFetch(flag)


Set fecth value

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **flag** | `flag` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `CertificatesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.certificatesSearchBuilder().withFetch(true)
```

---


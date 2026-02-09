+++
title = "North Amplia REST"
weight = 10
+++

This is a wrapper of a Rest api javascript

## constructor


This is a constructor of a Rest api javascript

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **_options** | `{ url: string,port: string,version: string,apiKey: string,JTW: string}` | ❌ | this is configuration about Opengate North API. |
| **backend** | `function` | ❌ | this is a backend selected to manage a request to Opengate North API. |


---
## default()


This return a default configuration object


### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>

{{% /notice %}}

---
## delete(url, timeout, headers, parameters, body, serviceBaseURL)


Invoke DELETE action to url specified

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ | url to execute DELETE |
| **timeout** | `number` | ❌ | timeout in milliseconds |
| **headers** | `object` | ❌ | headers of request |
| **parameters** | `object` | ❌ | parameters of request |
| **body** | `object` | ❌ | body of request |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## get(url, timeout, headers, parameters, asBlob, serviceBaseURL)


Invoke GET action to url specified

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ | url to execute GET |
| **timeout** | `number` | ❌ | timeout in milliseconds |
| **headers** | `object` | ❌ | headers of request |
| **parameters** | `object` | ❌ | parameters of request |
| **asBlob** | `boolean` | ❌ | response body as Blob |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## patch(url, data, timeout, headers, parameters, serviceBaseURL)


Invoke PATCH action to url and data specified

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ | url to execute PATCH |
| **data** | `object` | ❌ | attach data to request PATCH |
| **timeout** | `number` | ❌ | timeout in milliseconds |
| **headers** | `object` | ❌ | headers of request |
| **parameters** | `object` | ❌ | parameters of request |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## post(url, data, timeout, headers, parameters, serviceBaseURL)


Invoke POST action to url and data specified

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ | url to execute POST |
| **data** | `object` | ❌ | attach data to request POST |
| **timeout** | `number` | ❌ | timeout in milliseconds |
| **headers** | `object` | ❌ | headers of request |
| **parameters** | `object` | ❌ | parameters of request |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## post_multipart(url, formData, events, timeout, headers, parameters, serviceBaseURL)


Invoke POST multipart action to url and data specified

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ | url to execute POST |
| **formData** | `FormData` | ❌ | attach data to request POST |
| **events** | `object` | ❌ | events allowed, xhr.process |
| **timeout** | `number` | ❌ | timeout in milliseconds |
| **headers** | `object` | ❌ | headers of request |
| **parameters** | `object` | ❌ | parameters of request |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## put(url, data, timeout, headers, parameters, serviceBaseURL)


Invoke PUT action to url and data specified

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ | url to execute PUT |
| **data** | `object` | ❌ | attach data to request PUT |
| **timeout** | `number` | ❌ | timeout in milliseconds |
| **headers** | `object` | ❌ | headers of request |
| **parameters** | `object` | ❌ | parameters of request |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## put_multipart(url, formData, events, timeout, headers, parameters, serviceBaseURL)


Invoke put multipart action to url and data specified

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ | url to execute POST |
| **formData** | `FormData` | ❌ | attach data to request POST |
| **events** | `object` | ❌ | events allowed, xhr.process |
| **timeout** | `number` | ❌ | timeout in milliseconds |
| **headers** | `object` | ❌ | headers of request |
| **parameters** | `object` | ❌ | parameters of request |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---


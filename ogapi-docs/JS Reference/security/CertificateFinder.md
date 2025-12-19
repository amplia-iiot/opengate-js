+++
title = "Certificate Finder"
weight = 10
+++

CertificateFinder

### CertificateFinder Objects

```javascript
class CertificateFinder()
```

  This class allow make get request to certificate resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### findById


```javascript
function findById(id: string) -> 'Promise'
```

Download a specific certificate by id. This execute a GET http method

**Arguments**:

- `id` _string_  - Id of the certificate.

**Returns**:


- _`Promise`_ 


---

##### findByIdAndFormat


```javascript
function findByIdAndFormat(id: string,mimetype: string) -> 'Promise'
```

Download a certificate using id and in a specific format. This execute a GET http method

**Arguments**:

- `id` _string_  - Id of the certificate.
- `mimetype` _string_  - Certificate format mimetype.

**Returns**:


- _`Promise`_ 


---


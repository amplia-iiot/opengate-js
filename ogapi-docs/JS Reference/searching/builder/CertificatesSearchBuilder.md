+++
title = "Certificates Search Builder"
weight = 10
+++

CertificatesSearchBuilder

### CertificatesSearchBuilder Objects

```javascript
class CertificatesSearchBuilder()
```

Defined a search over Bundles    


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### administrable


```javascript
function administrable() -> 'CertificatesSearchBuilder'
```

The search result will have all certificates which can be administered by the user


**Returns**:


- _`CertificatesSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.certificatesSearchBuilder().administrable()
~~~

---

##### assignable


```javascript
function assignable() -> 'CertificatesSearchBuilder'
```

 The search result will have all certificates which can be assignable to some device
 ogapi.certificatesSearchBuilder().assignable()


**Returns**:


- _`CertificatesSearchBuilder`_ 


---

##### withFetch


```javascript
function withFetch(flag: flag) -> 'CertificatesSearchBuilder'
```

Set fecth value

**Arguments**:

- `flag` _flag_  

**Returns**:


- _`CertificatesSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.certificatesSearchBuilder().withFetch(true)
~~~

---


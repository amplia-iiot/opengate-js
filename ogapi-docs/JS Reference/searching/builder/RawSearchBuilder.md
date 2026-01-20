+++
title = "Raw Search Builder"
weight = 10
+++

RawSearchBuilder

### RawSearchBuilder Objects

```javascript
class RawSearchBuilder()
```

Defined a search over custom resource and custom filter	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `ogapi` _*_  


---

##### build


```javascript
function build() -> '*'
```

Create Search instance


**Returns**:


- _`*`_ - Search


---

##### filter


```javascript
function filter(rawFilter: object) -> '*'
```

Set raw filter

**Arguments**:

- `rawFilter` _object_  - raw filter

**Returns**:


- _`*`_ - RawSearchBuilder


---

##### from


```javascript
function from(url: string) -> '*'
```

Set custom url

**Arguments**:

- `url` _string_  - custom Opengate North API url

**Returns**:


- _`*`_ - RawSearchBuilder


---

##### limit


```javascript
function limit(rawLimit: object) -> '*'
```

Set raw limit

**Arguments**:

- `rawLimit` _object_  - raw limit

**Returns**:


- _`*`_ - RawSearchBuilder


---


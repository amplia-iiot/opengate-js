+++
title = "Organizations Search Builder"
weight = 10
+++

OrganizationsSearchBuilder

### OrganizationsSearchBuilder Objects

```javascript
class OrganizationsSearchBuilder()
```

Defined a search over organizations


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### build


```javascript
function build() -> '*'
```



**Returns**:


- _`*`_ 


---

##### fluentFilter


```javascript
function fluentFilter()
```




---

##### tagsFilter


```javascript
function tagsFilter()
```




---

##### withChannelName


```javascript
function withChannelName(channelName: string) -> 'OrganizationsSearchBuilder'
```

Sets de organization name to search

**Arguments**:

- `channelName` _string_  - hardware id

**Returns**:


- _`OrganizationsSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.organizationsSearchBuilder().withChannelName('myOrganization').build()
~~~

---

##### withDomain


```javascript
function withDomain(domainName: string) -> 'OrganizationsSearchBuilder'
```

Sets de domain name to search

**Arguments**:

- `domainName` _string_  - domain name

**Returns**:


- _`OrganizationsSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.organizationsSearchBuilder().withDomain('myDomain').build()
~~~

---

##### withName


```javascript
function withName(organizationName: string) -> 'OrganizationsSearchBuilder'
```

Sets de organization name to search

**Arguments**:

- `organizationName` _string_  - hardware id

**Returns**:


- _`OrganizationsSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.organizationsSearchBuilder().withName('myOrganization').build()
~~~

---

##### withWorkgroup


```javascript
function withWorkgroup(workgroupName: string) -> 'OrganizationsSearchBuilder'
```

Sets de workgroup name to search

**Arguments**:

- `workgroupName` _string_  - workgroup name

**Returns**:


- _`OrganizationsSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.organizationsSearchBuilder().withWorkgroup('myWorkgroup').build()
~~~

---


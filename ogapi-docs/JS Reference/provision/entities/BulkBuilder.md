+++
title = "Bulk Builder"
weight = 10
+++

BulkBuilder

### BulkBuilder Objects

```javascript
class BulkBuilder()
```

This class allow set simple values.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - required field. This is ogapi instance
- `resource` _resource_  - required field. This is the resource used for the bulk provision
- `extension` _extension_  - required field. Type of file to send
- `timeout` _number_ (optional) - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception


---

##### create


```javascript
function create(rawFile: string,Blob,csv_response: boolean) -> '*'
```

 Execute the bulk creation operation

**Arguments**:

- `rawFile` _string,Blob_  - File with format string or Blob
- `csv_response` _boolean_ (optional) - true if you want a response on format csv. False or null if you want a response on format json

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).create(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).create(new Blob(), true)
~~~

---

##### delete


```javascript
function delete(rawFile: string,Blob,csv_response: boolean) -> '*'
```

 Execute the bulk delete operation

**Arguments**:

- `rawFile` _string,Blob_  - File with format string or Blob
- `csv_response` _boolean_ (optional) - true if you want a response on format csv. False or null if you want a response on format json

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).delete(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).delete(new Blob(), true)
~~~

---

##### deleteAll


```javascript
function deleteAll(rawFile: string,Blob,csv_response: boolean) -> '*'
```

 Execute the bulk delete full operation

**Arguments**:

- `rawFile` _string,Blob_  - File with format string or Blob
- `csv_response` _boolean_ (optional) - true if you want a response on format csv. False or null if you want a response on format json

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).deleteAll(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).deleteAll(new Blob(), true)
~~~

---

##### patch


```javascript
function patch(rawFile: string,Blob,csv_response: boolean) -> '*'
```

 Execute the bulk patch operation

**Arguments**:

- `rawFile` _string,Blob_  - File with format string or Blob
- `csv_response` _boolean_ (optional) - true if you want a response on format csv. False or null if you want a response on format json

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(new Blob(), true)
~~~

---

##### update


```javascript
function update(rawFile: string,Blob,csv_response: boolean) -> '*'
```

 Execute the bulk update operation

**Arguments**:

- `rawFile` _string,Blob_  - File with format string or Blob
- `csv_response` _boolean_ (optional) - true if you want a response on format csv. False or null if you want a response on format json

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(rawFile)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(new Blob(), true)
~~~

---


+++
title = "Country Codes Search Builder"
weight = 10
+++

CountryCodesSearchBuilder

### CountryCodesSearchBuilder Objects

```javascript
class CountryCodesSearchBuilder()
```

Defined a search over operational status catalogs    


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### build


```javascript
function build() -> 'StaticSearch'
```

Build a instance of StaticSearch 


**Returns**:


- _`StaticSearch`_ 


**Example**:

~~~javascript
  ogapi.countryCodesSearchBuilder().filter({and:[]}).build()
~~~

---

##### customFilters


```javascript
function customFilters()
```




---


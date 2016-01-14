[![Build Status](https://travis-ci.org/William17/list-to-tree-lite.png?branch=master)](http://travis-ci.org/William17/list-to-tree-lite)  
# list-to-tree-lite  
A simple function converts a flat-list of objects with `id`, `parent` and `children` to a tree-list of objects.  
without any dependencies.
```
[{
    id: 6,
    any: 'opps'
}, {
    id: 2,
    parent: 5,
    any: 'foo',
}, {
    id: 1,
    parent: 2,
    any: 'bar'
}, {
    id: 5,
    any: 'hello'
}, {
    id: 3,
    parent: 2,
    any: 'other'
}]

```
to
```
[{
    id: 6,
    any: 'opps',
    children: []
}, {
    id: 5,
    any: 'hello',
    children: [{
        id: 2,
        parent: 5,
        any: 'foo',
        children: [{
            id: 1,
            parent: 2,
            any: 'bar',
            children: []
        }, {
            id: 3,
            parent: 2,
            any: 'other',
            children: []
        }]
    }]
}]

```

#Usage  
`listToTree(list[, options])`  

`options.idKey`  
  the _id key_ of the item object, default `id`  

`options.parentKey`  
  the _parent key_ of the item object, default `parent`  

`options.childrenKey`  
  the _children key_ of the item object, default `children`  

#Install
`npm install list-to-tree-lite  --save`

#Test  
`npm run test`  

#License  
MIT:http://william17.mit-license.org

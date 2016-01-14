var assert = require('assert');

var listToTree = require('./index');
var idKey = 'k' + Math.random().toString().substr(-5);
var parentKey = 'p' + Math.random().toString().substr(-5);
var childrenKey = 'c' + Math.random().toString().substr(-5);

function genTree(itemCount, options) {
  var options = options || {};
  var idKey = options.idKey || 'id';
  var parentKey = options.parentKey || 'parent';
  var childrenKey = options.childrenKey || 'children';

  // unique id
  var ids = {};
  function getId() {
    var id = 'id' + Math.random().toString().substr(-5);
    return ids[id] ? getId() : (ids[id]=id);
  }

  function gen(count, prev, parent, top) {
    
    if(count>=itemCount) {
      return top[childrenKey];
    }

    var item = {};
    item[idKey] = getId();
    item[childrenKey] = [];

    // first child
    if (!count) {
      top = top || {};
      top[idKey] = 0;
      top[childrenKey] = [];
      top[childrenKey].push(item);
      parent = top;
    } else if (Math.random() > 0.5) {
      parent[childrenKey].push(item);
    } else {
      prev[childrenKey].push(item);
      parent = prev;
    }
    item[parentKey] = parent[idKey];
    return gen(++count, item, parent, top);
  }

  return gen(0);
}

function flattern(tree, options) {
  options = options || {};
  var idKey = options.idKey || 'id';
  var parentKey = options.parentKey || 'parent';
  var childrenKey = options.childrenKey || 'children';

  function fla(tree) {
    var list = [], children;
    for (var i = 0, length = tree.length; i < length; i++) {
      list = list.concat(tree[i]);
      if (tree[i][childrenKey] && tree[i][childrenKey].length > 0) {
        list = list.concat(fla(tree[i][childrenKey]));
        tree[i][childrenKey] = [];
      }
    }
    return list;
  }

  return fla(tree);
}

var keys = {
  idKey: idKey,
  parentKey: parentKey,
  childrenKey: childrenKey
}
var originTree = genTree(10, keys);
var list = flattern(JSON.parse(JSON.stringify(originTree)), keys);
var tree = listToTree(JSON.parse(JSON.stringify(list)), keys);

assert.deepEqual(originTree, tree);
console.log('✓ passed');
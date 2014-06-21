#node-inherits

Inheritance module for node.js

##Getting started

```
npm install node-inherits
```

##Overview

###Inherits

To inherit from a super constructor, call inherits with your constructor and the super one:

```
Super       = function () {};
Constructor = inherits(function () {}, Super);
```

Another way to do this is to call inherits with your super constructor and use its new inherits method:

```
Super       = inherits(function () {});
Constructor = Super.inherits(function () {});
```

During inheritance, all constructor are called from the super to last inherited.

```
Super       = inherits(function () {
  this.name = 'Super';
});
Constructor = Super.inherits(function () {
  this.name += ' > Constructor';
});

object = new Constructor();
console.log(object.name); // 'Super > Constructor';
```

###instanceof

Like with node.js util.inherits, your constructor instances will be also instance of super constructor:

```
object  = new Constructor();
console.log(object instanceof Constructor); // true
console.log(object instanceof Super);       // true
```

###prototype and constructor properties

All properties attached to the constructor and prototype are inherited, taking care of their descriptors.  
This means that if Super constructor declared a property with `configurable` set to `false`, it will be preserved.

![](https://david-dm.org/cahnory/node-inherits.png)
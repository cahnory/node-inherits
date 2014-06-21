/*jslint node: true */
'use strict';

var
  inherits,
  inheritsObject,
  inheriting;

inherits  = function (Constructor, Super) {
  var Extend;

  if ('function' !== typeof Super) {

    // wrong type argument passed
    if (undefined !== Super) {
      throw 'inherits could only inherits from function';
    }

    // no argument passed
    Super = function () {};
  }

  // extended function
  Extend  = function (e) {
    var
      vars  = {},
      args  = Array.prototype.slice.call(arguments);

    // set protected vars getter
    this.getProtectedVars = function () {
      return vars;
    };

    // call constructors
    Super.apply(this, args);
    Constructor.apply(this, args);

    // remove protected vars getter
    if (Extend === this.constructor) {
      delete this.getProtectedVars;
    }
  };

  // add reference to Super
  Object.defineProperty(Extend, '_super', {
    value: Super
  });

  // instanceof Super returns true
  Extend.prototype  = Object.create(Super.prototype);

  // extend prototypes
  inheritsObject(Extend.prototype, Super.prototype);
  inheritsObject(Extend.prototype, Constructor.prototype);

  // extend objects
  inheritsObject(Extend, Super);
  inheritsObject(Extend, Constructor);

  // reset constructor
  Extend.prototype.constructor  = Extend;

  // inherits from the extended function
  Extend.inherits  = function (Child) {
    return inherits(Child, Extend);
  };

  return Extend;
};

inheritsObject  = function (a, b) {
  var
    keys  = Object.getOwnPropertyNames(b),
    desc,
    i;

  for (i = 0; i < keys.length; i += 1) {
    desc  = Object.getOwnPropertyDescriptor(a, keys[i]);

    // only overwrite configurable properties
    if (!desc || desc.configurable) {
      Object.defineProperty(a, keys[i], Object.getOwnPropertyDescriptor(b, keys[i]));
    }

  }
};

module.exports  = inherits;
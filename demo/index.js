/*jslint node: true */
'use strict';

var
  inherits  = require('../lib/inherits'),
  Shape,
  Rectangle,
  Square;

// you should call inherits here in order to get
// the inherits method attached to the class
Shape = function () {
  var vars  = this.getProtectedVars();

  vars.x  = 0;
  vars.y  = 0;

  Object.defineProperties(this, {
    x: {
      configurable: true,
      get: function () { return vars.x; },
      set: function (x) {
        if (x > 0) {
          vars.x  = x;
        }
      }
    },
    y: {
      configurable: true,
      get: function () { return vars.y; },
      set: function (y) {
        if (y > 0) {
          vars.y  = y;
        }
      }
    }
  });

};
Shape.prototype.move = function (x, y) {
  this.x = x;
  this.y = y;
};

Rectangle = inherits(function () {
  var vars  = this.getProtectedVars();

  vars.width  = 0;
  vars.height  = 0;

  Object.defineProperties(this, {
    width:  {
      configurable: true,
      get: function () { return vars.width; },
      set: function (width) {
        if (width > 0) {
          vars.width  = width;
        }
      }
    },
    height: {
      configurable: true,
      get: function () { return vars.height; },
      set: function (height) {
        if (height > 0) {
          vars.height  = height;
        }
      }
    }
  });

}, Shape);
Shape.prototype.resize = function (width, height) {
  this.width  = width;
  this.height = height;
};

var rect = new Rectangle();

// true
if (rect instanceof Shape) {
  rect.move(10, 10);
}

// true
if (rect instanceof Rectangle) {
  rect.resize(620, 460);
}

// { x: 10, y: 10, width: 620, height: 460 }
console.log({
  x:      rect.x,
  y:      rect.y,
  width:  rect.width,
  height: rect.height
});
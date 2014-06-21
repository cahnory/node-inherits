/*jslint node: true */
'use strict';

var inherits  = require('../lib/inherits');

exports.testConstructors  = function (test) {
  var A, B, C, c;

  A = inherits(function () {
    this.foo  = 'A';
  });
  B = A.inherits(function () {
    this.foo  +=  ' > B';
  });
  C = B.inherits(function () {
    this.foo  +=  ' > C';
  });

  c = new C();

  test.strictEqual(c.foo, 'A > B > C',          'Constructors called from parent to child');
  test.strictEqual(C.prototype.constructor, C,  'Prototype constructor property is Constructor');

  test.done();
};

exports.testProtectedVars  = function (test) {
  var A, B, C, c;

  A = inherits(function () {
    var vars  = this.getProtectedVars();
    vars.foo  = 'A';

    this.getFoo = function () {
      return vars.foo;
    };
  });
  B = A.inherits(function () {
    var vars  = this.getProtectedVars();
    vars.foo  +=  ' > B';
  });
  C = B.inherits(function () {
    var vars  = this.getProtectedVars();
    vars.foo  +=  ' > C';
  });

  c = new C();

  test.strictEqual(c.getFoo(), 'A > B > C', 'Constructors called from parent to child');
  test.strictEqual(c.getProtectedVars, undefined, 'getProtectedVars method is deleted after instantiation');

  test.done();
};
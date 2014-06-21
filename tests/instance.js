/*jslint node: true */
'use strict';

var inherits  = require('../lib/inherits');

exports.testInstanceOf  = function (test) {
  var A, B, C, c;

  A = inherits(function () {});
  B = A.inherits(function () {});
  C = B.inherits(function () {});

  c = new C();

  test.ok(c instanceof C, 'object instance of Constructor');
  test.ok(c instanceof B, 'object instance of Parent');
  test.ok(c instanceof A, 'object instance of deeper Ancestor');

  test.done();
};
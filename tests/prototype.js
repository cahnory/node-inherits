/*jslint node: true */
'use strict';

var inherits  = require('../lib/inherits');

exports.testInheritance  = function (test) {
  var A, B, C;

  // Deepest
  A = inherits(function () {});
  A.prototype.aFoo = 'A';

  // Parent
  B = A.inherits(function () {});
  B.prototype.bFoo  = 'B';

  // Constructor
  C = function () {};
  C.prototype.cFoo  = 'C';
  C = B.inherits(C);


  test.strictEqual(C.prototype.cFoo, 'C',  'Constructor inherits its properties');
  test.strictEqual(C.prototype.bFoo, 'B',  'Parent inherits its properties');
  test.strictEqual(C.prototype.aFoo, 'A',  'Deeper inherits its properties');

  test.done();
};

exports.testDescriptors  = function (test) {
  var
    A, dA,
    B, dB,
    C, dC;

  // Deepest
  A = inherits(function () {});
  // set property
  Object.defineProperty(A.prototype, 'aFoo', {value: 'A', enumerable: false});
  dA = Object.getOwnPropertyDescriptor(A.prototype, 'aFoo');

  
  // Parent
  B = function () {};
  // set property
  Object.defineProperty(B.prototype, 'bFoo', {value: 'B', enumerable: false});
  dB = Object.getOwnPropertyDescriptor(B.prototype, 'bFoo');
  // try to overwrite parent property
  Object.defineProperty(B.prototype, 'aFoo', {value: 'B'});
  // inherits
  B = A.inherits(B);

  
  // Constructor
  C = function () {};
  // set property
  Object.defineProperty(C.prototype, 'cFoo', {value: 'C', enumerable: false});
  dC = Object.getOwnPropertyDescriptor(C.prototype, 'cFoo');
  // try to overwrite ancestors property
  Object.defineProperty(C.prototype, 'aFoo', {value: 'C'});
  Object.defineProperty(C.prototype, 'bFoo', {value: 'C'});
  // inherits
  C = B.inherits(C);


  test.deepEqual(Object.getOwnPropertyDescriptor(C.prototype, 'cFoo'), dC,  'Constructor inherites its properties descriptors');
  test.deepEqual(Object.getOwnPropertyDescriptor(C.prototype, 'bFoo'), dB,  'Parent inherites its properties descriptors');
  test.deepEqual(Object.getOwnPropertyDescriptor(C.prototype, 'aFoo'), dA,  'Deeper inherites its properties descriptors');

  test.done();
};
/*jslint node: true */
'use strict';

var inherits  = require('../lib/inherits');

exports.testInheritance  = function (test) {
  var A, B, C;

  // Deepest
  A = inherits(function () {});
  A.aFoo = 'A';

  // Parent
  B = A.inherits(function () {});
  B.bFoo  = 'B';

  // Constructor
  C = function () {};
  C.cFoo  = 'C';
  C = B.inherits(C);


  test.strictEqual(C.cFoo, 'C',  'Constructor inherits its properties');
  test.strictEqual(C.bFoo, 'B',  'Parent inherits its properties');
  test.strictEqual(C.aFoo, 'A',  'Deeper inherits its properties');

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
  Object.defineProperty(A, 'aFoo', {value: 'A', enumerable: false});
  dA = Object.getOwnPropertyDescriptor(A, 'aFoo');

  
  // Parent
  B = function () {};
  // set property
  Object.defineProperty(B, 'bFoo', {value: 'B', enumerable: false});
  dB = Object.getOwnPropertyDescriptor(B, 'bFoo');
  // try to overwrite parent property
  Object.defineProperty(B, 'aFoo', {value: 'B'});
  // inherits
  B = A.inherits(B);

  
  // Constructor
  C = function () {};
  // set property
  Object.defineProperty(C, 'cFoo', {value: 'C', enumerable: false});
  dC = Object.getOwnPropertyDescriptor(C, 'cFoo');
  // try to overwrite ancestors property
  Object.defineProperty(C, 'aFoo', {value: 'C'});
  Object.defineProperty(C, 'bFoo', {value: 'C'});
  // inherits
  C = B.inherits(C);


  test.deepEqual(Object.getOwnPropertyDescriptor(C, 'cFoo'), dC,  'Constructor inherites its properties descriptors');
  test.deepEqual(Object.getOwnPropertyDescriptor(C, 'bFoo'), dB,  'Parent inherites its properties descriptors');
  test.deepEqual(Object.getOwnPropertyDescriptor(C, 'aFoo'), dA,  'Deeper inherites its properties descriptors');

  test.done();
};
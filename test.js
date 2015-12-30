'use strict';

var getCallerFile = require('.');
var expect = require('chai').expect;
var foo = require('./fixtures/foo');
var bar = require('./fixtures/bar');

describe('getCallerFile', function() {
  it('gets current caller file', function() {
    expect(getCallerFile()).to.eql(__dirname + '/node_modules/mocha/lib/runnable.js');
  });

  it('gets current file, as it is the caller', function() {
    expect(foo()).to.eql(__dirname + '/test.js');
  });

  it('gets another file, as it is the caller', function() {
    expect(bar()).to.eql(__dirname + '/fixtures/bar.js');
  });
});

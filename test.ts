'use strict';

import getCallerFile = require('./');
import chai = require('chai');
import ensurePosix = require('ensure-posix-path');

const expect = chai.expect;

const foo = require('./fixtures/foo');
const bar = require('./fixtures/bar');

describe('getCallerFile', function() {
  const originalStackTraceLimit = Error.stackTraceLimit;

  afterEach(() => Error.stackTraceLimit = originalStackTraceLimit);

  it('gets current caller file', function() {
    expect(ensurePosix(getCallerFile())).to.eql(ensurePosix(__dirname + '/node_modules/mocha/lib/runnable.js'));
  });

  it('gets current file, as it is the caller', function() {
    expect(ensurePosix(foo())).to.eql(ensurePosix(__dirname + '/test.js'));
  });

  it('gets another file, as it is the caller', function() {
    expect(ensurePosix(bar())).to.eql(ensurePosix(__dirname + '/fixtures/bar.js'));
  });


  it('throws error if error stackTraceLimit overflow', function() {
    Error.stackTraceLimit = 5;
    expect(() => getCallerFile(Error.stackTraceLimit + 1)).to.throw(TypeError);
  });

  it('throws no errors if incrementing error stackTraceLimit ', function() {
    Error.stackTraceLimit = 5;
    expect(() => getCallerFile(Error.stackTraceLimit - 1)).to.not.throw(TypeError);
  });
});

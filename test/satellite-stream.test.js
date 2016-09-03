const satelliteStream = require('../src/index');
const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const stream = require('stream');

chai.use(chaiHttp);

describe('satellite-stream', () => {

  let satStream = null;

  before( () => {
    satStream = satelliteStream('myID', 'myRate');
  });

  it('creates a stream', () => {
    assert.ok(satStream instanceof stream.Readable, 'is a Readable stream');
  });

  it('returns the given parameters', () => {
    assert.equal(satStream.id(), 'myID', 'returns ID');
    assert.equal(satStream.rate(), 'myRate', 'returns rate');
  });

  it('makes a connection to API location data', done => {
    satStream.stream( data => {
      assert.ok(data);
      done();
    });
  });
});

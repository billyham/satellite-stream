const satelliteStream = require('../src/index');
const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const stream = require('stream');

chai.use(chaiHttp);

describe('module golden path', () => {

  let satStream = null;

  before( () => {
    satStream = satelliteStream(25544, 1);
  });

  it('creates a Readable stream', () => {
    assert.ok(satStream instanceof stream.Readable, 'is a Readable stream');
  });

  it('returns the initial parameters', () => {
    assert.equal(satStream.id, 25544, 'returns ID');
    assert.equal(satStream.rate, 1, 'returns rate');
  });

  it('with rate of 1, receives at least 4 and no more than 5 stream data chunk of satellite objects in 5 seconds', function(done){
    this.timeout(10000);
    setTimeout( () => {
      if (index < 4 || index > 5) assert.ok(false);
      done();
    }, 5000);
    let index = 0;
    satStream.on('data', chunk => {
      const chunkObj = JSON.parse(chunk);
      assert.property(chunkObj, 'latitude');
      assert.property(chunkObj, 'longitude');
      index++;
    });
  });

  it('ends the stream when instructed to do so', function(done){
    this.timeout(10000);
    satStream.on('end', chunk => {
      assert.ok(true);
      done();
    });
    satStream.end();
  });
});

describe('module error handling', () => {

  let satStreamIdMissing = null;
  let satStreamIdWrongType = null;
  let satStreamWrongId = null;

  it ('returns null with missing ID', () => {
    satStreamIdMissing = satelliteStream();
    assert.isNull(satStreamIdMissing);
  });

  it ('returns null with incorrect ID type', () => {
    satStreamIdWrongType = satelliteStream('wrongType');
    assert.isNull(satStreamIdWrongType);
  });

  it ('returns 404 "satellite not found" error object with incorrect satellite id', function(done){
    this.timeout(10000);
    satStreamWrongId = satelliteStream(123);
    satStreamWrongId.on('data', chunk => {
      const chunkObj = JSON.parse(chunk);
      assert.equal(chunkObj.status, 404);
      assert.equal(chunkObj.error, 'satellite not found');
      done();
    });
  });

});

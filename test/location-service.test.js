const locationService = require('../src/location-service');
const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;

chai.use(chaiHttp);

const satelliteId = '25544';

describe('locationService golden path', ()=> {

  it('returns a valid buffer, no errors', function(done){
    this.timeout(10000);
    locationService.id(satelliteId, (err, data) => {
      assert.isNull(err);
      assert.ok(Buffer.isBuffer(data));
      done();
    });
  });
});

describe('locationService edge cases', () => {

  it('returns 404 "satellite not found" error with incorrect ID', function(done){
    this.timeout(10000);
    locationService.id(234, (err, data) => {
      const dataObj = JSON.parse(data);
      assert.equal(dataObj.status, 404);
      assert.equal(dataObj.error, 'satellite not found');
      done();
    });
  });

  it('returns 404 "satellite not found" error with missing ID', function(done){
    this.timeout(10000);
    locationService.id(null, (err, data) => {
      const dataObj = JSON.parse(data);
      assert.equal(dataObj.status, 404);
      assert.equal(dataObj.error, 'satellite not found');
      done();
    });
  });

  it('returns 404 "satellite not found" error with ID as wrong type', function(done){
    this.timeout(10000);
    locationService.id({}, (err, data) => {
      const dataObj = JSON.parse(data);
      assert.equal(dataObj.status, 404);
      assert.equal(dataObj.error, 'satellite not found');
      done();
    });
  });

});

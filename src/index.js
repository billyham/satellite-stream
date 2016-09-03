const stream = require('stream');
const location = require('./location');

module.exports = function(id, rate){

  class Satellite extends stream.Readable{
    id(){
      return id;
    }
    rate(){
      return rate;
    }
    stream(callback){
      location.id('25544', (err, data) => {
        callback(data);
      });
    }
  }

  return new Satellite(id, rate);
};

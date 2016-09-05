const Readable = require('stream').Readable;
const locationService = require('./location-service');

module.exports = function(id, rate, options){

  if (!id) return null;
  if (typeof id !== 'number') return null;

  class Satellite extends Readable{
    constructor(id, rate, options) {
      super(options);
      this.id = id;
      this.rate = rate || 1;
      this.interval = null;
    }

    _read(){
      if (this.interval) return;
      this.interval = setInterval( () => {
        this._stream( data => {
          let buf = Buffer.from(data);
          // TODO: is push returns false, stop the interval
          this.push(buf);
        });
      }, this.rate * 1000);
    }

    _stream(callback){
      locationService.id(this.id, (err, data) => {
        callback(data);
      });
    }

    // TODO: override pause and resume functions to stop and restart the location interval calls

    end(){
      clearInterval(this.interval);
      this.interval = null;
      this.push(null);
    }
  }

  return new Satellite(id, rate, options);
};

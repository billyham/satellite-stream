const Readable = require('stream').Readable;
const locationService = require('./location-service');

module.exports = function(id, rate, options){

  if (!id) return null;
  if (typeof id !== 'string') return null;

  var _interval = null;

  class Satellite extends Readable{
    constructor(_id, _rate, _options) {
      super(_options);
      this.id = _id;
      this.rate = _rate || 1;
      this.stopped = false;
    }

    _read(){
      if (_interval) return;
      _interval = setInterval( () => {
        this._stream( data => {
          let buf = Buffer.from(data);
          this.push(buf);

          // Cancel the interval if no listeners exist
          const listenerCount = this.listeners('data').length;
          if (listenerCount === 0) this._end();
        });
      }, this.rate * 1000);

    }

    _stream(callback){
      locationService.id(this.id, (err, data) => {
        callback(data);
      });
    }

    _end(){
      clearInterval(_interval);
      _interval = null;
      this.push(null);
      this.stopped = true;
    }
  }

  return new Satellite(id, rate, options);
};

const https = require('https');

module.exports = {

  id(id, callback){
    let url = 'https://api.wheretheiss.at/v1/satellites/' + id;
    https.get(url, res => {
      let data = null;
      res.on('data', chunk => {
        data = data ? data + chunk : chunk;
      });
      res.on('end', () => {
        callback(null, data);
      });
    });
  }

};

const https = require('https');

module.exports = {

  id(id, callback){
    let url = 'https://api.wheretheiss.at/v1/satellites/' + id;
    https.get(url, res => {
      let data = {};
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        callback(null, data);
      });
    });
    // .on('error', error => {
    //   console.log('location error');
    // });
  }

};

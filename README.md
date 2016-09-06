[![Build Status](https://travis-ci.org/billyham/satellite-stream.svg?branch=master)](https://travis-ci.org/billyham/satellite-stream)

# satellite-stream

A stream of satellite location data from whereistheiss.at API.

***

## Installation
`npm install satellite-stream --save`

## Example
```javascript
const satelliteStream = require('satellite-stream');

const id = '25544;'
const rateAsSeconds = 1;
let readableStream = satelliteStream(id, rateAsSeconds);
```

When invoking the stream's 'data' event listener, the stream will return location information as JSON objects. An example with keys and sample values:
```javascript
{
    "name": "iss",
    "id": 25544,
    "latitude": 50.11496269845,
    "longitude": 118.07900427317,
    "altitude": 408.05526028199,
    "velocity": 27635.971970874,
    "visibility": "daylight",
    "footprint": 4446.1877699772,
    "timestamp": 1364069476,
    "daynum": 2456375.3411574,
    "solar_lat": 1.3327003598631,
    "solar_lon": 238.78610691196,
    "units": "kilometers"
}
```


## API  

```javascript
let stream = satelliteStream(id, [rate, options]) -> Stream
```

 - `id`: `<string>`, identifying the satellite
 - `rate`: (optional) `<integer>`, interval in seconds between stream updates. Default is 1.
 - `options`: (optional) `<object>`, passed as the options argument to the parent class constructor: `stream.Readable`. Default is null.

Returns instance of class `Satellite`, a child class of `stream.Readable`

Will return null if `id` is missing of the wrong type.

Will return `{error: 'satellite not found, status: 404'}` with incorrect satellite ID.


## Module Tests
`npm test`

[![Build Status](https://travis-ci.org/billyham/satellite-stream.svg?branch=master)](https://travis-ci.org/billyham/satellite-stream)

# satellite-stream

A stream of satellite location data from whereistheiss.at API. The module is a factory function that produces a Satellite object, a sub class of stream.Readable.

***

## Installation
`npm install satellite-stream --save`

## Example

```javascript
const Satellite = require('satellite-stream');

const id = '25544;'
const rateAsSeconds = 1;

var satelliteStream = Satellite(id, rateAsSeconds);

satelliteStream.on('data', function(data){
  // will be called at regular intervals based on rateAsSeconds
}

or

satelliteStream.pipe(Your Transform or Writable)
```

When invoking the stream's 'data' event listener, the stream will return location information as JSON objects. An example with keys and sample values:

```json
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
satelliteStream(id[, rate, options]) -> readableStream
```

 - `id <string>` is the ID of the satellite. Currently ISS is the only tracked satellite. Its ID is 25544.
 - `rate <integer>` (optional) is the interval in seconds between stream updates. Default (and the minimum) is 1.
 - `options <object>` (optional) is the optional arguments to the parent class constructor: `stream.Readable`. Default is null.

Returns instance of class `Satellite`, a sub class of `stream.Readable`

Will return null if `id` is missing or the wrong type.

Will return an error object with incorrect satellite ID.
```javascript
{ error: 'satellite not found', status: 404 }
```


## Module Tests
The module includes tests using Chai, Eslint and the Mocha test runner.

```javascript
npm test
```


## Known Issues
 - The URL for connecting to the satellite data API is hard-coded as:  `https://api.wheretheiss.at/v1/satellites`.


## ISC License

 Copyright (c) 2016, Dave Hanagan

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

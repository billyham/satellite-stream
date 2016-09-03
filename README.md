# satellite-stream

A stream of satellite location data from whereistheiss.at API.

***

## Installation
`npm install satellite-stream --save`

## Example
```javascript
const satelliteStream = require('satellite-stream');

const id = '25544';
const rateAsSeconds = 1;
let readableStream = satelliteStream(id, rateAsSeconds);
```

## API
```javascript
let stream = satelliteStream(id, rate) -> Stream
```
 - `id`: integer identifying the satellite
 - `rate`: integer, interval between stream updates
 Returns a readable stream.

## Module Tests
`npm test`

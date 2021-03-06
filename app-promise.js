const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true
    }
  })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;



axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var weatherUrl = `https://api.darksky.net/forecast/ef643cf96f231dc4ad4d601e6c0cf031/${lat},${lng}`;

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log ('temperature is ', temperature, ' and apparent temp is ', apparentTemperature);
}).catch((e) => {
  if (e.code === 'ENOTFOUND'){
    console.log('unable to connect to api servers.');
  } else {
    console.log(e.message);
  }
});

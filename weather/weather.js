const request = require ('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/ef643cf96f231dc4ad4d601e6c0cf031/${lat},${lng}`,
    json: true

  }, (error, response, body) => {
    if (error) {
      callback('error');
    } else if (response.statusCode === 404) {
      callback('unable to fetch weather');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    }
  });
}

module.exports.getWeather = getWeather;

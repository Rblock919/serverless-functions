const rp = require('request-promise-native');
const logger = require('./utils/logger');

const options = {
  method: 'GET',
  uri: 'https://www.metaweather.com/api/location/2378426/',
  headers: {
    'content-type': 'application/json',
  },
  json: true, // Automatically stringifies the body to JSON
};

exports.handler = async (event, context) => {
  logger.info(JSON.stringify(event));

  try {
    const response = await rp(options);
    logger.info(JSON.stringify(response));
    return response;
  } catch (err) {
    logger.error(err);
  }
};
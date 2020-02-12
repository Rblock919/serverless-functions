const rp = require('request-promise-native');
const logger = require('./utils/logger');

const options = {
  method: 'GET',
  uri: '',
  headers: {
    'content-type': 'application/json',
  },
  json: true, // Automatically stringifies the body to JSON
};

exports.handler = async (event, context) => {
  logger.info(`EVENT : ${JSON.stringify(event)}`);
  logger.info(`CONTEXT : ${JSON.stringify(context)}`);

  try {
    const response = await rp(options);
    logger.info(JSON.stringify(response));
    return response;
  } catch (err) {
    logger.error(err);
    return null;
  }
};
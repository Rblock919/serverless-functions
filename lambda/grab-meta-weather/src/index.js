// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});
// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
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

const today = new Date();
let month = today.getMonth();
let dayOfMonth = today.getDate();
const fullYear = today.getFullYear();

// add a 0 if it's under 10 to keep things easily sortable
month = month < 10 ? `0${month}` : month;
dayOfMonth = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth;

const date = `${month}${dayOfMonth}${fullYear}`;
const params = {
  TableName: 'meta-weather',
  Item: {
    'date': {S: date},
    'test': {S: 'oh hey there'}
  }
};

exports.handler = async (event) => {
  logger.info(`EVENT : ${JSON.stringify(event)}`);

  try {
    const response = await rp(options);
    logger.info(`RESPONSE: + ${JSON.stringify(response)}`);

    // UNCOMMENT WHEN READY TO CONSTRUCT DYNAMODB OBJECTS AND ACTUALLY PERSIST SOME DATA
    // const successData = await ddb.putItem(params).promise();
    // logger.info(`SUCCESSDATA: ${JSON.stringify(successData)}`)

    return {response: 'Success'};
  } catch (err) {
    logger.error(err);
    return null;
  }
};

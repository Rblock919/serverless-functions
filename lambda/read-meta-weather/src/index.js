// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});
// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const logger = require('./utils/logger');

const params = {
  TableName: 'meta-weather',
  Key: {
    'date': {S: '01152020'}
  }
};

exports.handler = async (event, context) => {
  logger.info(`EVENT : ${JSON.stringify(event)}`);
  logger.info(`CONTEXT : ${JSON.stringify(context)}`);

  // Call DynamoDB to read the item from the table
  try {
    const data = await ddb.getItem(params).promise();
    logger.info(`DATA: ${JSON.stringify(data)}`);
    return JSON.stringify(data);
  } catch (err) {
    logger.error(`ERROR: ${err}`);
    return null;
  }

};

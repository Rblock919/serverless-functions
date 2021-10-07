"use strict";
const rp = require("request-promise-native");

const options = {
    method: "GET",
    uri: "https://www.metaweather.com/api/location/2378426/",
    headers: {
        "content-type": "application/json",
    },
    json: true, // Automatically stringifies the body to JSON
};

module.exports = async (context, callback) => {
    try {
        const weather = await rp(options);
        return { weather };
    } catch (error) {
        callback(error, null);
    }
};


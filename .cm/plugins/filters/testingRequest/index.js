const axios = require('axios');
const moment = require('moment');

const testingRequest = async repo => {
  let result = null;

  try {
    const response = await axios.post('https://webhook.site/f2e02b15-b1ab-4eca-a89f-2338340a0637', {
      repo,
      timestamp: moment().format('MMMM Do YYYY, HH:mm:ss')
    });
    result = response.data;
    console.log('POST request successful:', result);
  } catch (error) {
    console.error('Error in POST request:', error);
  }

  return callback(null, result);
};

module.exports = {
  async: true,
  filter: testingRequest
};

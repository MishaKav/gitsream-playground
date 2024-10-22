const axios = require('axios');
const moment = require('moment');

const testingRequest = async (repo, callback) => {
  let result = null;

  try {
    const response = await axios.post('https://webhook.site/e2f834cf-4596-4a19-8d64-2575b051c02a', {
      repoName: repo.name,
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

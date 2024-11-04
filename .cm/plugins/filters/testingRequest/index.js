const axios = require('axios');
const moment = require('moment');

const testingRequest = async (repo, callback) => {
  let result = null;

  try {
    const response = await axios.post('https://webhook.site/b4176033-07ab-4892-9f38-1ec35a523d5e', {
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

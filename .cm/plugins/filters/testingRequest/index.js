const axios = require('axios');
const moment = require('moment');

const testingRequest = async (shouldSendRequest, repo, callback) => {
  const cacheKey = `${__filename}`;

  if (!shouldSendRequest) {
    process.env[cacheKey] = null;
  }

  if (process.env[cacheKey]) {
    return callback(null, process.env[cacheKey]);
  }

  let result = null;

  try {
    const response = await axios.post('https://webhook.site/67d33450-d983-450f-a041-5d082a9a9528', {
      repoName: repo.name,
      timestamp: moment().format('MMMM Do YYYY, HH:mm:ss')
    });
    result = response.data;
    console.log('POST request successful:', result);
  } catch (error) {
    console.error('Error in POST request:', error);
  }

  process.env[cacheKey] = result;

  return callback(null, process.env[cacheKey]);
};

module.exports = {
  async: true,
  filter: testingRequest
};

/**
 * @module suggestedIssues
 * @description Fetches ticket recommendations based on given pull request details.
 * @param {object} pr - The pull request object containing title, author, and created_at properties.
 * @param {string} apiKey - The API key used to authenticate requests.
 * @returns {Array} Returns an array of suggested issues related to the current Pull Request.
 * @example {{ pr | suggestedIssues(env.LINEARB_TOKEN) }}
 * @license MIT
 **/

const axios = require('axios');

const suggestedIssues = async (pr, apiKey, callback) => {
  const url = 'https://public-api.linearb-dev-01.io/api/v1/inference/get_ticket_recommendation';

  const requestData = {
    request_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // <-- local UUID per call
    pull_request: {
      title: pr.title, // PR title
      issuer_name: pr.author, // PR author
      // created_at: pr.created_at // PR creation date
      created_at: '2024-07-29T08:33:15Z' // PR creation date
    }
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: { 'x-api-key': apiKey }
    });
    const result = response.data;

    if (result?.recommendations?.jira_tickets) {
      // Extract the first 3 issues
      const issues = result.recommendations.jira_tickets.slice(0, 3);

      // Map to the desired object format containing the issue URL and issue title
      const issuesMarkdown = issues
        .map(issue => ({
          url: issue.issue_provider_url,
          title: issue.title.replace(/\n/g, '').trim(),
          key: issue.issue_key
        }))
        // Map to the desired object format containing the issue URL and issue title
        .map(issue => `- [ ] [${issue.key} - ${issue.title}](${issue.url})`)
        .join('\n');

      return callback(null, issuesMarkdown);
    } else {
      console.log('Invalid response structure:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.log(`Error ${result.status}:`, error);
  }
};

module.exports = {
  async: true,
  filter: suggestedIssues
};

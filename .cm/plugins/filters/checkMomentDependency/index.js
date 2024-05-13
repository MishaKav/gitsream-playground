const moment = require('moment');

module.exports = repo => {
  if (repo) {
    console.log(`checkMomentDependency in ${repo.name}`);
  } else {
    console.log(`checkMomentDependency`);
  }

  const result = moment().format('MMMM Do YYYY, h:mm:ss a');
  return result;
};

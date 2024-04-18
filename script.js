module.exports = (async function (core) {
  const { RulesEngine, executeGitCommand } = require('@linearb/gitstream-core');
  const { execSync } = require('child_process');

  try {
    const exec = cmd => {
      try {
        console.log(`Running command: ${cmd}`);
        const res = execSync(cmd).toString();
        console.log(res);
        console.log('_________________________');
      } catch (err) {
        core.error(`Failed to exec: ${err}`);
      }
    };

    executeGitCommand(`git branch --show-current`);
    executeGitCommand(`git rev-parse --verify test-pure-action-2`);
    executeGitCommand(`git rev-parse --verify main`);
    console.log('_________________________________________________');
    // executeGitCommand(`git diff 'main'...$'test-pure-action-2' -- $'.cm/*.cm'`);
    executeGitCommand(`git diff main...test-pure-action-2 .cm/*.cm`);
    console.log('_________________________________________________');
    // await RulesEngine().run();
  } catch (err) {
    core.error(`Failed run RulesEngine: ${err}`);
    process.exit(1);
  }
})();

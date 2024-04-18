const { RulesEngine } = require('@linearb/gitstream-core');
// const { executeGitCommand } = require('@linearb/gitstream-core/dist/rule-engine/utils/git.service');
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

  exec('ls');
  exec('cd code && ls');
  exec('cd code && cd repo && ls');
  console.log('_________________________________________________');
  //await RulesEngine().run();
} catch (err) {
  core.error(`Failed run RulesEngine: ${err}`);
  process.exit(1);
}

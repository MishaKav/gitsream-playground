const {
  executeGitCommand,
  escapeFileName,
  FILE_CONTENT,
  LS_FILES,
  DIFF,
  GIT_SHOW
} = require('@linearb/gitstream-core');

// git diff

// const files = [`pash'a.ts`, '*.js', '.gitignore'];
// const ignoreFiles = files?.map(file => `${escapeFileName(file, ':(exclude)')}`)?.join(' ');
// const result = executeGitCommand(
//   `git diff main...fix-ignore-files-with-escaping ${ignoreFiles}`,
//   './'
// );

// console.log(result);
// const branchName = 'branch_`name';
// const branchName = 'fix-ignore-files-with-escaping';
// const files = [`pash'a.ts `, '.gitignore'];
// files.forEach(file => {
//   const result = executeGitCommand(`git show ${quote([branchName])}:${escapeFileName(file)}`, './');
//   console.log(result);
// });

const branches = [
  'branch_`name',
  'fix-ignore-files-with-escaping',
  'name-wi/-quot`es',
  'name-wi/-q"uotes'
];
const files = [`pash'a.ts `, 'pash"a.ts'];
branches.forEach(branch => {
  files.forEach(file => {
    const cmd = GIT_SHOW({ branch, file });
    console.log(cmd);
    const result = executeGitCommand(cmd, './');
    console.log(result);
  });
});

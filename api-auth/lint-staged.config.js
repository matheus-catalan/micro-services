module.exports = {
  '*.js': () => [
    'git pull origin develop',
    'git add . ',
    'yarn eslintify',
    'rm -r database/db_testing.sqlite',
    'yarn test',
  ],
}

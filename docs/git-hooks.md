# Git Hooks Configuration

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks, ensuring code quality and consistency across the team.

## Available Hooks

### Pre-commit Hook
Runs before each commit is created:
- Lints staged TypeScript/JavaScript files using ESLint
- Formats staged files using Prettier
- Only runs on staged files using lint-staged
- Prevents commits if there are linting errors

```bash
# What happens when you run git commit:
1. ESLint checks your staged .ts/.tsx/.js/.jsx files
2. Prettier formats your staged files
3. If any check fails, the commit is aborted
```

### Commit Message Hook
Enforces [Conventional Commits](https://www.conventionalcommits.org/) format:
- Ensures consistent commit message format
- Makes changelog generation easier
- Helps with semantic versioning

```bash
# Commit message format:
<type>[optional scope]: <description>

# Types:
- feat:     New feature
- fix:      Bug fix
- docs:     Documentation changes
- style:    Code style changes (formatting, etc.)
- refactor: Code changes that neither fix bugs nor add features
- perf:     Performance improvements
- test:     Adding or fixing tests
- chore:    Maintenance tasks
- revert:   Reverting previous commits
- ci:       CI configuration changes
- build:    Build system changes
```

### Pre-push Hook
Runs before code is pushed to the remote repository:
- Runs all tests
- Prevents pushing if tests fail
- Helps maintain a stable main branch

```bash
# What happens when you run git push:
1. All tests are run
2. If any test fails, the push is aborted
```

### Post-merge Hook
Runs after pulling changes from the remote repository:
- Checks if package.json was changed
- Automatically runs npm install if needed
- Keeps dependencies up to date

## Using Commitizen

We've integrated [Commitizen](https://commitizen.github.io/cz-cli/) to make it easier to write conventional commits:

```bash
# Instead of git commit, use:
npm run commit

# This will start an interactive prompt:
1. Select the type of change
2. Enter the scope (optional)
3. Write a short description
4. Add a longer description (optional)
5. Indicate breaking changes (optional)
6. Reference issues (optional)
```

## Best Practices

1. **Making Commits**
   - Use `npm run commit` for guided commit messages
   - Keep commits focused and atomic
   - Write clear, descriptive commit messages

2. **Before Pushing**
   - Run tests locally (`npm test`)
   - Review your changes
   - Pull and merge latest changes from main

3. **After Pulling**
   - Watch for package.json changes
   - Run `npm install` if dependencies changed
   - Check for breaking changes in the commit history

## Troubleshooting

### Hook Not Running
```bash
# If hooks aren't running, try:
npm run prepare  # Reinstalls Husky hooks
```

### Skipping Hooks
```bash
# Only use these in emergencies!
git commit --no-verify  # Skip pre-commit hook
git push --no-verify   # Skip pre-push hook
```

### Common Issues

1. **ESLint Errors**
   - Run `npm run lint:fix` to automatically fix issues
   - Check .eslintrc.js for rule configurations

2. **Prettier Formatting**
   - Run `npm run format` to format all files
   - Check .prettierrc for formatting rules

3. **Failed Commit Message**
   - Use `npm run commit` for guided commit creation
   - Check commitlint.config.js for rules

## Configuration Files

- `.husky/`: Hook scripts
- `commitlint.config.js`: Commit message rules
- `package.json`: lint-staged and Commitizen config
- `.eslintrc.js`: Linting rules
- `.prettierrc`: Code formatting rules 
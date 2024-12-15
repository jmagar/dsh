# Contributing to DSH

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites
- Node.js 20.x
- npm 10.x
- PostgreSQL 16
- Redis 7

### Installation
```bash
npm install
npm run prepare
```

## Running the Project

- Development: `npm run dev`
- Build: `npm run build`
- Test: `npm test`

## Commit Guidelines

- Use conventional commits
- Format: `<type>(scope): description`
- Types: 
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation changes
  - `style`: Code formatting
  - `refactor`: Code restructuring
  - `test`: Adding tests
  - `chore`: Maintenance tasks

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add description of changes
4. Wait for code review

## Code of Conduct

Be respectful, inclusive, and constructive.

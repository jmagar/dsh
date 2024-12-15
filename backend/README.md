# DSH Backend

## Prerequisites

- Node.js (v20.11.0)
- PostgreSQL
- Redis

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and update with your configuration
3. Install dependencies:
   ```bash
   npm install
   ```

4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

5. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

## Development

- Start development server:
  ```bash
  npm run dev
  ```

- Run tests:
  ```bash
  npm test
  ```

- Lint code:
  ```bash
  npm run lint
  ```

## Build and Deploy

- Build project:
  ```bash
  npm run build
  ```

- Start production server:
  ```bash
  npm start
  ```

## Configuration

See `.env.example` for all configurable environment variables.

## Contributing

1. Ensure code passes linting: `npm run lint`
2. Ensure tests pass: `npm test`
3. Submit a pull request

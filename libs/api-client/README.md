# @layered-frontend-demo/api-client

API client library for the LayeredFrontendDemo application. Provides a typed interface for communicating with the Rails backend API.

## Installation

This is a workspace package and is automatically linked when you install dependencies in the root project.

```bash
npm install
```

## Usage

```typescript
import { ApiClient } from '@layered-frontend-demo/api-client';

// Create an API client instance
const apiClient = new ApiClient({
  hostname: 'localhost',
  port: 3000,
  protocol: 'http',
  basePath: '', // optional
});

// Login
const loginResult = await apiClient.login('user@example.com', 'password');
if (loginResult.error) {
  console.error('Login failed:', loginResult.error);
} else {
  console.log('Logged in:', loginResult.data?.user);
}

// Get current user
const userResult = await apiClient.getCurrentUser();
if (userResult.data) {
  console.log('Current user:', userResult.data);
}

// Logout
const logoutResult = await apiClient.logout();
```

## API

### `ApiClient`

The main class for making API requests.

#### Constructor

```typescript
new ApiClient(config: ApiClientConfig)
```

**Config options:**
- `hostname` (required): Server hostname
- `port` (optional): Server port
- `protocol` (optional): 'http' | 'https' (default: 'http')
- `basePath` (optional): Base path for all API requests

#### Methods

**`login(email: string, password: string): Promise<ApiResult<LoginResponse>>`**

Authenticate a user with email and password.

**`logout(): Promise<ApiResult<LogoutResponse>>`**

Log out the current user.

**`getCurrentUser(): Promise<ApiResult<UserResponse>>`**

Get information about the currently authenticated user.

### Types

All methods return `ApiResult<T>` which has the structure:

```typescript
interface ApiResult<T> {
  data?: T;
  error?: string;
}
```

- On success: `{ data: T }`
- On error: `{ error: string }`

## Development

### Build

```bash
npm run build
```

### Test

```bash
# Run all tests
npm test

# Run only unit tests
npm test -- tests/apiClient.test.ts

# Run tests in watch mode
npm run test:watch
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## Project Structure

```
packages/api-client/
├── src/
│   ├── apiClient.ts    # Main ApiClient implementation
│   └── index.ts        # Public exports
├── tests/
│   ├── apiClient.test.ts              # Unit tests
│   └── apiClient.integration.test.ts  # Integration tests
├── dist/               # Build output (generated)
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── eslint.config.js
└── .prettierrc
```

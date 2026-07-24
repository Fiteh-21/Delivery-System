# Delivery System

A delivery management system with a Laravel backend API and React frontend.

## Project Structure

```
├── Backend/                # Laravel 12 API
│   ├── app/                # Application code
│   ├── config/             # Configuration files
│   ├── database/           # Migrations, factories, seeders
│   ├── docs/               # Backend documentation
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   ├── tests/              # PHPUnit tests
│   │   ├── Feature/        # Feature tests (15 endpoints)
│   │   └── Unit/           # Unit tests (User model)
│   └── dockerfiles/        # Docker build files
├── Frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── lib/            # Utilities (api client, cn)
│   │   ├── pages/          # Route pages
│   │   ├── stores/         # Zustand state stores
│   │   ├── test/           # Test setup
│   │   └── types/          # TypeScript types
│   ├── docs/               # Frontend documentation
│   └── scripts/            # Utility scripts
├── .github/workflows/      # CI/CD pipelines
└── README.md
```

## Getting Started

### Backend (Docker)

```bash
cd Backend
cp .env.example .env
cp compose.override.yaml.example compose.override.yaml
docker compose up -d --build
docker compose run --rm composer install
docker compose run --rm artisan key:generate
docker compose run --rm artisan migrate
```

Application: http://localhost

### Backend (Local)

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Application: http://127.0.0.1:8000

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Application: http://localhost:5173

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/register` | Register user | No |
| POST | `/api/v1/login` | Login | No |
| POST | `/api/v1/logout` | Logout | Yes |
| GET | `/api/v1/profile` | Get profile | Yes |
| PUT | `/api/v1/change-password` | Change password | Yes |
| GET | `/api/v1/health` | Health check | No |
| POST | `/api/v1/forgot-password` | Request password reset | No |
| POST | `/api/v1/reset-password` | Reset password | No |
| GET | `/api/v1/email/verify/{id}/{hash}` | Verify email | No |
| POST | `/api/v1/email/resend` | Resend verification | Yes |

## Tech Stack

### Backend

| Tool | Purpose |
|---|---|
| Laravel 12 | PHP framework |
| PHP 8.2+ | Language |
| Laravel Sanctum | API token authentication |
| grazulex/laravel-apiroute | API versioning |
| dedoc/scramble | Auto-generated API docs |
| Laravel Pint | Code style |
| PHPUnit | Testing |

### Frontend

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript | Type safety |
| Vite 8 | Build tool |
| Tailwind CSS 4 | Styling |
| shadcn/ui | UI components |
| Zustand | State management |
| TanStack React Query | Server state |
| React Router | Routing |
| React Hook Form | Forms |
| Zod | Validation |
| Axios | HTTP client |
| Vitest | Testing |

## Testing

### Backend (PHPUnit)

```bash
cd Backend
php artisan test                    # Run all tests
php artisan test --testsuite=Unit   # Unit tests only
php artisan test --testsuite=Feature # Feature tests only
php artisan test --filter=AuthTest  # Specific test class
```

**Test coverage:**

| Test Class | Tests | Coverage |
|---|---|---|
| AuthTest | 15 | Register, Login, Logout, Profile, Health |
| ChangePasswordTest | 7 | Password change, validation |
| EmailVerificationTest | 6 | Verify, resend, invalid hash |
| PasswordResetTest | 8 | Forgot/reset password |
| RateLimitingTest | 5 | Throttle behavior |
| UserTest | 9 | Model, factory, hashing |
| **Total** | **50** | |

### Frontend (Vitest)

```bash
cd Frontend
npm run test          # Watch mode
npm run test:run      # Single run
npm run test:coverage # With coverage
```

**Test coverage:**

| Test File | Tests | Coverage |
|---|---|---|
| button.test.tsx | 10 | Variants, sizes, disabled, ref |
| input.test.tsx | 7 | Types, placeholder, disabled |
| label.test.tsx | 3 | Rendering, styling |
| card.test.tsx | 6 | All card sub-components |
| LoginPage.test.tsx | 5 | Form, validation, submit |
| RegisterPage.test.tsx | 6 | Form, validation, password match |
| DashboardPage.test.tsx | 5 | User info, logout |
| auth.test.ts | 6 | Login, logout, profile, token |
| utils.test.ts | 5 | cn() function |
| **Total** | **53+** | |

## Code Quality

### Backend

```bash
cd Backend
vendor/bin/pint --test              # Code style check
bash scripts/check-naming.sh        # Naming conventions
```

### Frontend

```bash
cd Frontend
npm run lint                        # Lint (oxlint)
npx tsc --noEmit                    # Type check
bash scripts/check-naming.sh        # Naming conventions
```

## CI/CD

GitHub Actions pipeline runs on push/PR to `main`/`develop`:

```
┌─────────────────────────────────────────────────────────┐
│                        CI Pipeline                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Backend                                                 │
│  ├── Lint (Pint + Naming Check)                          │
│  └── Test (PHP 8.2/8.3/8.4 x SQLite/MySQL/PostgreSQL)   │
│                                                          │
│  Frontend                                                │
│  ├── Lint (TSC + OxLint + Naming Check)                  │
│  ├── Test (Vitest)                                       │
│  └── Build (Production)                                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Documentation

### Backend

- [Backend Documentation](Backend/docs/README.md)
- [API Versioning](Backend/docs/laravel-api-versioning.md)
- [Sanctum Authentication](Backend/docs/sanctum-authentication.md)
- [API Docs (Scramble)](Backend/docs/scramble-api-docs.md)
- [Docker Development](Backend/docs/docker-development.md)
- [Testing](Backend/docs/testing.md)
- [Rate Limiting](Backend/docs/rate-limiting.md)

### Frontend

- [Frontend Documentation](Frontend/docs/README.md)
- [Architecture](Frontend/docs/architecture.md)
- [Project Structure](Frontend/docs/project-structure.md)
- [Components](Frontend/docs/components.md)
- [State Management](Frontend/docs/state-management.md)
- [API Integration](Frontend/docs/api-integration.md)
- [Forms & Validation](Frontend/docs/forms-validation.md)
- [Routing](Frontend/docs/routing.md)
- [Styling](Frontend/docs/styling.md)
- [Testing](Frontend/docs/testing.md)

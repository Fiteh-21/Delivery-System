# Delivery System

A delivery management system with a Laravel backend API.

## Project Structure

```
├── Backend/           # Laravel 12 API
│   ├── app/           # Application code
│   ├── config/        # Configuration
│   ├── database/      # Migrations, factories, seeders
│   ├── docs/          # Backend documentation
│   ├── routes/        # API routes
│   ├── scripts/       # Utility scripts
│   ├── tests/         # PHPUnit tests
│   └── dockerfiles/   # Docker build files
└── README.md
```

## Getting Started

### Backend

See [Backend/docs/README.md](Backend/docs/README.md) for full documentation.

#### Quick Start (Docker)

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

#### Quick Start (Local)

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Application: http://127.0.0.1:8000

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/register` | Register user | No |
| POST | `/api/v1/login` | Login | No |
| POST | `/api/v1/logout` | Logout | Yes |
| GET | `/api/v1/profile` | Get profile | Yes |
| PUT | `/api/v1/change-password` | Change password | Yes |
| GET | `/api/v1/health` | Health check | No |

## Tech Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Auth**: Laravel Sanctum
- **API Versioning**: grazulex/laravel-apiroute
- **API Docs**: dedoc/scramble
- **CI/CD**: GitHub Actions
- **Code Style**: Laravel Pint

## Development

### Run Tests

```bash
cd Backend
php artisan test
```

### Code Style

```bash
cd Backend
vendor/bin/pint --test
```

### Naming Convention Check

```bash
cd Backend
bash scripts/check-naming.sh
```

## Documentation

- [Backend Documentation](Backend/docs/README.md)
- [API Versioning](Backend/docs/laravel-api-versioning.md)
- [Sanctum Authentication](Backend/docs/sanctum-authentication.md)
- [API Docs (Scramble)](Backend/docs/scramble-api-docs.md)
- [Docker Development](Backend/docs/docker-development.md)
- [Testing](Backend/docs/testing.md)
- [Rate Limiting](Backend/docs/rate-limiting.md)

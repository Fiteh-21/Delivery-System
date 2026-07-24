# Testing with PHPUnit

This project uses **PHPUnit 11** for testing with Laravel's built-in test utilities.

## Setup

PHPUnit is configured in `phpunit.xml` with in-memory SQLite for tests:

```xml
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
```

## Running Tests

```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Unit
php artisan test --testsuite=Feature

# Run specific test file
php artisan test tests/Feature/AuthTest.php

# Run specific test method
php artisan test --filter=test_user_can_register

# Run with coverage
php artisan test --coverage

# Clear config before running
composer test
```

## Test Structure

```
tests/
├── TestCase.php              # Base test class
├── Feature/
│   └── AuthTest.php          # Auth endpoint tests (15 tests)
└── Unit/
```

## Writing Tests

### Unit Tests

Tests that don't interact with the database:

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function test_true_is_true(): void
    {
        $this->assertTrue(true);
    }
}
```

### Feature Tests

Tests that interact with routes, models, and database:

```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_user_can_register(): void
    {
        $response = $this->postJson('/api/v1/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'username' => 'johndoe',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertCreated()
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'username'],
                'access_token',
                'token_type',
                'expires_at',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com',
            'username' => 'johndoe',
        ]);
    }

    public function test_user_can_login_with_email(): void
    {
        User::factory()->create([
            'email' => 'john@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/v1/login', [
            'login' => 'john@example.com',
            'password' => 'password123',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['access_token']);
    }

    public function test_authenticated_user_can_get_profile(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->getJson('/api/v1/profile');

        $response->assertOk()
            ->assertJsonFragment(['email' => $user->email]);
    }
}
```

### Available Auth Tests

```bash
php artisan test --filter=AuthTest
```

| Test | Description |
|---|---|
| `test_user_can_register` | Register returns user + token |
| `test_register_requires_name` | Name validation |
| `test_register_requires_valid_email` | Email format validation |
| `test_register_requires_unique_email` | Email uniqueness |
| `test_register_requires_unique_username` | Username uniqueness |
| `test_register_requires_password_confirmation` | Password confirmation |
| `test_user_can_login_with_email` | Login with email |
| `test_user_can_login_with_username` | Login with username |
| `test_login_fails_with_wrong_password` | Wrong password rejected |
| `test_login_fails_with_nonexistent_user` | Unknown user rejected |
| `test_login_requires_login_field` | Login field required |
| `test_authenticated_user_can_get_profile` | Profile with auth |
| `test_unauthenticated_user_cannot_get_profile` | Profile without auth |
| `test_authenticated_user_can_logout` | Logout revokes token |
| `test_health_check_returns_healthy` | Health endpoint |

### Testing with Authentication

```php
// Using actingAs
$user = User::factory()->create();
$response = $this->actingAs($user)->get('/api/v1/profile');

// Using token
$token = $user->createToken('test-token')->plainTextToken;
$response = $this->withHeader('Authorization', "Bearer $token")
    ->get('/api/v1/profile');
```

### Testing Validation

```php
public function test_register_requires_name(): void
{
    $response = $this->postJson('/api/v1/register', [
        'email' => 'john@example.com',
        'username' => 'johndoe',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertUnprocessable()
        ->assertJsonValidationErrors(['name']);
}
```

### Model Factories

Create test data with factories:

```php
// database/factories/UserFactory.php
public function definition(): array
{
    return [
        'name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'username' => fake()->unique()->userName(),
        'password' => bcrypt('password'),
    ];
}

// Usage in tests
$user = User::factory()->create();
$users = User::factory()->count(5)->create();
```

## Common Assertions

| Assertion | Description |
|---|---|
| `assertStatus(200)` | Check HTTP status code |
| `assertOk()` | Assert 200 status |
| `assertCreated()` | Assert 201 status |
| `assertUnprocessable()` | Assert 422 status |
| `assertJsonFragment([...])` | Check JSON contains values |
| `assertJsonStructure([...])` | Check JSON has structure |
| `assertDatabaseHas(...)` | Check database record exists |
| `assertDatabaseMissing(...)` | Check database record missing |
| `assertJsonValidationErrors([...])` | Check validation errors |

## CI Integration

Add to your CI pipeline:

```yaml
# .github/workflows/tests.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
      - run: composer install
      - run: php artisan test
```

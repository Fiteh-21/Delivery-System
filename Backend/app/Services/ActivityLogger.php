<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityLogger
{
    public static function log(
        string $action,
        ?string $description = null,
        ?Request $request = null,
        $model = null,
        ?array $oldValues = null,
        ?array $newValues = null
    ): ActivityLog {
        $data = [
            'user_id' => Auth::id(),
            'action' => $action,
            'description' => $description,
            'ip_address' => $request?->ip(),
            'user_agent' => $request?->userAgent(),
            'old_values' => $oldValues,
            'new_values' => $newValues,
        ];

        if ($model) {
            $data['model_type'] = get_class($model);
            $data['model_id'] = $model->getKey();
        }

        return ActivityLog::create($data);
    }

    public static function auth(string $action, ?Request $request = null): ActivityLog
    {
        return self::log(
            $action,
            "User {$action}",
            $request
        );
    }

    public static function login(?Request $request = null): ActivityLog
    {
        return self::auth('login', $request);
    }

    public static function logout(?Request $request = null): ActivityLog
    {
        return self::auth('logout', $request);
    }

    public static function register(?Request $request = null): ActivityLog
    {
        return self::auth('register', $request);
    }

    public static function passwordChanged(?Request $request = null): ActivityLog
    {
        return self::auth('password_changed', $request);
    }

    public static function passwordReset(?Request $request = null): ActivityLog
    {
        return self::auth('password_reset', $request);
    }

    public static function emailVerified(?Request $request = null): ActivityLog
    {
        return self::auth('email_verified', $request);
    }
}

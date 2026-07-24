<?php

return [

    'paths' => [
        'api' => 'api',
    ],

    'paths_regex' => [
        'exclude' => [],
    ],

    'info' => [
        'title' => env('SCRAMBLE_TITLE', config('app.name', 'Delivery System') . ' API'),
        'version' => '1.0.0',
        'description' => 'REST API for the Delivery System.',
    ],

    'servers' => null,

    'extensions' => [],

    'export' => [
        'path' => storage_path('api-docs'),
        'filename' => 'api-docs',
    ],

];

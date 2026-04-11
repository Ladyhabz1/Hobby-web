<?php

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('contact', function (Request $request) {
    return [
        Limit::perMinute(5)->by($request->ip()),
        Limit::perDay(50)->by($request->ip()),
    ];
});

RateLimiter::for('blog-submissions', function (Request $request) {
    return [
        Limit::perMinute(5)->by($request->ip()),
        Limit::perDay(40)->by($request->ip()),
    ];
});

RateLimiter::for('login', function (Request $request) {
    $id = strtolower((string) $request->input('email')) . '|' . $request->ip();
    return [
        Limit::perMinute(6)->by($id),
    ];
});

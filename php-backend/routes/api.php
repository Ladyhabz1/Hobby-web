<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PublicApi\BlogController;
use App\Http\Controllers\Api\PublicApi\GalleryController;
use App\Http\Controllers\Api\PublicApi\ContactController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Admin\AdminBlogController;
use App\Http\Controllers\Api\Admin\AdminGalleryController;
use App\Http\Controllers\Api\Admin\AdminContactController;

/*
|--------------------------------------------------------------------------
| Public Routes (frontend-compatible)
|--------------------------------------------------------------------------
*/
Route::get('/blog', [BlogController::class, 'index'])->name('api.blog.index');
Route::post('/blog', [BlogController::class, 'storeSubmission'])
    ->middleware('throttle:blog-submissions')
    ->name('api.blog.store-submission');

Route::get('/gallery', [GalleryController::class, 'index'])->name('api.gallery.index');

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:contact')
    ->name('api.contact.store');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])
        ->middleware('throttle:login')
        ->name('api.auth.login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('api.auth.logout');
        Route::get('/me', [AuthController::class, 'me'])->name('api.auth.me');
    });
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::post('/blog', [AdminBlogController::class, 'store'])->name('api.admin.blog.store');
    Route::patch('/blog/{post}', [AdminBlogController::class, 'update'])->name('api.admin.blog.update');
    Route::delete('/blog/{post}', [AdminBlogController::class, 'destroy'])->name('api.admin.blog.destroy');

    Route::post('/gallery', [AdminGalleryController::class, 'store'])->name('api.admin.gallery.store');
    Route::patch('/gallery/{item}', [AdminGalleryController::class, 'update'])->name('api.admin.gallery.update');
    Route::delete('/gallery/{item}', [AdminGalleryController::class, 'destroy'])->name('api.admin.gallery.destroy');

    Route::get('/contact', [AdminContactController::class, 'index'])->name('api.admin.contact.index');
    Route::patch('/contact/{message}/status', [AdminContactController::class, 'updateStatus'])
        ->name('api.admin.contact.update-status');
});

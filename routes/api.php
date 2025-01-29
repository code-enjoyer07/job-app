<?php

use App\Http\Controllers\JobVacancyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/users', function (Request $request) {
        return response()->json($request->user());
    });
    Route::prefix('job-vacancy')->group(function () {
        Route::get('/', [JobVacancyController::class, 'index']);
        Route::post('/', [JobVacancyController::class, 'store']);
        Route::get('/{id}', [JobVacancyController::class, 'show']);
        Route::put('/{id}', [JobVacancyController::class, 'update']);
        Route::delete('/{id}', [JobVacancyController::class, 'destroy']);
    });
    Route::get('/category', [JobCategoryController::class, 'index']);
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/{id}', [UserController::class, 'index']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/mypost', [PostController::class, 'show']);
    Route::get('/viewpost/{id}', [PostController::class, 'getSelectedPost']);
    Route::post('/postsCreate', [PostController::class, 'store']);
    Route::post('/commentPost', [CommentController::class, 'store']);
    Route::put('/commentUpdate/{id}', [CommentController::class, 'update']);
    Route::delete('/commentDelete/{id}', [CommentController::class, 'destroy']);

    Route::put('/postsUpdate/{id}', [PostController::class, 'update']);
    Route::delete('/postDelete/{id}', [PostController::class, 'destroy']);
    Route::delete('/logout', [AuthController::class, 'logout']);
});
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\postController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FetchDataController;

Route::post('register', [AuthController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
// Route::get('/api/{userId}', [AuthController::class, 'getUserById']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
// Route::middleware('auth:sanctum')->get('/getData', [FetchDataController::class, 'getData']);
Route::get('/getData', [FetchDataController::class, 'getData']);
Route::post('/post',[postController::class,'add_post']);
Route::post('/updateProfile/{id}',[AuthController::class,'edit_profile']);

Route::middleware('auth:sanctum')->post('/follow', [FollowController::class, 'follow']);
Route::middleware('auth:sanctum')->post('/unfollow', [FollowController::class, 'unfollow']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

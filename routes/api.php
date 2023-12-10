<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentControler;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::group(['middleware' => ['role:admin']], function () {
        Route::apiResource('users', UserController::class)->except(['index']);
    });

    Route::group(['middleware' => ['role:admin|manager']], function () {
        Route::prefix('projects')->group(function () {
            Route::put('/addMembers/{id}', [ProjectController::class, 'addTeamMembers']);
            Route::put('/removeMember/{id}', [ProjectController::class, 'removeTeamMember']);
            Route::apiResource('/', ProjectController::class)->except(['show']);
        });

        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/available/{project}', [UserController::class, 'availableUsers']);
    });

    Route::get('/users/assigned/{project}', [UserController::class, 'assignedUsers']);
    Route::get('/projects/user/{userId}', [ProjectController::class, 'userProjects']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);

    Route::apiResource('tickets', TicketController::class);
    Route::get('/tickets/{user}', [TicketController::class, 'indexUser']);
    Route::get('/tickets/project/{project_id}', [TicketController::class, 'getProjectTickets']);

    Route::apiResource('comments', CommentControler::class);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

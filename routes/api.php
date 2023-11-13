<?php

use App\Http\Controllers\Api\AuthController;
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

    Route::resource('projects', ProjectController::class);

    Route::resource('users', UserController::class);

    Route::resource('tickets', TicketController::class);

    Route::get('/tickets/{user}', [TicketController::class, 'indexUser']);

    Route::get('/users/available/{project}', [UserController::class, 'availableUsers']);

    Route::get('/users/assigned/{project}', [UserController::class, 'assignedUsers']);

    Route::put('/projects/addMembers/{id}', [ProjectController::class, 'addTeamMembers']);

    Route::put('/projects/removeMember/{id}', [ProjectController::class, 'removeTeamMember']);

    Route::get('/tickets/project/{project_id}', [TicketController::class, 'getProjectTickets']);

});

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentControler;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Middleware\Authorize;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    // Only admins can manage users
    Route::group(['middleware' => ['role:admin']], function () {
        Route::resource('users', UserController::class);
    });

    // Only admins and managers can manage projects (create/update/delete, manage members...)
    Route::group(['middleware' => ['role:admin|manager']], function () {

        Route::put('/projects/addMembers/{id}', [ProjectController::class, 'addTeamMembers']);
        Route::put('/projects/removeMember/{id}', [ProjectController::class, 'removeTeamMember']);
        Route::get('/users/available/{project}', [UserController::class, 'availableUsers']);
        Route::resource('projects', ProjectController::class)->except(['show']);

    });

    Route::get('/users/assigned/{project}', [UserController::class, 'assignedUsers']);

    Route::get('/projects/user/{usersId}', [ProjectController::class, 'userProjects']);

    Route::get('/projects/{id}', [ProjectController::class, 'show']);

    Route::resource('tickets', TicketController::class);

    Route::resource('comments', CommentControler::class);

    Route::get('/tickets/{user}', [TicketController::class, 'indexUser']);

    Route::get('/tickets/project/{project_id}', [TicketController::class, 'getProjectTickets']);

});

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

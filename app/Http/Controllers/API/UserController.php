<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Retrieve all users
    public function index(Request $request)
    {
        if (!$request->user()->hasPermissionTo('manage_users')) {
            abort(403);
        }

        $users = User::with('roles')->get();

        return response()->json($users);
    }


    // Retrieve all users not associated to a specific project
    public function availableUsers($projectId)
    {
        $users = User::whereDoesntHave('projects', function ($query) use ($projectId) {
            $query->where('project_id', $projectId);
        })->get();

        return response()->json($users);
    }

    // Retrieve all users associated to a specific project
    public function assignedUsers($projectId)
    {
        $users = User::whereHas('projects', function ($query) use ($projectId) {
            $query->where('project_id', $projectId);
        })->get();
        return response()->json($users);
    }

    // Update the role of a user
    public function update(Request $request, $userId)
    {
        $authenticatedUser = $request->user();

        // Check if the authenticated user has permission to manage users
        if (!$authenticatedUser->hasPermissionTo('manage_users')) {
            abort(403, 'Unauthorized action.');
        }

        // Check if the authenticated user is trying to update their own role
        if ($userId == $authenticatedUser->id) {
            return response()->json(['message' => 'You cannot update your own role.'], 403);
        }

        $validatedData = $request->validate([
            'role' => 'required|string|in:admin,manager,developer',
        ]);

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check if the user being updated is an admin
        if ($user->hasRole('admin')) {
            return response()->json(['message' => 'Cannot update the role of an admin user.'], 403);
        }

        // Remove existing roles and assign the new role
        $user->syncRoles([$validatedData['role']]);

        return response()->json($user);
    }

}

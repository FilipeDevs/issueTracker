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

        $users = User::all();

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
    public function updateRole(Request $request, $userId)
    {

        if (!$request->user()->hasPermissionTo('manage_users')) {
            abort(403);
        }

        $validatedData = $request->validate([
            'role' => 'required|string|in:admin,manager,developer', // Adjust role values based on your application
        ]);

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Remove existing roles and assign the new role
        $user->syncRoles([$validatedData['role']]);

        return response()->json($user);
    }


}

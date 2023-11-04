<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Retrieve all users
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }


    // Retrieve all users not associated to a specific project
    public function availableUsers($projectId)
    {
        $users = User::notInProject($projectId)->get();

        return response()->json($users);
    }


}
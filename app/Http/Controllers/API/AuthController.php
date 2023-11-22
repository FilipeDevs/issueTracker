<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user*/
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        $role = $user->assignRole('developer'); // By default a new account has a role of developer
        $user->roles;
        return response(compact('user', 'token', 'role'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => "Invalid email or password"
            ], 422);
        }
        /** @var \App\Models\User $user*/
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $user->roles;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user*/
        $user = $request->user();

        $user->currentAccessToken()->delete();
        $message = "Logout Successful";

        return response(compact('message'));
    }
}

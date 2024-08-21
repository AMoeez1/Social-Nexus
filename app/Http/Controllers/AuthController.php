<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8', 
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'username' => $validatedData['username'],
            'password' => bcrypt($validatedData['password']),
        ]);

        $token = $user->createToken('MyAppToken')->plainTextToken;

        return response()->json(['message' => 'User registered successfully', 'user' => $user, 'token' => $token], 201);

    }

    public function login(Request $request)
    {
        $credential = $request->only('email', 'password');

        if (Auth::attempt($credential)) {
            $user = Auth::user();
            $token = $user->createToken('MyAppToken')->plainTextToken;

            return response()->json(['user' => $user, 'token' => $token]);
        }
        return response()->json(['message' => 'Invalid credential'], 422);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function edit_profile(Request $request ,$id){
        $user = User::find($id);

        $user->email = $request->input('email');
        $user->name = $request->input('name');
        $user->username = $request->input('username');
        $user->bio = $request->input('bio');
        $user->gender = $request->input('gender');

        $user->save();
        return response()->json([
            'message' => 'Profile updated Successfully',
            'updatedUser' => $user,
    ]);
    }
}

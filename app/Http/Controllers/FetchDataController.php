<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class FetchDataController extends Controller
{
    public function getData()
    {
        try {
            $users = User::all();
            return response()->json(['users' => $users]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch users'], 500);
        }
    }
}
